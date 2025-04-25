import { useDisclosure } from "@mantine/hooks";
import { DepositData } from "../../dtos/deposits.dto";
import PayDepositModal from "./PayDepositModal";
const statusStyles: Record<string, string> = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
};
const DepositTableRow = ({ deposit }: { deposit: DepositData }) => {
  const [openPayModal, { toggle: togglePayModal }] = useDisclosure(false);
  return (
    <>
      {" "}
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {deposit.depositDate.split("T")[0]}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {deposit.amount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {deposit.fine}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {deposit.paymentMethod}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 capitalize font-semibold rounded-full ${
              statusStyles[deposit.status]
            }`}
          >
            {deposit.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          {deposit.isPaid ? (
            <button className="text-indigo-600 hover:text-indigo-900">
              View Receipt
            </button>
          ) : (
            <button
              onClick={togglePayModal}
              className="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              Pay Now
            </button>
          )}
        </td>
      </tr>
      <PayDepositModal
        open={openPayModal}
        fine={deposit.fine}
        close={togglePayModal}
        id={deposit.id}
      />
    </>
  );
};

export default DepositTableRow;
