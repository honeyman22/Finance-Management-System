import { Modal } from "@mantine/core";
const PendingDepositDetailsModal = ({
  open,
  toggle,
  deposit,
}: {
  open: boolean;
  toggle: () => void;
  deposit: any;
}) => {
  return (
    <Modal
      opened={open}
      title={"Pending Deposit Details"}
      centered
      onClose={toggle}
      size={"md"}
    >
      <div className="mt-5  border-gray-200">
        <dl className="divide-y divide-gray-200">
          {[
            ["User Name", deposit.name],
            ["Deposit of Month", deposit.month],
            ["Submitted on", deposit.submittedDate],
            ["Monthly Deposit", "1000"],
            ["Fine", deposit.fine],
            ["Total Amount", 1000 + (deposit.fine ?? 0)],
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
            <dt className="text-gray-500">Receipt</dt>
            <dd className="text-right">
              <a
                href={deposit.receipt}
                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              >
                view receipt
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex w-full border-t border-gray-200 pt-3 gap-4">
        <button
          type="button"
          aria-label="cancle"
          onClick={() => {
            console.log("I rejected it");
          }}
          className="bg-gray-600 flex-1  text-white rounded-md px-4 py-2"
        >
          Reject
        </button>
        <button
          aria-label="submit"
          onClick={() => {
            console.log("I accepted it");
          }}
          className="bg-blue-600  flex-1 text-white rounded-md px-4 py-2"
        >
          Accept
        </button>
      </div>
    </Modal>
  );
};

export default PendingDepositDetailsModal;
