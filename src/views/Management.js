import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  getBanks,
  addBankToDB,
  deleteBankFromDB,
  editBank,
} from '../services/banks-api';

function Management() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderCount, setRenderCount] = useState(0);
  const [needToEditBank, setNeedToEditBank] = useState(false);
  const [bankToEdit, setBankToEdit] = useState(null);

  const handleDelete = e => {
    e.preventDefault();
    const bank = banks.find(bank => bank._id === e.target.id);

    setLoading(true);
    deleteBankFromDB(bank).then(() => setRenderCount(0));
  };

  const handleAddSubmit = e => {
    e.preventDefault();

    const { name, interest_rate, max_loan, min_down_payment, loan_term } =
      e.currentTarget.form;
    const interestRateInt = parseInt(interest_rate.value);
    const maxLoanInt = parseInt(max_loan.value);
    const minDownPaymentInt = parseInt(min_down_payment.value);
    const loanTermInt = parseInt(loan_term.value);

    const newBank = {
      name: name.value,
      interest_rate: interestRateInt,
      max_loan: maxLoanInt,
      min_down_payment: minDownPaymentInt,
      loan_term: loanTermInt,
    };

    setLoading(true);
    addBankToDB(newBank).then(() => setRenderCount(0));
  };

  const handleEditSubmit = e => {
    e.preventDefault();

    const [[, obj0], [, obj1], [, obj2], [, obj3], [, obj4]] = Object.entries(
      e.currentTarget.form,
    );
    const inputsArray = [obj0, obj1, obj2, obj3, obj4];
    const editedBank = {};

    inputsArray.forEach(input => {
      if (input.value !== '') {
        if (input.name === 'name') {
          Object.assign(editedBank, { [`${input.name}`]: `${input.value}` });
        } else {
          Object.assign(editedBank, {
            [`${input.name}`]: parseInt(`${input.value}`),
          });
        }
      }
    });

    setLoading(true);
    editBank(bankToEdit.id, editedBank)
      .then(() => setRenderCount(0))
      .then(() => setNeedToEditBank(false));
  };

  const handleEdit = e => {
    e.preventDefault();

    setBankToEdit(e.target);
    setNeedToEditBank(true);
  };

  useEffect(() => {
    if (renderCount === 0) {
      getBanks()
        .then(response => setBanks(() => [...response.data]))
        .then(() => setRenderCount(1))
        .then(() => setLoading(false));
    }
  }, [banks, renderCount]);

  if (loading) {
    return (
      <div className="Management">
        <h2>Management</h2>
        <h3>Created banks</h3>

        <ClipLoader
          color="#00BFFF"
          loading={loading}
          size={120}
          speedMultiplier="0.6"
        />
      </div>
    );
  }

  if (needToEditBank) {
    return (
      <div className="Management">
        <h2>Management</h2>
        <h3>Edit bank {bankToEdit.name}</h3>

        <form
          action=""
          style={{ display: 'flex', flexDirection: 'column', width: '350px' }}
        >
          <label
            htmlFor=""
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {' '}
            Bank name
            <input type="text" name="name" />
          </label>
          <label
            htmlFor=""
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {' '}
            Interest rate
            <input type="text" name="interest_rate" />
          </label>
          <label
            htmlFor=""
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {' '}
            Max loan
            <input type="text" name="max_loan" />
          </label>
          <label
            htmlFor=""
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {' '}
            Min down payment
            <input type="text" name="min_down_payment" />
          </label>
          <label
            htmlFor=""
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {' '}
            Loan term
            <input type="text" name="loan_term" />
          </label>
          <button type="button" onClick={handleEditSubmit}>
            Edit bank
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="Management">
      <h2>Management</h2>
      <h3>Created banks</h3>

      {banks.length === 0 ? (
        <h3>You haven't create any bank yet</h3>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Bank name</th>
              <th>Interest rate</th>
              <th>Maximum loan</th>
              <th>Minimum down payment</th>
              <th>Loan term</th>
            </tr>
            {banks.map(bank => {
              return (
                <tr key={bank._id}>
                  <td>{bank.name}</td>
                  <td>{bank.interest_rate}</td>
                  <td>{bank.max_loan}</td>
                  <td>{bank.min_down_payment}</td>
                  <td>{bank.loan_term}</td>
                  <button type="button" onClick={handleDelete} id={bank._id}>
                    delete
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    id={bank._id}
                    name={bank.name}
                  >
                    edit
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <form
        action=""
        style={{ display: 'flex', flexDirection: 'column', width: '350px' }}
      >
        <h4>Add bank</h4>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Bank name (unique)
          <input type="text" name="name" />
        </label>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Interest rate
          <input type="text" name="interest_rate" />
        </label>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Max loan
          <input type="text" name="max_loan" />
        </label>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Min down payment
          <input type="text" name="min_down_payment" />
        </label>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Loan term
          <input type="text" name="loan_term" />
        </label>
        <button type="button" onClick={handleAddSubmit}>
          Add new bank
        </button>
      </form>
    </div>
  );
}

export default Management;
