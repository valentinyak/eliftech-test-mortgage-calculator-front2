import { useState, useEffect } from 'react';
import {
  getBanks,
  addBankToDB,
  deleteBankFromDB,
  editBank,
} from '../../services/banks-api';
import ManagementView from '../../views/ManagementView';

export default function Management({
  banks,
  setBanks,
  isLoading,
  setIsLoading,
}) {
  const [renderCount, setRenderCount] = useState(1);
  const [needToEditBank, setNeedToEditBank] = useState(false);
  const [bankToEdit, setBankToEdit] = useState(null);

  const handleDelete = e => {
    e.preventDefault();
    const bank = banks.find(bank => bank._id === e.target.id);

    setIsLoading(true);
    deleteBankFromDB(bank)
      .then(() => setRenderCount(0))
      .then(() => setIsLoading(false));
  };

  const handleAddSubmit = e => {
    e.preventDefault();

    const { name, interest_rate, max_loan, min_down_payment, loan_term } =
      e.currentTarget.form;
    const interestRateInt = parseInt(interest_rate.value);
    const maxLoanInt = parseInt(max_loan.value);
    const minDownPaymentInt = parseInt(min_down_payment.value);
    const loanTermInt = parseInt(loan_term.value);

    const newBank = {
      name: name.value,
      interest_rate: interestRateInt,
      max_loan: maxLoanInt,
      min_down_payment: minDownPaymentInt,
      loan_term: loanTermInt,
    };

    setIsLoading(true);
    addBankToDB(newBank)
      .then(() => setRenderCount(0))
      .then(() => setIsLoading(false));
  };

  const handleEditSubmit = e => {
    e.preventDefault();

    const [[, obj0], [, obj1], [, obj2], [, obj3], [, obj4]] = Object.entries(
      e.currentTarget.form,
    );
    const inputsArray = [obj0, obj1, obj2, obj3, obj4];
    const editedBank = {};

    inputsArray.forEach(input => {
      if (input.value !== '') {
        if (input.name === 'name') {
          Object.assign(editedBank, { [`${input.name}`]: `${input.value}` });
        } else {
          Object.assign(editedBank, {
            [`${input.name}`]: parseInt(`${input.value}`),
          });
        }
      }
    });

    setIsLoading(true);
    editBank(bankToEdit.id, editedBank)
      .then(() => setRenderCount(0))
      .then(() => setNeedToEditBank(false))
      .then(() => setIsLoading(false));
  };

  const handleEdit = e => {
    e.preventDefault();

    setBankToEdit(e.target);
    setNeedToEditBank(true);
  };

  const goBacktoBankTable = e => {
    e.preventDefault();

    setNeedToEditBank(false);
  };

  useEffect(() => {
    if (renderCount === 0) {
      getBanks()
        .then(res => setBanks(() => [...res.data]))
        .then(() => setRenderCount(1))
        .then(() => setIsLoading(false));
    }
  }, [banks, renderCount, setBanks, setIsLoading]);

  return (
    <ManagementView
      isLoading={isLoading}
      needToEditBank={needToEditBank}
      bankToEdit={bankToEdit}
      handleEditSubmit={handleEditSubmit}
      banks={banks}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleAddSubmit={handleAddSubmit}
      goBacktoBankTable={goBacktoBankTable}
    />
  );
}
