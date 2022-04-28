import ClipLoader from 'react-spinners/ClipLoader';
import CalculatorForm from '../components/Calculator/CalculatorForm/CalculatorForm';

export default function CalculatorView({
  isLoading,
  banks,
  changeSelectedBank,
  chousedBank,
  handleCheckSubmit,
  monthlyPayment,
}) {
  if (isLoading) {
    return (
      <div>
        <h2>Calculator</h2>

        <ClipLoader color="#00BFFF" size={120} speedMultiplier="0.6" />
      </div>
    );
  }

  return (
    <div>
      <h2>Calculator</h2>

      {banks.length > 0 ? (
        <CalculatorForm
          selectBank={changeSelectedBank}
          banks={banks}
          chousedBank={chousedBank}
          handleCheckSubmit={handleCheckSubmit}
        />
      ) : (
        <h3>You haven't created any bank yet</h3>
      )}

      {monthlyPayment > 0 && (
        <h3>Your monthly payment is {monthlyPayment} USD</h3>
      )}
    </div>
  );
}
