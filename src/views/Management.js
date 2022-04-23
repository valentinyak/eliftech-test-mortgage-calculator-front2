import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { getBanks, addBankToDB, deleteBankFromDB } from '../services/banks-api';

function Management() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  const handleDelete = e => {
    e.preventDefault();
    const bank = banks.find(bank => bank._id === e.target.id);

    setLoading(true);
    deleteBankFromDB(bank).then(() => setRenderCount(0));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { bankName, maxLoan, minDownPayment, loanTerm } =
      e.currentTarget.form;
    const maxLoanInt = parseInt(maxLoan.value);
    const minDownPaymentInt = parseInt(minDownPayment.value);
    const loanTermInt = parseInt(loanTerm.value);

    const newBank = {
      name: bankName.value,
      max_loan: maxLoanInt,
      min_down_payment: minDownPaymentInt,
      loan_term: loanTermInt,
    };

    setLoading(true);
    addBankToDB(newBank).then(() => setRenderCount(0));
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

        {loading && (
          <ClipLoader
            color="#00BFFF"
            loading={loading}
            size={120}
            speedMultiplier="0.6"
          />
        )}
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
              <th>Maximum loan</th>
              <th>Minimum down payment</th>
              <th>Loan term</th>
            </tr>
            {banks.map(bank => {
              return (
                <tr key={bank._id}>
                  <td>{bank.name}</td>
                  <td>{bank.max_loan}</td>
                  <td>{bank.min_down_payment}</td>
                  <td>{bank.loan_term}</td>
                  <button type="button" onClick={handleDelete} id={bank._id}>
                    delete
                  </button>
                  <button type="button" onClick={handleDelete} id={bank._id}>
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
          Bank name
          <input type="text" name="bankName" />
        </label>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Max loan
          <input type="text" name="maxLoan" />
        </label>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Min down payment
          <input type="text" name="minDownPayment" />
        </label>
        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Loan term
          <input type="text" name="loanTerm" />
        </label>
        <button type="button" onClick={handleSubmit}>
          Add new bank
        </button>
      </form>
    </div>
  );
}

export default Management;
