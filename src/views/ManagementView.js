import ClipLoader from 'react-spinners/ClipLoader';
import BanksTable from '../components/Management/BanksTable/BanksTable';
import BankAddForm from '../components/Management/BankAddForm/BankAddForm';
import BankEditForm from '../components/Management/BankEditForm/BankEditForm';

export default function ManagementView({
  isLoading,
  needToEditBank,
  bankToEdit,
  handleEditSubmit,
  banks,
  handleDelete,
  handleEdit,
  handleAddSubmit,
  goBacktoBankTable,
}) {
  if (isLoading) {
    return (
      <div>
        <h2>Management</h2>
        <h3>Created banks</h3>

        <ClipLoader color="#00BFFF" size={120} speedMultiplier="0.6" />
      </div>
    );
  }

  if (needToEditBank) {
    return (
      <div>
        <h2>Management</h2>
        <h3>Edit bank {bankToEdit.name}</h3>

        <BankEditForm handleEditSubmit={handleEditSubmit} />

        <button type="button" onClick={goBacktoBankTable}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Management</h2>
      <h3>Created banks</h3>

      {banks.length === 0 ? (
        <h3>You haven't create any bank yet</h3>
      ) : (
        <BanksTable
          banks={banks}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}

      <BankAddForm handleAddSubmit={handleAddSubmit} />
    </div>
  );
}
