import { SharesListData } from "../../types/share.dtos";import { useDisclosure } from "@mantine/hooks";
import TransactionModal from "./TransactionModal";
import { MdAdd } from "react-icons/md";
import { ActionIcon } from "@mantine/core";
import { FiExternalLink } from "react-icons/fi";

const ShareRow = ({ share }: { share: SharesListData }) => {
  const [openPayModal, { toggle: togglePayModal }] = useDisclosure(false);
  return (
    <>
      <tr className=" text-sm text-gray-500 dark:text-gray-300">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          {share.shareName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          {share.remainingQuantity}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          {share?.latestTransactionPerUnitValue}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          {share?.totalInvestments}
        </td>
        <td className="px-6 py-4 whitespace-nowrap ">
          {" "}
          {share?.totalExpenses}
        </td>
        <td className="px-6 py-4 gap-2 flex items-center whitespace-nowrap ">
          <ActionIcon onClick={togglePayModal}>
            <MdAdd />
          </ActionIcon>
          <ActionIcon onClick={togglePayModal}>
            <FiExternalLink />
          </ActionIcon>
        </td>
      </tr>
      <TransactionModal
        id={share.id}
        open={openPayModal}
        close={togglePayModal}
      />
    </>
  );
};

export default ShareRow;
