import { Modal } from "@mantine/core";
const LoanDetailsModal = ({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) => {
  return (
    <Modal opened={open} title={"Loan Details"} centered onClose={toggle}>
      <div className="mt-5 border-t border-gray-200 pt-4">
        <dl className="divide-y divide-gray-200">
          {[
            ["Principal Amount", "₹15,000"],
            ["Disbursement Date", "August 15, 2023"],
            ["Loan Term", "12 months"],
            ["Interest Rate", "12.00% per annum"],
            ["Monthly Installment", "₹1,330"],
            ["Payments Made", "3 of 12"],
            ["Remaining Principal", "₹11,250"],
            ["Next Payment Due", "December 15, 2023"],
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
                Active
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </Modal>
  );
};

export default LoanDetailsModal;
