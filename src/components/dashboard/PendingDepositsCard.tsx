import PendingQueueItems from "../common/PendingQueueItems";
type PendingDepositsCardProps = {
  deposits: {
    name: string;
    amount: number;
    submittedDate: string;
  }[];
  header: string;
  type: string;
};

const PendingDepositsCard: React.FC<PendingDepositsCardProps> = ({
  deposits,
  header,
  type,
}) => {
  return (
    <div className="bg-white w-full dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {header}
        </h3>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {deposits.map((deposit, index) => (
          <PendingQueueItems
            key={index + 8}
            type={type}
            name={deposit.name}
            amount={deposit.amount}
            submittedDate={deposit.submittedDate}
            onApprove={() => console.log("Approved", deposit.name)}
            onReject={() => console.log("Rejected", deposit.name)}
          />
        ))}
      </ul>

      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
          View All Deposits
        </button>
      </div>
    </div>
  );
};
export default PendingDepositsCard;
