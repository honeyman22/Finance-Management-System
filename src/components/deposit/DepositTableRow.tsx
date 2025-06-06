import { useDisclosure } from "@mantine/hooks";import { DepositData } from "../../dtos/deposits.dto";
import PayDepositModal from "./PayDepositModal";
import ImageViewModal from "../common/ImageViewModal";
const statusStyles: Record<string, string> = {
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
};
const DepositTableRow = ({ deposit }: { deposit: DepositData }) => {
  const [openPayModal, { toggle: togglePayModal }] = useDisclosure(false);
  const [openImageModal, { toggle: toggleOpenImageModal }] =
    useDisclosure(false);
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
            <button
              onClick={toggleOpenImageModal}
              className="bg-green-600 text-sm px-4 py-0.5 rounded-md text-white  hover:bg-green-900 mr-2"
            >
              View Receipt
            </button>
          ) : (
            <button
              onClick={togglePayModal}
              className="bg-indigo-600 text-sm px-4 py-0.5 rounded-md text-white  hover:bg-indigo-900 mr-2"
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
      <ImageViewModal
        image={deposit.receipt}
        open={openImageModal}
        toggle={toggleOpenImageModal}
      />
    </>
  );
};

export default DepositTableRow;
