import { getBanks } from '../services/banks-api';
import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import calculateMortgageMonthlyPayment from '../services/mortgage-formula';
import CalculatorForm from '../components/Calculator/CalculatorForm/CalculatorForm';

function Calculator() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyPayment, setMonthlyPayment] = useState(0.0);
  const [chousedBank, setChousedBank] = useState({});

  const changeSelectedBank = e => {
    e.preventDefault();

    const serchedBank = banks.find(bank => bank.name === e.target.value);
    setChousedBank(serchedBank);
  };

  const handleCheckSubmit = e => {
    e.preventDefault();

    const { name, max_loan, min_down_payment, loan_term } =
      e.currentTarget.form;

    const interestRate = chousedBank.interest_rate;
    const loan = parseInt(max_loan.value);
    const firstPayment = parseInt(min_down_payment.value);
    const loanTerm = parseInt(loan_term.value);

    const serchedBank = banks.find(bank => bank.name === name.value);

    if (serchedBank.max_loan >= loan) {
      if (serchedBank.min_down_payment <= firstPayment) {
        if (serchedBank.loan_term >= loanTerm) {
          const payment = calculateMortgageMonthlyPayment(
            loan,
            interestRate,
            loanTerm,
          );

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
      .then(response =>
        setBanks(() => {
          setChousedBank(response.data[0]);
          return [...response.data];
        }),
      )
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="Management">
        <h2>Calculator</h2>

        <ClipLoader
          color="#00BFFF"
          loading={loading}
          size={120}
          speedMultiplier="0.6"
        />
      </div>
    );
  }

  return (
    <div className="Calculator">
      <h2>Calculator</h2>

      {banks.length > 0 ? (
        <CalculatorForm
          selectBank={changeSelectedBank}
          banks={banks}
          chousedBank={chousedBank}
          handleCheckSubmit={handleCheckSubmit}
        />
      ) : (
        <h3>You haven't create any bank yet</h3>
      )}

      {monthlyPayment > 0 && (
        <h3>Your monthly payment is {monthlyPayment} USD</h3>
      )}
    </div>
  );
}

export default Calculator;
