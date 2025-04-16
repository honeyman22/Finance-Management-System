import { useNavigate } from "react-router-dom";import { Loan } from "../../types";
import LoanItem from "./LoanItem";
const ActiveLoansSection = () => {
  const router = useNavigate();
  const loans: Loan[] = [
    {
      id: "BF-L-10023",
      title: "Personal Loan",
      status: "Active",
      principal: "\u20B915,000",
      interestRate: "12%",
      term: "12 months",
      repaymentProgress: 25,
    },
  ];
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-8">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Active Loans</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your currently active loan accounts
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <ul>
          {loans.map((loan) => (
            <LoanItem key={loan.id} loan={loan} />
          ))}
          <li className="px-4 py-4 sm:px-6 text-center">
            <p className="text-sm text-gray-500">No more active loans</p>
            <button
              type="button"
              onClick={() => router("/loans/apply-for-loan")}
              className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Apply for a New Loan
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActiveLoansSection;
