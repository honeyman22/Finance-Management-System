import { FC } from "react";
import { Transaction } from "./type";

import { Pagination } from "@mantine/core";
import { TransactionRow } from "./Transaction";
type Props = {
  transactions: Transaction[];
};

export const TransactionTable: FC<Props> = ({ transactions }) => {
  return (
    <div className="flex flex-col  bg-white shadow rounded-lg w-full   border border-gray-200">
      <div className="px-4 py-5 ">
        <h2 className="text-lg font-medium text-gray-900">
          Transaction History
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your complete financial history with Brother Finance
        </p>
      </div>
      <div className="w-full overflow-auto">
        <table className="min-w-full divide-y  border-t divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Date",
                "Transaction ID",
                "Type",
                "Amount",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-nowrap text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((t, i) => (
              <TransactionRow key={i + 9} transaction={t} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex border-t justify-end">
        <Pagination total={5} gap={0} />
      </div>
    </div>
  );
};
