import { Avatar } from "@mantine/core";import { PendingItemData } from "../../types";
import { MdCalendarMonth, MdLockClock } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import PendingDepositDetailsModal from "./PendingDepositDetailsModal";
interface Props {
  item: PendingItemData;
  onView: (id: string) => void;
}

const PendingItem: React.FC<Props> = ({ item, onView }) => {
  console.log(onView);
  const [viewDeposit, { toggle: toggleDeposit }] = useDisclosure();
  return (
    <li className="block hover:bg-gray-50">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div> */}
            <Avatar />

            <div className="ml-4">
              <div className="text-sm font-medium text-indigo-600 capitalize">
                {item.type.replace("-", " ")} Approval
              </div>
              <div className="text-sm text-gray-500">
                {item.name} - ₹{item.amount.toLocaleString()}
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleDeposit()}
            className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            View
          </button>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <MdCalendarMonth className="mr-1.5 h-5 w-5 text-gray-400" />
            Submitted on {item.date}
          </div>
          <div className="mt-2 sm:mt-0 flex items-center text-sm text-yellow-600">
            <MdLockClock className="mr-1.5 h-5 w-5 text-yellow-500" />
            Awaiting approval
          </div>
        </div>
      </div>
      <PendingDepositDetailsModal
        deposit={item}
        open={viewDeposit}
        toggle={toggleDeposit}
      />
    </li>
  );
};

export default PendingItem;
