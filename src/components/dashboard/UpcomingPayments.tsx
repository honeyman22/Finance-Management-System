import { MdArrowDropDownCircle, MdCalendarMonth } from "react-icons/md";interface UpcomingPayment {
  type: string;
  amount: string;
  dueDate: string;
  iconBg: string;
  iconColor: string;
  icon: JSX.Element;
}

const upcomingPayments: UpcomingPayment[] = [
  {
    type: "Loan Installment Payment",
    amount: "₹1,250",
    dueDate: "Due on 15 Nov, 2023",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    icon: <MdCalendarMonth className="h-5 w-5" />,
  },
  {
    type: "Monthly Deposit Due",
    amount: "₹1,000",
    dueDate: "Due on 1 Dec, 2023",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: <MdArrowDropDownCircle className="h-5 w-5" />,
  },
  {
    type: "Loan Installment Payment",
    amount: "₹1,250",
    dueDate: "Due on 15 Dec, 2023",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    icon: <MdArrowDropDownCircle className="h-5 w-5" />,
  },
];

const UpcomingPayments = () => {
  return (
    <div className="mt-8">
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="px-4 py-5 ">
          <h2 className="text-lg font-medium text-gray-900">
            Upcoming Payments
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Schedule of your upcoming financial obligations
          </p>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {upcomingPayments.map((payment) => (
              <li key={payment.type}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 ${payment.iconBg} rounded-full p-2`}
                      >
                        <div className={`${payment.iconColor}`}>
                          {payment.icon}
                        </div>
                      </div>
                      <p className="ml-3 text-sm text-gray-900">
                        {payment.type}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">
                        {payment.amount}
                      </p>
                      <div className="ml-4 text-sm text-gray-500">
                        {payment.dueDate}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPayments;
