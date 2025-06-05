import DashboardCard from "../dashboard/DashboardCard";import { MdAdd, MdCalendarToday } from "react-icons/md";
import { PiChartLineUpBold } from "react-icons/pi";
import { ShareSummaryResponseBody } from "../../dtos/shares.dto";
import { api } from "../../api/api-client";
import { useQuery } from "@tanstack/react-query";
const ShareSummary = () => {
  const { data: summary } = useQuery({
    queryKey: ["share-summary"],
    queryFn: () => api.get<ShareSummaryResponseBody>("shares/summary"),
  });
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      <DashboardCard
        icon={<MdAdd className="h-6 w-6 text-white" />}
        title="Total Investment"
        value={`₹ ${summary?.data?.data?.totalInvestMent ?? 0}`}
        footerText=""
        footerColor="text-blue-700 hover:text-blue-900"
        bgColor={"bg-blue-500"}
      />
      <DashboardCard
        icon={<PiChartLineUpBold className="h-6 w-6 text-white" />}
        title="Total Sold Amount"
        value={`₹ ${summary?.data?.data?.totalSellAmount ?? 0}`}
        footerText=""
        footerColor="text-yellow-500 hover:text-yellow-600"
        bgColor={"bg-purple-500"}
      />
      <DashboardCard
        icon={<MdCalendarToday className="h-6 w-6 text-white" />}
        title="Total Purchased Amount"
        value={`₹ ${summary?.data?.data?.totalPurchaseAmount ?? 0}`}
        footerText=""
        footerColor="text-gray-700 cursor-text "
        bgColor={"bg-green-500"}
      />{" "}
      <DashboardCard
        icon={<MdCalendarToday className="h-6 w-6 text-white" />}
        title="Total Expenses"
        value={`₹ ${summary?.data?.data?.totalExpenses ?? 0}`}
        footerText=""
        footerColor="text-gray-700 cursor-text "
        bgColor={"bg-red-500"}
      />
    </div>
  );
};

export default ShareSummary;
