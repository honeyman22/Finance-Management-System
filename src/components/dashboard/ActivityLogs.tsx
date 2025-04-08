import React from "react";import clsx from "clsx";
import { MdCheckCircle } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { LuCircleDollarSign } from "react-icons/lu";
export type ActivityItem = {
  id: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  time: string;
  datetime: string;
};

const activities: ActivityItem[] = [
  {
    id: "1",
    icon: <MdCheckCircle className="h-5 w-5 text-white" />,
    color: "bg-green-500",
    description: "Loan approved ₹15,000 for Rahul Sharma",
    time: "1h ago",
    datetime: "2023-11-12T13:45:00",
  },
  {
    id: "2",
    icon: <FaUserAlt className="h-5 w-5 text-white" />,
    color: "bg-blue-500",
    description: "New user registered Neha Singh",
    time: "3h ago",
    datetime: "2023-11-12T11:30:00",
  },
  {
    id: "3",
    icon: <MdCheckCircle className="h-5 w-5 text-white" />,
    color: "bg-green-500",
    description: "Deposit confirmed ₹1,000 from Amit Kumar",
    time: "5h ago",
    datetime: "2023-11-12T09:15:00",
  },
  {
    id: "4",
    icon: <LuCircleDollarSign className="h-5 w-5 text-white" />,
    color: "bg-purple-500",
    description: "Share purchase recorded 50 shares at ₹100 each",
    time: "7h ago",
    datetime: "2023-11-12T07:30:00",
  },
];

const ActivityLogItem: React.FC<{
  activity: ActivityItem;
  isLast: boolean;
}> = ({ activity, isLast }) => (
  <li>
    <div className={clsx("relative", { "pb-8": !isLast, "pb-0": isLast })}>
      {!isLast && (
        <span
          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        ></span>
      )}
      <div className="relative flex space-x-3">
        <div>
          <span
            className={clsx(
              "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white",
              activity.color
            )}
          >
            {activity.icon}
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
          <div>
            <p className="text-sm text-gray-900">{activity.description}</p>
          </div>
          <div className="text-right text-sm whitespace-nowrap text-gray-500">
            <time dateTime={activity.datetime}>{activity.time}</time>
          </div>
        </div>
      </div>
    </div>
  </li>
);

const ActivityLog: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg ">
      <h2 className="text-lg font-medium text-gray-900 p-4">Activity Log</h2>
      <div className="flow-root py-4 border-t px-6">
        <ul className="">
          {activities.map((activity, idx) => (
            <ActivityLogItem
              key={activity.id}
              activity={activity}
              isLast={idx === activities.length - 1}
            />
          ))}
        </ul>
      </div>
      <div className="p-4 border-t text-center">
        <a
          href="/"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all activity<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default ActivityLog;
