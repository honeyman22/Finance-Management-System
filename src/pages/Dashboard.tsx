import React from "react";import DashboardHeader from "../components/dashboard/DashboardHeader";
import { MdCalendarToday, MdCloudCircle, MdCreditCard } from "react-icons/md";
import RecentActivity from "../components/dashboard/RecentActivities";
import UpcomingPayments from "../components/dashboard/UpcomingPayments";
import DashboardCard from "../components/dashboard/DashboardCard";
const Login: React.FC = () => {
  return (
    <div className="w-full ">
      <DashboardHeader
        onOpenLoanModal={() => console.log("I am here")}
        userName="John Doe"
        onOpenDepositModal={() => console.log("I am here")}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
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
    </div>
  );
};

export default Login;
