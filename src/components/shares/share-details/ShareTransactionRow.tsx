import { ActionIcon } from "@mantine/core";import { useDisclosure } from "@mantine/hooks";
import { BsEye } from "react-icons/bs";
import ImageViewModal from "../../common/ImageViewModal";
import { Transaction } from "../../../dtos/shares.dto";

const ShareTransactionRow = ({ transaction }: { transaction: Transaction }) => {
  const [openImageModal, { toggle: toggleOpenImageModal }] =
    useDisclosure(false);
  return (
    <>
      <tr className=" text-sm border-t text-gray-500 dark:text-gray-300">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          {transaction?.createdAt.split("T")[0]}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          <span
            className={`px-4 py-0.5 ${
              transaction?.transactionType === "purchase"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } text-xs font-medium capitalize mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`}
          >
            {transaction?.transactionType}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap ">
          {transaction?.quantity}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          {" "}
          {transaction?.perUnitValue}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          {" "}
          {transaction?.totalAmount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          {" "}
          {transaction?.expenses}
        </td>
        <td className="px-6 py-4 gap-2 flex items-center whitespace-nowrap ">
          <ActionIcon onClick={toggleOpenImageModal}>
            <BsEye />
          </ActionIcon>
        </td>
      </tr>
      <ImageViewModal
        open={openImageModal}
        image={transaction.receipt}
        toggle={toggleOpenImageModal}
      />
    </>
  );
};

export default ShareTransactionRow;
