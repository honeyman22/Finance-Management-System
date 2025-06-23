import React from "react";interface DepositSummaryProps {  memberSince: string;
  totalDeposits: number;
  amountDeposited: number;
  depositRegularity: "Excellent" | "Good" | "Average" | "Poor";
  loanEligibility: string;
}

const badgeColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-800",
  Good: "bg-blue-100 text-blue-800",
  Average: "bg-yellow-100 text-yellow-800",
  Poor: "bg-red-100 text-red-800",
};

const DepositSummary: React.FC<DepositSummaryProps> = ({
  memberSince,
  totalDeposits,
  amountDeposited,
  depositRegularity,
  loanEligibility,
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Deposit Summary
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Overview of your deposit performance
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <SummaryRow label="Member Since" value={memberSince} />
          <SummaryRow
            label="Total Deposits"
            value={`${totalDeposits} months`}
          />
          <SummaryRow
            label="Amount Deposited"
            value={`रू ${amountDeposited}`}
          />
          <SummaryRow
            label="Deposit Regularity"
            value={
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeColors[depositRegularity]}`}
              >
                {depositRegularity}
              </span>
            }
          />
          <SummaryRow
            label="Loan Eligibility"
            value={`Up to ₹${loanEligibility}`}
          />
        </dl>
      </div>
    </div>
  );
};

interface SummaryRowProps {
  label: string;
  value: React.ReactNode;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value }) => (
  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {value}
    </dd>
  </div>
);

export default DepositSummary;
