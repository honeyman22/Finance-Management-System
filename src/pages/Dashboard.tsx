import React from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { MdCalendarToday, MdCloudCircle, MdCreditCard } from "react-icons/md";
import RecentActivity from "../components/dashboard/RecentActivities";
import UpcomingPayments from "../components/dashboard/UpcomingPayments";
import DashboardCard from "../components/dashboard/DashboardCard";
import { sampleItems, transactionData } from "../utils/transactiondata";
import { TransactionTable } from "../components/transaction/TransactionTable";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import PendingApprovals from "../components/dashboard/PendingApprovals";
import ShareTransactionTable from "../components/dashboard/ShareTransactionTable";
import ActivityLog from "../components/dashboard/ActivityLogs";
import PendingDepositsCard from "../components/dashboard/PendingDepositsCard";
import { pendingDeposits } from "../utils/depositdata";
import PendingLoansCard from "../components/dashboard/PendingLoansCard";
import Cookies from "js-cookie";
import Barcharts from "../components/dashboard/Barcharts";
const Login: React.FC = () => {
  const role = Cookies.get("user");
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
              <PendingApprovals
                items={sampleItems}
                onView={() => console.log("Hello")}
              />
            </div>
            <div className="flex flex-col gap-8 xl:col-span-2">
              {" "}
              <Barcharts />
              <ShareTransactionTable
                transactions={[
                  {
                    date: "11/12/2023",
                    type: "Purchased",
                    shares: 50,
                    value: 5000,
                  },
                  { date: "10/25/2023", type: "Sold", shares: 25, value: 2750 },
                  {
                    date: "10/15/2023",
                    type: "Purchased",
                    shares: 100,
                    value: 10000,
                  },
                ]}
              />{" "}
              <ActivityLog />
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-8 md:flex-row">
        <PendingDepositsCard
          header="Pending Deposit"
          deposits={pendingDeposits}
          type="deposit"
        />{" "}
        <PendingLoansCard deposits={pendingDeposits} />
      </div>
    </div>
  );
};

export default Login;
