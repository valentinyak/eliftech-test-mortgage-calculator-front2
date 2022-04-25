import './CalculatorForm.css';

export default function CalculatorForm({
  selectBank,
  banks,
  chousedBank,
  handleCheckSubmit,
}) {
  return (
    <form className="calculator-form">
      <h4>Insert loan params</h4>

      <label className="calculator-form-label">
        Choose a bank:
        <select name="name" onChange={selectBank}>
          {banks.map(bank => {
            return <option key={bank._id}>{bank.name}</option>;
          })}
        </select>
      </label>

      <span className="interest-rate-span">
        Interest rate <span>{chousedBank.interest_rate}%</span>
      </span>

      <label className="calculator-form-label">
        Loan amount
        <input type="text" name="max_loan" />
      </label>

      <label className="calculator-form-label">
        Min down payment
        <input type="text" name="min_down_payment" />
      </label>

      <label className="calculator-form-label">
        Loan term
        <input type="text" name="loan_term" />
      </label>

      <button type="button" onClick={handleCheckSubmit}>
        Calculate monthly payment
      </button>
    </form>
  );
}
