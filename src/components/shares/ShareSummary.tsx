import { IoArrowDown, IoArrowUp } from "react-icons/io5";import DashboardCard from "../dashboard/DashboardCard";
import { MdAdd, MdCalendarToday } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";
const ShareSummary = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      <DashboardCard
        icon={<MdAdd className="h-6 w-6 text-white" />}
        title="Total Profit"
        value="₹12,000"
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
        icon={<PiChartLineUpBold className="h-6 w-6 text-white" />}
        title="Total Loss"
        value="₹ 1,250"
        extra={
          <div className="text-sm flex gap-1 items-center font-medium text-red-500">
            <IoArrowDown /> 9.1 %
          </div>
        }
        footerText="View details"
        footerAction={() => alert("Open installment modal")}
        footerColor="text-yellow-500 hover:text-yellow-600"
        bgColor={"bg-purple-500"}
      />
      <DashboardCard
        icon={<MdCalendarToday className="h-6 w-6 text-white" />}
        title="Current Investment"
        value="₹ 15,00,000"
        footerText="Next due: Dec 1, 2023"
        footerColor="text-gray-700 cursor-text "
        bgColor={"bg-green-500"}
      />
    </div>
  );
};

export default ShareSummary;
