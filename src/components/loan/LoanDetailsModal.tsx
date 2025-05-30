import { Modal } from "@mantine/core";
import { ActiveLoan } from "../../dtos/loans.dto";
const LoanDetailsModal = ({
  open,
  toggle,
  activeLoan,
}: {
  open: boolean;
  toggle: () => void;
  activeLoan: ActiveLoan;
}) => {
  return (
    <Modal opened={open} title={"Loan Details"} centered onClose={toggle}>
      <div className="mt-5 border-t border-gray-200 pt-4">
        <dl className="divide-y divide-gray-200">
          {[
            ["Principal Amount", activeLoan.principleAmount],
            ["Disbursement Date", activeLoan.disbursementDate.split("T")[0]],
            ["Loan Term", `${activeLoan.loanTerm} months`],
            ["Interest Rate", `${activeLoan.interestRate} % per annum`],
            ["Monthly Installment", activeLoan.emi],
            [
              "Payments Made",
              `${activeLoan.paymentmade} of ${activeLoan.loanTerm}`,
            ],
            ["Remaining Principal", activeLoan.remainingPrinciple],
            ["Next Payment Due", activeLoan.nextPaymentDate.split("T")[0]],
            ["Loan Purpose", "Personal Use"],
          ].map(([title, value], idx) => (
            <div className="py-3 flex justify-between text-sm" key={idx + 4}>
              <dt className="text-gray-500">{title}</dt>
              <dd
                className={`text-gray-900 text-right ${
                  title === "Monthly Installment" ? "font-medium" : ""
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
          <div className="py-3 flex justify-between text-sm">
            <dt className="text-gray-500">Status</dt>
            <dd className="text-right">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {activeLoan.status}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </Modal>
  );
};

export default LoanDetailsModal;
