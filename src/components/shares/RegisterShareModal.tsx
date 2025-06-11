import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "@mantine/core";
import { useForm } from "react-hook-form";
import { registerShareSchema } from "../../schema/share.schema";
import CustomInput from "../common/CustomInput";
import { api } from "../../api/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const RegisterShareModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerShareSchema) });

  const queryClient = useQueryClient();

  const { mutate: createShare } = useMutation({
    mutationFn: async (data: any) => {
      await api.post(`/shares`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shares-list"],
      });
      
      close();
      reset();
      toast.success("Share created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });

  return (
    <Modal
      centered
      opened={open}
      onClose={close}
      withCloseButton={false}
      title="Register Share"
    >
      <form
        action=""
        onSubmit={handleSubmit((data) => createShare(data))}
        className="pt-3"
      >
        <CustomInput
          errors={errors}
          id="shareName"
          label="Share Name"
          register={register}
        />
        <div className="flex w-full gap-4 mt-4 ">
          <button
            type="button"
            onClick={() => {
              close();
              reset();
            }}
            className="bg-gray-500 text-white flex-1 border rounded-md px-4 h-10"
          >
            Cancel
          </button>
          <button className="text-white flex-1 bg-blue-600 rounded-md px-4 h-10">
            Save Transaction
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterShareModal;
