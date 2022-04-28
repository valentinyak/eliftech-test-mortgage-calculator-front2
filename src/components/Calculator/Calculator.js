import { useState } from 'react';
import calculateMortgageMonthlyPayment from '../../services/mortgage-formula';
import CalculatorView from '../../views/CalculatorView';

export default function Calculator({
  banks,
  isLoading,
  chousedBank,
  setChousedBank,
}) {
  const [monthlyPayment, setMonthlyPayment] = useState(0.0);

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
          setMonthlyPayment(0.0);
          alert('Loan term do not match the selected bank');
        }
      } else {
        setMonthlyPayment(0.0);
        alert('Min down payment do not match the selected bank');
      }
    } else {
      setMonthlyPayment(0.0);
      alert('Loan amount do not match the selected bank');
    }
  };

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
