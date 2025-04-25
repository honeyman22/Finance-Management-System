import { MdAdd } from "react-icons/md";
import PageHeader from "../../components/common/PageHeader";
import { useNavigate } from "react-router-dom";
import DepositReminder from "../../components/deposit/DepositReminder";
import DepositSummary from "../../components/deposit/DepositSummary";
import AnnualDepositProgressCard from "../../components/deposit/AnnualDepositProgressCard";
import DepositHeader from "../../components/deposit/DepositHeader";
import DepositHistoryTable from "../../components/deposit/DepositTable";
import { DepositSummaryResponseBody } from "../../dtos/deposits.dto";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { Skeleton } from "@mantine/core";
const DepositPage = () => {
  const navigate = useNavigate();

  const { data: summary, isLoading } = useQuery<DepositSummaryResponseBody>({
    queryKey: ["deposits-summary"],
    queryFn: async () => {
      const response = await api.get("deposit/summary");
      return response?.data;
    },
  });

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
      <DepositHeader
        isLoading={isLoading}
        totalDeposit={summary?.data?.totalDeposits ?? 0}
        totalFine={summary?.data?.totalFines ?? 0}
      />
      <div className="w-full lg:flex gap-8">
        <div className="lg:w-2/3">
          <DepositHistoryTable />
        </div>
        <div className="lg:w-1/3 flex flex-col mt-8 lg:mt-0 gap-8">
          {isLoading ? (
            <>
              {Array(3)
                .fill("1")
                .map((_, i) => (
                  <Skeleton
                    animate={false}
                    key={i + 6}
                    width="100%"
                    height={350}
                  />
                ))}
            </>
          ) : (
            <>
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
                totalDeposits={summary?.data?.numberOfDeposits ?? 0}
                amountDeposited={
                  (summary?.data?.totalDeposits ?? 0) +
                  (summary?.data?.totalFines ?? 0)
                }
                depositRegularity="Excellent"
                loanEligibility="25,000"
              />
              <AnnualDepositProgressCard
                year={2025}
                completedMonths={summary?.data?.thisYearDeposits}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
