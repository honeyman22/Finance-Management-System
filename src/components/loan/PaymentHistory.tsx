import React from "react";import { Link } from "react-router-dom";
interface Payment {
  date: string;
  loanId: string;
  amount: string;
  principal: string;
  interest: string;
  status: "Paid" | "Pending";
}

const payments: Payment[] = [
  {
    date: "Nov 15, 2023",
    loanId: "BF-L-10023",
    amount: "₹1,330",
    principal: "₹1,150",
    interest: "₹180",
    status: "Paid",
  },
  {
    date: "Oct 15, 2023",
    loanId: "BF-L-10023",
    amount: "₹1,330",
    principal: "₹1,130",
    interest: "₹200",
    status: "Paid",
  },
  {
    date: "Sep 15, 2023",
    loanId: "BF-L-10023",
    amount: "₹1,330",
    principal: "₹1,110",
    interest: "₹220",
    status: "Paid",
  },
];

const PaymentHistory: React.FC = () => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Payment History
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Your recent loan installment payments
        </p>
      </div>
      <div className="border-t border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Date",
                "Loan ID",
                "Amount",
                "Principal",
                "Interest",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={index + 6}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.loanId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.principal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.interest}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <Link
          to="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all payment history<span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default PaymentHistory;
