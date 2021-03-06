import './BankAddForm.css';

export default function BankAddForm({ handleAddSubmit }) {
  return (
    <form className="bank-add-form">
      <h4>Add bank</h4>
      <h5>All fields are required</h5>

      <label className="bank-add-label">
        Bank name (unique)
        <input type="text" name="name" />
      </label>

      <label className="bank-add-label">
        Interest rate
        <input type="text" name="interest_rate" />
      </label>

      <label className="bank-add-label">
        Max loan
        <input type="text" name="max_loan" />
      </label>

      <label className="bank-add-label">
        Min down payment
        <input type="text" name="min_down_payment" />
      </label>

      <label className="bank-add-label">
        Loan term
        <input type="text" name="loan_term" />
      </label>

      <button type="button" onClick={handleAddSubmit}>
        Add new bank
      </button>
    </form>
  );
}
