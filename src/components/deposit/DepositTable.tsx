import { Pagination, Skeleton } from "@mantine/core";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { DepositTableDataRoot } from "../../dtos/deposits.dto";

const statusStyles: Record<string, string> = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
};

const DepositHistoryTable: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const {
    data: deposits,
    isLoading,
    isError,
  } = useQuery<DepositTableDataRoot>({
    queryKey: ["deposits", page],
    queryFn: async () => {
      const response = await api.get("deposit", { params: { page } });
      return response?.data;
    },
  });

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
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fine
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
            {isLoading ? (
              <Skeleton height={40} radius="md" animate={true} />
            ) : isError ? (
              <> </>
            ) : (
              <>
                {deposits?.data?.map((deposit, idx) => (
                  <tr key={idx + 9}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deposit.depositDate.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deposit.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deposit.fine}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {deposit.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 capitalize font-semibold rounded-full ${
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
              </>
            )}
          </tbody>
        </table>
      </div>
      {(deposits?.pagination?.page?.totalPages ?? 0) > 1 && (
        <div className="flex border-t justify-end p-4">
          <Pagination
            total={deposits?.pagination?.page?.totalPages ?? 0}
            value={page}
            onChange={(page) => {
              setPage(page);
            }}
            gap={0}
          />
        </div>
      )}
    </div>
  );
};

export default DepositHistoryTable;
