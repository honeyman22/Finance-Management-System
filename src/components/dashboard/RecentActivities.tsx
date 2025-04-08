import { ReactNode } from "react";import { MdArrowDropDownCircle, MdArrowDropUp, MdBadge } from "react-icons/md";
interface ActivityItem {
  type: string;
  id: string;
  amount: string;
  date: string;
  status: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
}

const activities: ActivityItem[] = [
  {
    type: "Monthly Deposit",
    id: "#12345",
    amount: "₹1,000",
    date: "Nov 1, 2023",
    status: "Approved",
    icon: <MdArrowDropDownCircle className="h-6 w-6" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    type: "Loan Installment",
    id: "#56789",
    amount: "₹1,250",
    date: "Oct 15, 2023",
    status: "Paid",
    icon: <MdArrowDropUp className="h-6 w-6" />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    type: "Loan Approval",
    id: "#87654",
    amount: "₹15,000",
    date: "Oct 5, 2023",
    status: "Approved",
    icon: <MdBadge className="h-6 w-6" />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    type: "Monthly Deposit",
    id: "#12344",
    amount: "₹1,000",
    date: "Oct 1, 2023",
    status: "Approved",
    icon: <MdArrowDropDownCircle className="h-6 w-6" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white shadow rounded-lg w-full  overflow-hidden border border-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your financial activities over the last 30 days
        </p>
      </div>
      <div className="overflow-x-auto border-t">
        {" "}
        <table className=" w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((item, idx) => (
              <tr key={idx + 9}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${item.iconBg}`}
                    >
                      <div className={`${item.iconColor}`}>{item.icon}</div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.type}
                      </div>
                      <div className="text-sm text-gray-500">{item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
