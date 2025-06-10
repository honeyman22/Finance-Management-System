import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/common/PageHeader";
import InstallmentTables from "../../components/loan/loan-details/InstallmentTables";
import LoanInfo from "../../components/loan/loan-details/LoanCard";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { LonDetailsResponseBody } from "../../dtos/loan-details.dto";
import { api } from "../../api/api-client";
import { Skeleton } from "@mantine/core";
const LoanDetails = () => {
  const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
  const role = brotherFinance?.role;
  const { id } = useParams();
  const {
    data: loandetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loan-details", id, role],
    queryFn: () => api.get<LonDetailsResponseBody>(`${role}/loan/${id}`),
  });
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="">
        <button
          onClick={() => window.history.back()}
          className="inline-flex h-10 items-center   px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500"
        >
          Go Back
        </button>
      </div>
      <PageHeader
        title="Loan Details"
        subtitle="View and manage your loan details."
      />
      {isLoading || isError ? (
        <>
          <Skeleton height={100} />
          <Skeleton height={400} />
        </>
      ) : (
        loandetails?.data?.data?.loanDetails && (
          <>
            <LoanInfo activeLoan={loandetails.data.data.loanDetails} />
            <InstallmentTables
              installments={loandetails?.data?.data?.paymentHistory}
            />
          </>
        )
      )}
    </div>
  );
};

export default LoanDetails;
