import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api-client";
import { UserDashboardResponseBody } from "../../../dtos/dashboard.dto";
import DashboardCard from "../DashboardCard";
import { MdCalendarToday, MdCloudCircle, MdCreditCard } from "react-icons/md";
import { Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PayInstallments from "../../loan/loan-details/PayInstallmentModal";
const UserDashBoardSummary = () => {
  const {
    data: dashboardSummary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-dashboard-summary"],
    queryFn: () => api.get<UserDashboardResponseBody>("user/dashboard"),
  });
  const [open, { toggle }] = useDisclosure(false);
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      {isLoading || isError ? (
        <>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index + 6} animate={false} height={200} />
            ))}
        </>
      ) : (
        <>
          <DashboardCard
            icon={<MdCloudCircle className="h-6 w-6 text-white" />}
            title="Total Deposits"
            value={`रु. ${dashboardSummary?.data?.data?.totalDeposit ?? 0}`}
            footerText="View all deposits"
            footerLink="/deposits"
            footerColor="text-blue-700 hover:text-blue-900"
            bgColor={"bg-blue-700"}
          />
          <DashboardCard
            icon={<MdCreditCard className="h-6 w-6 text-white" />}
            title="Current Loan"
            value={`रु. ${
              dashboardSummary?.data?.data?.approvedLoan?.principleAmount ?? 0
            }`}
            footerText="View details"
            footerLink={`/loans/${dashboardSummary?.data?.data?.approvedLoan?.id}`}
            footerColor="text-green-700 hover:text-green-900"
            bgColor={"bg-green-700"}
          />
          <DashboardCard
            icon={<MdCalendarToday className="h-6 w-6 text-white" />}
            title="Next Installment Due"
            value={`रु. ${
              dashboardSummary?.data?.data?.installement?.amount ?? 0
            }`}
            description={`Next installment due on ${
              dashboardSummary?.data?.data?.installement?.date?.split("T")[0]
            }`}
            footerText="Pay installment"
            footerAction={toggle}
            footerColor="text-yellow-500 hover:text-yellow-600"
            bgColor={"bg-yellow-500"}
          />
          <PayInstallments
            open={open}
            close={toggle}
            id={dashboardSummary?.data?.data?.installement?.id ?? ""}
            emi={dashboardSummary?.data?.data?.installement?.amount ?? 0}
            fine={dashboardSummary?.data?.data?.installement?.fine ?? 0}
          />
        </>
      )}
    </div>
  );
};

export default UserDashBoardSummary;
