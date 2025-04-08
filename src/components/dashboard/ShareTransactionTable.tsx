interface ShareTransaction {  date: string;
  type: "Purchased" | "Sold";
  shares: number;
  value: number;
}

interface ShareTransactionTableProps {
  transactions: ShareTransaction[];
}

const ShareTransactionTable: React.FC<ShareTransactionTableProps> = ({
  transactions,
}) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flex justify-between items-center py-4 border-b px-6 ">
        <h2 className="text-lg font-medium text-gray-900">Share Management</h2>{" "}
        <button className="text-sm px-3 py-1.5 text-white rounded-md font-medium bg-primary">
          + Record Transaction
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Shares
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index + 6}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === "Purchased"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {transaction.shares}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  ₹{transaction.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            Current Shares:{" "}
            <span className="font-medium text-gray-900">120</span>
          </div>
          <div>
            Total Value:{" "}
            <span className="font-medium text-gray-900">₹ 4589652</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareTransactionTable;
