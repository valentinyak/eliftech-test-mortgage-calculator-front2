import './BankAddForm.css';

export default function BankAddForm({ handleAddSubmit }) {
  return (
    <form className="bank-add-form">
      <h4>Add bank</h4>

      <label className="bank-add-form-label">
        Bank name (unique)
        <input type="text" name="name" />
      </label>

      <label className="bank-add-form-label">
        Interest rate
        <input type="text" name="interest_rate" />
      </label>

      <label className="bank-add-form-label">
        Max loan
        <input type="text" name="max_loan" />
      </label>

      <label className="bank-add-form-label">
        Min down payment
        <input type="text" name="min_down_payment" />
      </label>

      <label className="bank-add-form-label">
        Loan term
        <input type="text" name="loan_term" />
      </label>

      <button type="button" onClick={handleAddSubmit}>
        Add new bank
      </button>
    </form>
  );
}
