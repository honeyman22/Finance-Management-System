import { Loader, Modal } from "@mantine/core";
import CustomDropzone from "../common/CustomDropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { acceptRejectLoanSchema } from "../../schema/loan.schema";
import CustomTextArea from "../common/CustomTextArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";

const ApprovedRejectLoanModal = ({
  open,
  close,
  status,
  loanId,
}: {
  open: boolean;
  close: () => void;
  status: "Approve" | "Reject";
  loanId: string;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    register,
    watch,
  } = useForm({
    resolver: yupResolver(acceptRejectLoanSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: acceptReject, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append("image", data.receipt);
      await api.put(
        `admin/loan/${status.toLowerCase()}/${loanId}`,
        status === "Approve"
          ? formData
          : {
              notes: data.notes,
            }
      );
    },
    onSuccess: () => {
      close();
      toast.success(`${status} Loan successfully`);
      queryClient.invalidateQueries({ queryKey: ["pending-loan-requests"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });

  return (
    <Modal centered title={`${status} Loan`} opened={open} onClose={close}>
      <div className="bg-white rounded-md flex flex-col gap-4 pt-3">
        {status === "Approve" ? (
          <CustomDropzone
            onDrop={(files: any) => setValue("receipt", files[0])}
            onReject={(files: any) => setValue("receipt", files[0])}
            image={watch("receipt")}
            id="receipt"
            label="Upload Receipt"
            errors={errors}
          />
        ) : (
          <CustomTextArea
            errors={errors}
            register={register}
            id="notes"
            label="Reason's for Rejection"
            rows={4}
          />
        )}

        <button
          onClick={handleSubmit((data) => acceptReject(data))}
          className="text-white w-full bg-green-500 rounded-md px-4 h-10"
          disabled={isPending}
        >
          {isPending ? <Loader size={16} /> : status}
        </button>
      </div>
    </Modal>
  );
};

export default ApprovedRejectLoanModal;
