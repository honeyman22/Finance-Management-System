import { useMutation } from "@tanstack/react-query";import PendingQueueItems from "../common/PendingQueueItems";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";
type PendingDepositsCardProps = {
  deposits: {
    name: string;
    amount: number;
    submittedDate: string;
  }[];
};

const PendingLoansCard: React.FC<PendingDepositsCardProps> = ({ deposits }) => {
  const { mutate: handleApproveandReject } = useMutation({
    mutationFn: async (data: { id: string; status: string }) => {
      return await api.put(`loan/${data?.id}`, {
        status: data?.status,
      });
    },

    onSuccess: () => {
      toast.success("Loan application updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <div className="bg-white w-full dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Loan Applications
        </h3>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {deposits.map((deposit, index) => (
          <PendingQueueItems
            key={index + 8}
            type={"loan"}
            name={deposit.name}
            amount={deposit.amount}
            submittedDate={deposit.submittedDate}
            onApprove={() =>
              handleApproveandReject({ id: deposit.name, status: "approved" })
            }
            onReject={() =>
              handleApproveandReject({ id: deposit.name, status: "rejected" })
            }
          />
        ))}
      </ul>

      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 font-medium">
          View All Applications
        </button>
      </div>
    </div>
  );
};
export default PendingLoansCard;
