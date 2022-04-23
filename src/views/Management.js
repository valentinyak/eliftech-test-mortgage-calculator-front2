import { useState, useEffect, useRef } from 'react';
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
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Management;
