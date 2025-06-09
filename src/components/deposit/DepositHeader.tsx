import DashboardCard from "../dashboard/DashboardCard";
import { MdAdd } from "react-icons/md";
import { IoArrowUp } from "react-icons/io5";
import { PiChartLineUpBold } from "react-icons/pi";
import { Skeleton } from "@mantine/core";
import SummaryCard from "../dashboard/SummaryCard";
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
                className="col-span-1"
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
            footerLink="/deposits"
            extra={
              <div className="text-sm flex gap-1 items-center font-medium text-green-500">
                <IoArrowUp /> 9.1 %
              </div>
            }
          />

          <SummaryCard
            icon={<PiChartLineUpBold className="h-6 w-6 text-white" />}
            title="Total Fine"
            amount={`₹ ${totalFine}`}
            color="yellow"
          />
        </>
      )}
    </div>
  );
};

export default DepositHeader;
