import PendingQueueItems from "../common/PendingQueueItems";import { LoanApprovalRequest } from "../../dtos/dashboard.dto";

const PendingLoansCard = ({
  loans,
}: {
  loans: LoanApprovalRequest[] | undefined;
}) => {
  return (
    <div className="bg-white w-full dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Loan Applications
        </h3>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {loans?.map((loan) => (
          <PendingQueueItems key={loan.id} data={loan} />
        ))}
      </ul>

      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
          View All Applications
        </button>
      </div>
    </div>
  );
};
export default PendingLoansCard;
