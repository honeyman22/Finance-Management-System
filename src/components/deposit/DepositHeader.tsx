import DashboardCard from "../dashboard/DashboardCard";import { MdAdd, MdCalendarToday } from "react-icons/md";
import { IoArrowUp } from "react-icons/io5";
import { PiChartLineUpBold } from "react-icons/pi";
import { Skeleton } from "@mantine/core";
const DepositHeader = ({
  isLoading,
  totalDeposit,
  totalFine,
}: {
  isLoading: boolean;
  totalDeposit: number;
  totalFine: number;
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      {isLoading ? (
        <>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index + 6}
                animate={false}
                height={140}
                className="col-span-1 lg:col-span-2"
              />
            ))}
        </>
      ) : (
        <>
          <DashboardCard
            icon={<MdAdd className="h-6 w-6 text-white" />}
            title="Total Deposits"
            value={`₹ ${totalDeposit}`}
            footerText="View details"
            footerColor="text-blue-700 hover:text-blue-900"
            bgColor={"bg-blue-500"}
            extra={
              <div className="text-sm flex gap-1 items-center font-medium text-green-500">
                <IoArrowUp /> 9.1 %
              </div>
            }
          />
          <DashboardCard
            icon={<MdCalendarToday className="h-6 w-6 text-white" />}
            title="Current Loan"
            value="₹15,000"
            footerText="Next due: Dec 1, 2023"
            footerColor="text-gray-700 cursor-text "
            bgColor={"bg-green-500"}
          />
          <DashboardCard
            icon={<PiChartLineUpBold className="h-6 w-6 text-white" />}
            title="Savings Growth"
            value={`₹ ${totalFine}`}
            extra={
              <span className="text-sm font-medium text-green-500">
                + ₹12,000
              </span>
            }
            footerText="See growth chart"
            footerAction={() => alert("Open installment modal")}
            footerColor="text-yellow-500 hover:text-yellow-600"
            bgColor={"bg-purple-500"}
          />
        </>
      )}
    </div>
  );
};

export default DepositHeader;
