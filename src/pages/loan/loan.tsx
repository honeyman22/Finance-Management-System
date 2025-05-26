import { MdAdd, MdCalendarToday } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineCash } from "react-icons/hi";
import DashboardCard from "../../components/dashboard/DashboardCard";
import ActiveLoansSection from "../../components/loan/ActiveLoansSection";
import PaymentHistory from "../../components/loan/PaymentHistory";
import AmortizationSchedule from "../../components/loan/AmortizationSchedule";
import LoanCalculatorCard from "../../components/loan/LoanCalculatorCard";
import PageHeader from "../../components/common/PageHeader";

import ApplyLoanModal from "../../components/loan/ApplyLoanModal";
import { useDisclosure } from "@mantine/hooks";

const Loan = () => {
  const [open, { toggle }] = useDisclosure(false);
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Loan Management"
        subtitle="Manage your loans and installment payments"
        buttons={[
          {
            label: "Apply for Loan",
            onClick: () => toggle(),
            icon: <MdAdd className="h-5 w-5" />,
          },
        ]}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        <DashboardCard
          icon={<HiOutlineCash className="h-6 w-6 text-white" />}
          title="Current Loans"
          value="₹15,000"
          footerText="View details"
          footerColor="text-blue-700 hover:text-blue-900"
          bgColor={"bg-blue-700"}
        />

        <DashboardCard
          icon={<FaRegCircleCheck className="h-6 w-6 text-white" />}
          title="Completed Loans"
          value="₹10,000"
          footerText="View history"
          footerColor="text-green-700 hover:text-green-900"
          bgColor={"bg-green-700"}
        />

        <DashboardCard
          icon={<MdCalendarToday className="h-6 w-6 text-white" />}
          title="Next Installment Due"
          value="₹1,250"
          description="Due on 15 Nov, 2023"
          footerText="Pay now"
          footerAction={() => alert("Open installment modal")}
          footerColor="text-yellow-500 hover:text-yellow-600"
          bgColor={"bg-yellow-500"}
        />
      </div>
      <div className="w-full lg:flex gap-8">
        <div className="lg:w-2/3">
          <ActiveLoansSection />
          <PaymentHistory />
        </div>
        <div className="lg:w-1/3 flex flex-col mt-8 lg:mt-0 gap-8">
          <AmortizationSchedule
            monthlyInstallment="5000"
            remainingBalance="20000"
            remainingPayments="20000"
            totalInterest="2500"
            totalLoanAmount="25000"
          />
          <LoanCalculatorCard />
        </div>
      </div>
      <ApplyLoanModal open={open} close={toggle} />
    </div>
  );
};

export default Loan;
