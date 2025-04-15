import ActiveLoansSection from "../components/loan/ActiveLoansSection";
import AmortizationSchedule from "../components/loan/AmortizationSchedule";
import LoanCalculatorCard from "../components/loan/LoanCalculatorCard";
import PaymentHistory from "../components/loan/PaymentHistory";
const Loan = () => {
  return (
    <div className="w-full flex gap-8">
      <div className="lg:w-2/3">
        <ActiveLoansSection />
        <PaymentHistory />
      </div>
      <div className="lg:w-1/3 flex flex-col gap-8">
        <AmortizationSchedule
          monthlyInstallment="5000"
          remainingBalance="20000"
          remainingPayments="20000"
          totalInterest="2500"
          totalLoanAmount="25000"
          onViewFullSchedule={() => {}}
        />
        <LoanCalculatorCard />
      </div>
    </div>
  );
};

export default Loan;
