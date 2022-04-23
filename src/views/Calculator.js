import { getBanks } from '../services/banks-api';
import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Calculator() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyPayment, setMonthlyPayment] = useState(0.0);

  const handleCheckSubmit = e => {
    e.preventDefault();

    const { name, max_loan, min_down_payment, loan_term } =
      e.currentTarget.form;
    const maxLoanInt = parseInt(max_loan.value);
    const minDownPaymentInt = parseInt(min_down_payment.value);
    const loanTermInt = parseInt(loan_term.value);

    const serchedBank = banks.find(bank => bank.name === name.value);

    if (serchedBank.max_loan >= maxLoanInt) {
      if (serchedBank.min_down_payment <= minDownPaymentInt) {
        if (serchedBank.loan_term >= loanTermInt) {
          const payment =
            (maxLoanInt * (0.12 / 12) * Math.pow(1 + 0.12 / 12, loanTermInt)) /
            (Math.pow(1 + 0.12 / 12, loanTermInt) - 1);

          setMonthlyPayment(parseFloat(payment.toFixed(2)));
        } else {
          alert('The parameters you requested do not match the selected bank');
        }
      } else {
        alert('The parameters you requested do not match the selected bank');
      }
    } else {
      alert('The parameters you requested do not match the selected bank');
    }
  };

  useEffect(() => {
    getBanks()
      .then(response => setBanks(() => [...response.data]))
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="Management">
        <h2>Calculator</h2>

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
    <div className="Calculator">
      <h2>Calculator</h2>

      <form
        action=""
        style={{ display: 'flex', flexDirection: 'column', width: '350px' }}
      >
        <h4>Insert loan params</h4>

        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          Choose a bank:
          <select name="name">
            {banks.map(bank => {
              return (
                <option value={bank.name} key={bank._id}>
                  {bank.name}
                </option>
              );
            })}
          </select>
        </label>

        <label
          htmlFor=""
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          Loan amount
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
        <button type="button" onClick={handleCheckSubmit}>
          Calculate monthly payment
        </button>
      </form>

      {monthlyPayment > 0 && (
        <h3>Your monthly payment is {monthlyPayment} USD</h3>
      )}
    </div>
  );
}

export default Calculator;
