import './BankEditForm.css';

export default function BankEditForm({ handleEditSubmit }) {
  return (
    <form className="bank-edit-form">
      <label className="bank-edit-label">
        Bank name (unique)
        <input type="text" name="name" />
      </label>

      <label className="bank-edit-label">
        Interest rate
        <input type="text" name="interest_rate" />
      </label>

      <label className="bank-edit-label">
        Max loan
        <input type="text" name="max_loan" />
      </label>

      <label className="bank-edit-label">
        Min down payment
        <input type="text" name="min_down_payment" />
      </label>

      <label className="bank-edit-label">
        Loan term
        <input type="text" name="loan_term" />
      </label>

      <button type="button" onClick={handleEditSubmit}>
        Edit bank
      </button>
    </form>
  );
}
