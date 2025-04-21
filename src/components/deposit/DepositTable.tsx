import { Pagination } from "@mantine/core";import React from "react";
import { Deposit } from "../transaction/type";

interface DepositHistoryProps {
  deposits: Deposit[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const statusStyles: Record<string, string> = {
  Approved: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
};

const DepositHistoryTable: React.FC<DepositHistoryProps> = ({
  deposits,
  total,
  currentPage,

  onPageChange,
}) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md mb-8">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Deposit History
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Your recent monthly deposit records
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deposits.map((deposit, idx) => (
              <tr key={idx + 9}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit.transactionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusStyles[deposit.status]
                    }`}
                  >
                    {deposit.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex border-t justify-end p-4">
        <Pagination
          total={total}
          value={currentPage}
          onChange={onPageChange}
          gap={0}
        />
      </div>
    </div>
  );
};

export default DepositHistoryTable;
