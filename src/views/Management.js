import { useState, useEffect, useCallback } from 'react';
import { getBanks, addBankToDB, deleteBankFromDB } from '../services/banks-api';

function Management() {
  const [banks, setBanks] = useState([]);

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
              <tr>
                <td>{bank.name}</td>
                <td>{bank.max_loan}</td>
                <td>{bank.min_down_payment}</td>
                <td>{bank.loan_term}</td>
              </tr>
            );
          })}
        </tbody>
        {/* {banks.map(bank => {
          return <li key={bank._id}>{bank.name}</li>;
        })} */}
      </table>
    </div>
  );
}

export default Management;
