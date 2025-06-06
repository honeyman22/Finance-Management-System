import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/api-client";
import { DashBoardSummaryResponseBody } from "../../../dtos/dashboard.dto";
import SummaryCard from "../SummaryCard";
import { Skeleton } from "@mantine/core";

const DashboardSummary = () => {
  const {
    data: dashboardSummary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => api.get<DashBoardSummaryResponseBody>("dashboard"),
  });
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading || isError ? (
        <>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index + 6} animate={false} height={200} />
            ))}
        </>
      ) : (
        <>
          {" "}
          <SummaryCard
            title="Total Deposits"
            amount={`	रु. ${dashboardSummary?.data?.data?.totalDeposit ?? 0}`}
            color="indigo"
            linkText="View all deposits"
            linkHref="/deposits"
            icon={
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            }
          />
          <SummaryCard
            title="Active Loans"
            amount={`	रु. ${
              dashboardSummary?.data?.data?.totalApprovedLoan ?? 0
            }`}
            color="green"
            linkText="View all loans"
            linkHref="/loans"
            icon={
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />
          <SummaryCard
            title="Total Interest"
            amount={`	रु. ${dashboardSummary?.data?.data?.totalInterest ?? 0}`}
            color="yellow"
            icon={
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <SummaryCard
            title="Total Fines"
            amount={`	रु. ${dashboardSummary?.data?.data?.totalFine ?? 0}`}
            color="red"
            icon={
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          />
        </>
      )}
    </div>
  );
};

export default DashboardSummary;
