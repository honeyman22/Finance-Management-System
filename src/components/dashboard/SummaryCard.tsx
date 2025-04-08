import React from "react";interface SummaryCardProps {
  title: string;
  amount: string;
  percentage: string;
  icon: React.ReactNode;
  color: "indigo" | "green" | "yellow" | "red";
  linkText: string;
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
  percentage,
  icon,
  color,
  linkText,
  linkHref = "#",
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
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    colorMap[color].split(" ")[1]
                  }`}
                >
                  <svg
                    className="self-center flex-shrink-0 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Changed by</span>
                  {percentage}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a
            href={linkHref}
            className={`font-medium ${colorMap[color].split(" ")[1]} ${
              colorMap[color].split(" ")[2]
            }`}
          >
            {linkText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
