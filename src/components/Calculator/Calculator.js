import { getBanks } from '../../services/banks-api';
import { useState, useEffect } from 'react';
import calculateMortgageMonthlyPayment from '../../services/mortgage-formula';
import CalculatorView from '../../views/CalculatorView';

export default function Calculator({ banks, isLoading }) {
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
    getBanks().then(res => setChousedBank(res.data[0]));
  }, []);

  return (
    <CalculatorView
      isLoading={isLoading}
      banks={banks}
      changeSelectedBank={changeSelectedBank}
      chousedBank={chousedBank}
      handleCheckSubmit={handleCheckSubmit}
      monthlyPayment={monthlyPayment}
    />
  );
}
