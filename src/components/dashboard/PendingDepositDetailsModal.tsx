import { Modal } from "@mantine/core";
import { PendingApprovels } from "../../dtos/dashboard.dto";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";
const PendingDepositDetailsModal = ({
  open,
  toggle,
  deposit,
}: {
  open: boolean;
  toggle: () => void;
  deposit: PendingApprovels;
}) => {
  const { mutate: approve } = useMutation({
    mutationKey: ["pending-approval-requests"],
    mutationFn: () => api.put(`/admin/deposit/approve-deposit/${deposit.id}`),
    onSuccess: () => {
      toast.success("Deposit approved successfully");
      toggle();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  const { mutate: reject } = useMutation({
    mutationKey: ["pending-approval-requests"],
    mutationFn: () =>
      api.put(`/admin/deposit/reject-deposit/${deposit.id}`, {
        notes:
          "Document you provide is not proper. Please provide proper document.",
      }),
    onSuccess: () => {
      toast.success("Deposit rejected successfully");
      toggle();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
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
            ["User Name", deposit.userName],
            ["Deposit of Month", deposit.month],
            ["Submitted on", deposit.submittedAt.split("T")[0]],
            ["Monthly Deposit", deposit.amount],
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
                target="_blank"
                className="px-2 capitalize inline-flex text-xs leading-5 font-semibold rounded bg-green-100 text-green-800"
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
          aria-label="reject"
          onClick={() => {
            reject();
          }}
          className="bg-gray-600 flex-1  text-white rounded-md px-4 py-2"
        >
          Reject
        </button>
        <button
          aria-label="approve"
          onClick={() => {
            approve();
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
