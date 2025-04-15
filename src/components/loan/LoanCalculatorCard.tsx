import { useState } from "react";
export default function LoanCalculatorCard() {
  const [loanAmount, setLoanAmount] = useState(20000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(1770);
  const [totalInterest, setTotalInterest] = useState(1240);

  const calculateLoan = () => {
    const principal = loanAmount;
    const annualInterestRate = interestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const termInMonths = loanTerm;

    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, termInMonths)) /
      (Math.pow(1 + monthlyInterestRate, termInMonths) - 1);

    const totalPayment = emi * termInMonths;
    const totalInterestCalc = totalPayment - principal;

    setMonthlyPayment(Math.round(emi));
    setTotalInterest(Math.round(totalInterestCalc));
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Loan Calculator
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Estimate your loan payments
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="loan-amount"
              className="block text-sm font-medium text-gray-700"
            >
              Loan Amount (₹)
            </label>
            <input
              type="number"
              name="loan-amount"
              id="loan-amount"
              className="mt-1 bg-white block  w-full outline-none "
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <input
              type="range"
              min="1000"
              max="250000"
              step="1000"
              className="w-full h-2 mt-1 bg-gray-200 rounded-lg cursor-pointer"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="loan-term"
              className="block text-sm font-medium text-gray-700"
            >
              Loan Term (Months)
            </label>
            <input
              type="number"
              name="loan-term"
              id="loan-term"
              className="mt-1 block w-full outline-none "
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
            <input
              type="range"
              min="1"
              max="12"
              className="w-full h-2 mt-1 bg-gray-200 rounded-lg outline-none cursor-pointer"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="interest-rate"
              className="block text-sm font-medium text-gray-700"
            >
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              name="interest-rate"
              id="interest-rate"
              step="0.1"
              className="mt-1 block w-full border-b outline-none"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </div>
          <div>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
              onClick={calculateLoan}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-500">
              Monthly Payment
            </span>
            <span className="block mt-1 text-lg font-semibold text-gray-900">
              ₹{monthlyPayment}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-500">
              Total Interest
            </span>
            <span className="block mt-1 text-lg font-semibold text-gray-900">
              ₹{totalInterest}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
