import React from "react";
import ApprovedRejectLoanModal from "../dashboard/ApprovedRejectLoanModal";
import { useDisclosure } from "@mantine/hooks";
import { LoanApprovalRequest } from "../../dtos/dashboard.dto";
const PendingQueueItems = ({ data }: { data: LoanApprovalRequest }) => {
  const [openModal, { toggle: toggleOpenModal }] = useDisclosure(false);
  const [status, setStatus] = React.useState<"Approve" | "Reject">("Approve");
  return (
    <li className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {data.user.fullName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ₹ {data.amount}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Submitted: {data.createdAt.split("T")[0]}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setStatus("Approve");
              toggleOpenModal();
            }}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 "
          >
            Approve
          </button>
          <button
            onClick={() => {
              setStatus("Reject");
              toggleOpenModal();
            }}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
          >
            Reject
          </button>
        </div>
      </div>
      <ApprovedRejectLoanModal
        open={openModal}
        close={toggleOpenModal}
        status={status}
        loanId={data.id}
      />
    </li>
  );
};

export default PendingQueueItems;
