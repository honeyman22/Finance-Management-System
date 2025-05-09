import { Modal } from "@mantine/core";const DetailsModal = ({
  open,
  toggle,
  user,
}: {
  open: boolean;
  toggle: () => void;
  user: any;
}) => {
  return (
    <Modal
      opened={open}
      title={"User Details"}
      centered
      onClose={toggle}
      size={"xl"}
    >
      <div className="mt-5  border-gray-200">
        <dl className="divide-y divide-gray-200">
          {[
            ["Full Name", user.name],
            ["Email", user.email],
            ["Phone Number", user.phoneNumber],
            ["Total Deposit", "250000"],
            ["Fine", "1250"],
            ["Remaining Loan", "₹11,250"],
            ["Next Payment Due", "December 15, 2023"],
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
                {user.status}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </Modal>
  );
};

export default DetailsModal;
