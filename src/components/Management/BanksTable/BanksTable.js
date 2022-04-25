import './BanksTable.css';

export default function BanksTable({ banks, handleDelete, handleEdit }) {
  return (
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
  );
}
