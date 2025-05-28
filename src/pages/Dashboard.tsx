import React from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { MdCalendarToday, MdCloudCircle, MdCreditCard } from "react-icons/md";
import RecentActivity from "../components/dashboard/RecentActivities";
import UpcomingPayments from "../components/dashboard/UpcomingPayments";
import DashboardCard from "../components/dashboard/DashboardCard";
import { transactionData } from "../utils/transactiondata";
import { TransactionTable } from "../components/transaction/TransactionTable";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import PendingApprovals from "../components/dashboard/PendingApprovals";
import ShareTransactionTable from "../components/dashboard/ShareTransactionTable";
import PendingLoansCard from "../components/dashboard/PendingLoansCard";
import Cookies from "js-cookie";
import Barcharts from "../components/dashboard/Barcharts";
import { api } from "../api/api-client";
import { DashBoardLoanApprovalRequestResponseBody } from "../dtos/dashboard.dto";
import { Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const Login: React.FC = () => {
  const role = Cookies.get("user");
  const {
    data: loans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-loan-requests"],
    queryFn: () =>
      api.get<DashBoardLoanApprovalRequestResponseBody>(
        "dashboard/all-pending-loan-approval-requests"
      ),
  });

  return (
    <div className="w-full flex flex-col gap-8">
      <DashboardHeader
        onOpenLoanModal={() => console.log("I am here")}
        userName="John Doe"
        onOpenDepositModal={() => console.log("I am here")}
      />

      {role === "user" ? (
        <>
          {" "}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
            <DashboardCard
              icon={<MdCloudCircle className="h-6 w-6 text-white" />}
              title="Total Deposits"
              value="₹12,000"
              footerText="View all deposits"
              footerColor="text-blue-700 hover:text-blue-900"
              bgColor={"bg-blue-700"}
            />

            <DashboardCard
              icon={<MdCreditCard className="h-6 w-6 text-white" />}
              title="Current Loan"
              value="₹15,000"
              footerText="View loan details"
              footerColor="text-green-700 hover:text-green-900"
              bgColor={"bg-green-700"}
            />

            <DashboardCard
              icon={<MdCalendarToday className="h-6 w-6 text-white" />}
              title="Next Installment Due"
              value="₹1,250"
              description="Due on 15 Nov, 2023"
              footerText="Pay installment"
              footerAction={() => alert("Open installment modal")}
              footerColor="text-yellow-500 hover:text-yellow-600"
              bgColor={"bg-yellow-500"}
            />
          </div>
          <RecentActivity />
          <UpcomingPayments />
          <TransactionTable transactions={transactionData} />
        </>
      ) : (
        <>
          <DashboardSummary />
          <div className="flex flex-col lg:grid xl:grid-cols-6 gap-8">
            <div className="flex flex-col gap-8 xl:col-span-4">
              <PendingApprovals />
              {isLoading || isError ? (
                <Skeleton height={400} animate={false} />
              ) : loans?.data?.data?.length === 0 ? null : (
                <PendingLoansCard loans={loans?.data?.data} />
              )}
            </div>
            <div className="flex flex-col gap-8 xl:col-span-2">
              <Barcharts />
              <ShareTransactionTable />
              {/* <ActivityLog /> */}
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-8 md:flex-row"></div>
    </div>
  );
};

export default Login;
