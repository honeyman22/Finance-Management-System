import React from "react";interface AmortizationScheduleProps {
  totalLoanAmount: string;
  monthlyInstallment: string;
  remainingBalance: string;
  remainingPayments: string;
  totalInterest: string;
  onViewFullSchedule?: () => void;
}

const AmortizationSchedule: React.FC<AmortizationScheduleProps> = ({
  totalLoanAmount,
  monthlyInstallment,
  remainingBalance,
  remainingPayments,
  totalInterest,
  onViewFullSchedule,
}) => {
  const items = [
    { label: "Total Loan Amount", value: totalLoanAmount },
    { label: "Monthly Installment", value: monthlyInstallment },
    { label: "Remaining Balance", value: remainingBalance },
    { label: "Remaining Payments", value: remainingPayments },
    { label: "Total Interest", value: totalInterest },
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Amortization Schedule
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Monthly repayment breakdown
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {items.map((item) => (
            <div
              key={item.label}
              className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-500">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
        <button
          type="button"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onViewFullSchedule}
        >
          View Full Schedule
        </button>
      </div>
    </div>
  );
};

export default AmortizationSchedule;
