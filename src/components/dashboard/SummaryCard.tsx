import React from "react";import { Link } from "react-router-dom";
interface SummaryCardProps {
  title: string;
  amount: string;
  icon: React.ReactNode;
  color: "indigo" | "green" | "yellow" | "red";
  linkText?: string;
  linkHref?: string;
}

const colorMap = {
  indigo: "bg-indigo-500 text-indigo-700 hover:text-indigo-900",
  green: "bg-green-500 text-green-700 hover:text-green-900",
  yellow: "bg-yellow-500 text-yellow-700 hover:text-yellow-900",
  red: "bg-red-500 text-red-700 hover:text-red-900",
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  icon,
  color,
  linkText,
  linkHref,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 rounded-md p-3 ${
              colorMap[color].split(" ")[0]
            }`}
          >
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {amount}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {linkText && linkHref && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <Link
              to={linkHref}
              className={`font-medium ${colorMap[color].split(" ")[1]} ${
                colorMap[color].split(" ")[2]
              }`}
            >
              {linkText}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
