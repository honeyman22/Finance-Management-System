import { useQuery } from "@tanstack/react-query";import { api } from "../../api/api-client";
import { DashBoardSharesResponseBody } from "../../dtos/dashboard.dto";

const ShareTransactionTable = () => {
  const { data } = useQuery({
    queryKey: ["dashboard-shares-list"],
    queryFn: () =>
      api.get<DashBoardSharesResponseBody>(
        "dashboard/recent-shares-transaction"
      ),
  });
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="flex justify-between items-center py-4 border-b px-6 ">
        <h2 className="text-lg font-medium text-gray-900">Share Management</h2>{" "}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
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
                Quantity
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.data?.map((transaction, index) => (
              <tr key={index + 6}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {transaction.shareName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.transactionType === "Purchased"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.transactionType}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {transaction.quantity}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  ₹ {transaction.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShareTransactionTable;
