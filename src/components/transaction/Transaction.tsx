import { FC } from "react";
import { TransactionTypeIcon } from "./TransactionTypeIcon";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { Transaction } from "./type";

type Props = {
  transaction: Transaction;
};

export const TransactionRow: FC<Props> = ({ transaction }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <TransactionTypeIcon type={transaction.type} />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {transaction.type}
            </div>
            <div className="text-sm text-gray-500">{transaction.subtype}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <TransactionStatusBadge status={transaction.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
          View
        </button>
        <button className="text-gray-600 hover:text-gray-900">Receipt</button>
      </td>
    </tr>
  );
};
