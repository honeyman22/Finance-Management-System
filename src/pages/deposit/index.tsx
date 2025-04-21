import { MdAdd } from "react-icons/md";import PageHeader from "../../components/common/PageHeader";
import { useNavigate } from "react-router-dom";
import DepositReminder from "../../components/deposit/DepositReminder";
import DepositSummary from "../../components/deposit/DepositSummary";
import AnnualDepositProgressCard from "../../components/deposit/AnnualDepositProgressCard";
import DepositHeader from "../../components/deposit/DepositHeader";
import DepositHistoryTable from "../../components/deposit/DepositTable";
import { deposits } from "../../utils/depositdata";
const DepositPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        title="Deposit Management"
        subtitle="Manage your monthly deposits and track your savings"
        buttons={[
          {
            icon: <MdAdd className="h-6 w-6" />,
            label: "Make Deposit",
            onClick: () => {
              navigate("/deposits/add-deposit");
            },
          },
        ]}
      />
      <DepositHeader />
      <div className="w-full lg:flex gap-8">
        <div className="lg:w-2/3">
          <DepositHistoryTable
            currentPage={10}
            deposits={deposits}
            onPageChange={(page) => console.log(page)}
            total={18}
          />
        </div>
        <div className="lg:w-1/3 flex flex-col mt-8 lg:mt-0 gap-8">
          <DepositReminder
            title="December Deposit"
            subtitle="Your upcoming deposit schedule"
            amount={1000}
            dueDate="Dec 1, 2023"
            daysLeft={15}
            onPayNow={() => navigate("/deposits/add-deposit")}
          />
          <DepositSummary
            memberSince="November 2022"
            totalDeposits="12 months"
            amountDeposited="12,000"
            depositRegularity="Excellent"
            loanEligibility="25,000"
          />
          <AnnualDepositProgressCard
            year={2025}
            completedMonths={["Jan", "Feb", "Mar", "Apr"]}
          />
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
