import { MdAdd, MdCalendarToday } from "react-icons/md";import { FaRegCircleCheck } from "react-icons/fa6";
import { HiOutlineCash } from "react-icons/hi";
import DashboardCard from "../../components/dashboard/DashboardCard";
import ActiveLoansSection from "../../components/loan/ActiveLoansSection";
import PaymentHistory from "../../components/loan/PaymentHistory";
import AmortizationSchedule from "../../components/loan/AmortizationSchedule";
import LoanCalculatorCard from "../../components/loan/LoanCalculatorCard";
import PageHeader from "../../components/common/PageHeader";
import Cookies from "js-cookie";
import ApplyLoanModal from "../../components/loan/ApplyLoanModal";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  ActiveLoanResponseBody,
  LoansSummaryResponseBody,
} from "../../dtos/loans.dto";
import { api } from "../../api/api-client";
import { Skeleton } from "@mantine/core";
import PayInstallments from "../../components/loan/loan-details/PayInstallmentModal";
import SummaryCard from "../../components/dashboard/SummaryCard";

const Loan = () => {
  const [open, { toggle }] = useDisclosure(false);
  const role = Cookies.get("user");
  const { data: activeLaon } = useQuery({
    queryKey: ["active-loans"],
    queryFn: () => api.get<ActiveLoanResponseBody>(`${role}/loan/active-loans`),
  });
  const [openPayModal, { toggle: togglePayModal }] = useDisclosure(false);
  const {
    data: paymentHistory,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loan-summary"],
    queryFn: () => api.get<LoansSummaryResponseBody>(`${role}/loan/summary`),
  });
  return (
    <div className="flex flex-col gap-8">
      {role !== "admin" ? (
        <PageHeader
          title="Loan Management"
          subtitle="Manage all loans and installment payments efficiently."
          buttons={[
            {
              label: "Apply for Loan",
              onClick: () => toggle(),
              icon: <MdAdd className="h-5 w-5" />,
            },
          ]}
        />
      ) : (
        <PageHeader
          title="Loan Management"
          subtitle="Manage all loans and installment payments efficiently."
        />
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        {isLoading || isError ? (
          Array(3)
            .fill(0)
            .map((_, index) => <Skeleton key={index + 6} height={200} />)
        ) : (
          <>
            <SummaryCard
              icon={<FaRegCircleCheck className="h-6 w-6 text-white" />}
              title="Total Disbursement"
              amount={`	रु. ${
                paymentHistory?.data?.data?.totalDisbursement ?? 0
              }`}
              color={"indigo"}
            />{" "}
            <SummaryCard
              icon={<HiOutlineCash className="h-6 w-6 text-white" />}
              title="Remaining Payment"
              amount={`	रु. ${paymentHistory?.data?.data?.currentLoans ?? 0}`}
              color="green"
            />{" "}
            <SummaryCard
              icon={<HiOutlineCash className="h-6 w-6 text-white" />}
              title="Total Fine"
              amount={`	रु. ${paymentHistory?.data?.data?.totalFine ?? 0}`}
              color={"yellow"}
            />{" "}
            <SummaryCard
              icon={<HiOutlineCash className="h-6 w-6 text-white" />}
              title="Total Interest"
              amount={`	रु. ${paymentHistory?.data?.data?.totalInterest ?? 0}`}
              color={"red"}
            />
            {role === "user" && (
              <DashboardCard
                icon={<MdCalendarToday className="h-6 w-6 text-white" />}
                title="Next Installment Due"
                value={`	रु. ${
                  paymentHistory?.data?.data?.nextInstallment.amount ?? 0
                }`}
                description={`Due on ${
                  paymentHistory?.data?.data?.nextInstallment.paymentDate.split(
                    "T"
                  )[0] ?? ""
                }`}
                footerText="Pay now"
                footerAction={togglePayModal}
                footerColor="text-yellow-500 hover:text-yellow-600"
                bgColor={"bg-yellow-500"}
              />
            )}
          </>
        )}
      </div>
      <div className="w-full lg:flex gap-8">
        <div className={`${role === "admin" ? "w-full" : "w-full lg:w-2/3 "}`}>
          <ActiveLoansSection activeLoans={activeLaon?.data?.data} />
          <PaymentHistory />
        </div>
        {role !== "admin" && (
          <div className="lg:w-1/3 flex flex-col mt-8 lg:mt-0 gap-8">
            <AmortizationSchedule
              monthlyInstallment={activeLaon?.data?.data[0]?.paymentmade}
              remainingBalance={activeLaon?.data?.data[0].remainingPrinciple}
              remainingPayments={activeLaon?.data?.data[0].remainingPrinciple}
              totalInterest={activeLaon?.data?.data[0].remainingPrinciple}
              totalLoanAmount={activeLaon?.data?.data[0].principleAmount}
            />
            <LoanCalculatorCard />
          </div>
        )}
      </div>
      <ApplyLoanModal open={open} close={toggle} />
      <PayInstallments
        open={openPayModal}
        close={toggle}
        id={paymentHistory?.data?.data?.nextInstallment?.id ?? ""}
        fine={paymentHistory?.data?.data?.nextInstallment?.fine ?? 0}
        emi={paymentHistory?.data?.data?.nextInstallment?.amount ?? 0}
      />
    </div>
  );
};

export default Loan;
