export default function calculateMortgageMonthlyPayment(
  loan,
  interestRate,
  loanTerm,
) {
  return (
    (loan *
      (interestRate / 100 / 12) *
      Math.pow(1 + interestRate / 100 / 12, loanTerm)) /
    (Math.pow(1 + interestRate / 100 / 12, loanTerm) - 1)
  );
}
