import { Pagination, Skeleton } from "@mantine/core";import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { DepositTableDataRoot } from "../../dtos/deposits.dto";
import DepositTableRow from "./DepositTableRow";

const DepositTableHeader = () => {
  return (
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
  );
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

  const renderFunction = () => {
    if (isError || isLoading) {
      return (
        <div className="flex flex-col gap-0.5 p-4">
          <table>
            <DepositTableHeader />
          </table>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index + 6} animate={false} height={40} />
            ))}
        </div>
      );
    } else {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <DepositTableHeader />
          {deposits?.data?.map((deposit) => (
            <DepositTableRow key={deposit.id} deposit={deposit} />
          ))}
        </table>
      );
    }
  };

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
        {renderFunction()}
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
