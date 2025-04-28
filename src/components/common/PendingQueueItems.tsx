import React from "react";
type PendingQueueItemsProps = {
  name: string;
  amount: number;
  submittedDate: string;
  onApprove?: () => void;
  onReject?: () => void;
  type: string;
};
const PendingQueueItems: React.FC<PendingQueueItemsProps> = ({
  name,
  amount,
  submittedDate,
  onApprove,
  onReject,
  type,
}) => {
  return (
    <li className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ₹{amount} {type === "deposit" && "- Monthly Deposit"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {type === "loan" ? "Appiled" : "Submitted"}: {submittedDate}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onApprove}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 "
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
          >
            Reject
          </button>
        </div>
      </div>
    </li>
  );
};

export default PendingQueueItems;
