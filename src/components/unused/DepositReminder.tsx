import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
interface DepositReminderProps {
  title: string;
  subtitle: string;
  amount: number;
  dueDate: string;
  daysLeft: number;
  onPayNow: () => void;
}

const DepositReminder: React.FC<DepositReminderProps> = ({
  title,
  subtitle,
  amount,
  dueDate,
  daysLeft,
  onPayNow,
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <h3 className="text-lg leading-6 font-medium">Next Deposit Reminder</h3>
        <p className="mt-1 max-w-2xl text-sm text-blue-100">{subtitle}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <IoCalendarOutline className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-500">Due on {dueDate}</p>
            </div>
          </div>
          <div className="text-xl font-bold text-gray-900">
            ₹{amount.toLocaleString()}
          </div>
        </div>

        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <GoAlertFill className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Reminder</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You have {daysLeft} {daysLeft === 1 ? "day" : "days"} left to
                  make your monthly deposit. Making your deposit on time helps
                  maintain your good member status.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={onPayNow}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositReminder;
