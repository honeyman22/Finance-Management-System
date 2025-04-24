import { Divider } from "@mantine/core";import React from "react";
interface AnnualDepositProgressCardProps {
  year: number;
  completedMonths: number[] | undefined; // e.g., ["Jan", "Feb", ..., "Nov"]
}

const monthList = [
  { value: 1, name: "jan" },
  { value: 2, name: "feb" },
  { value: 3, name: "mar" },
  { value: 4, name: "apr" },
  { value: 5, name: "may" },
  { value: 6, name: "jun" },
  { value: 7, name: "jul" },
  { value: 8, name: "aug" },
  { value: 9, name: "sep" },
  { value: 10, name: "oct" },
  { value: 11, name: "nov" },
  { value: 12, name: "dec" },
];

const AnnualDepositProgressCard: React.FC<AnnualDepositProgressCardProps> = ({
  year,
  completedMonths,
}) => {
  const totalMonths = 12;
  const completedCount = completedMonths?.length ?? 0; // Fallback to 0 if null
  const progressPercent = (completedCount / totalMonths) * 100;

  return (
    <div className="bg-white shadow rounded-lg flex flex-col gap-4 overflow-hidden">
      <div className="px-4 pt-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Annual Deposit Progress
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Year {year} deposit tracking
        </p>
      </div>
      <Divider />
      <div className="px-4 pb-6  ">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-700">Progress</div>
          <div className="text-sm font-medium text-gray-700">
            {progressPercent.toFixed(1)}% ({completedCount}/12 months)
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {monthList.map((month) => {
            const isCompleted = completedMonths?.includes(month.value);
            return (
              <div
                key={month.value}
                className={`h-10 rounded-md flex capitalize items-center justify-center text-xs font-medium ${
                  isCompleted
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {month?.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnnualDepositProgressCard;
