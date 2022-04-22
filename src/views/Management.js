import { useState, useEffect } from 'react';
import { getBanks, addBankToDB, deleteBankFromDB } from '../services/banks-api';

function Management() {
  const [banks, setBanks] = useState([]);

  const handleDelete = e => {
    e.preventDefault();
    const bank = banks.find(bank => bank._id === e.target.id);

    deleteBankFromDB(bank);
    setBanks(() => {
      const newBanks = [];

      banks.forEach(el => {
        if (banks.indexOf(el) !== banks.indexOf(bank)) {
          newBanks.push(el);
        }
      });
      return newBanks;
    });
  };

  useEffect(() => {
    getBanks().then(response => setBanks(() => [...response.data]));
  }, [setBanks]);

  return (
    <div className="Management">
      <h2>Management</h2>
      <h3>Created banks</h3>
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
    </div>
  );
}

export default Management;
