import { Loader, Modal } from "@mantine/core";import CustomTextArea from "../../common/CustomTextArea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { rejectSettelmentSchema } from "../../../schema/loan.schema";
import { api } from "../../../api/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const RejectSettelmentModal = ({
  id,
  close,
  open,
}: {
  id: string;
  close: () => void;
  open: boolean;
}) => {
  const {
    formState: { errors },
    handleSubmit,

    register,
  } = useForm({
    resolver: yupResolver(rejectSettelmentSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: rejectSettelement, isPending } = useMutation({
    mutationFn: async (data: any) => {
      await api.put(`admin/settelment/reject/${id}`, { notes: data?.notes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loan-details"],
      });
      close();
      toast.success("Settelment Rejected Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <Modal opened={open} centered title="Reject Settlement" onClose={close}>
      <form
        onSubmit={handleSubmit((data) => rejectSettelement(data))}
        className="flex gap-4 flex-col "
      >
        <CustomTextArea
          register={register}
          id="notes"
          label="Reason"
          rows={4}
          errors={errors}
        />
        <div className="flex-1 flex gap-4">
          <button
            type="submit"
            className="text-white w-full bg-green-500 rounded-md px-4 h-10"
            disabled={isPending}
          >
            {isPending ? <Loader size={16} /> : "Reject"}
          </button>

          <button
            type="button"
            onClick={close}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RejectSettelmentModal;
