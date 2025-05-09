import { yupResolver } from "@hookform/resolvers/yup";import { registerSchema } from "../../schema/auth.schema";
import { useForm } from "react-hook-form";
import { Modal } from "@mantine/core";
import CustomInput from "../common/CustomInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "../../api/api-client";

const CreateUserModal = ({ open, onClose }: any) => {
  const queryClient = useQueryClient();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { mutate: registerUser } = useMutation({
    mutationFn: async (data: any) => {
      await api.post(`/admin/user`, data);
    },
    onSuccess: () => {
      toast.success("User created successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <Modal
      withCloseButton={false}
      opened={open}
      onClose={onClose}
      title={"Create User"}
      centered
    >
      <form
        onSubmit={handleSubmit((data) => registerUser(data))}
        className="flex flex-col pt-6 gap-4"
      >
        <CustomInput
          id="name"
          label="Full Name"
          errors={errors}
          register={register}
        />
        <CustomInput
          id="email"
          label="Email"
          errors={errors}
          register={register}
        />
        <CustomInput
          id="phoneNumber"
          label="Phone Number"
          errors={errors}
          register={register}
        />
        <CustomInput
          id="activationDate"
          label="Activation Date"
          type="date"
          errors={errors}
          register={register}
        />
        <div className="flex w-full mt-3 gap-4">
          <button
            type="button"
            aria-label="cancle"
            onClick={() => {
              onClose();
            }}
            className="bg-gray-600 flex-1  text-white rounded-md px-4 py-2"
          >
            No
          </button>
          <button
            aria-label="submit"
            className="bg-blue-600  flex-1 text-white rounded-md px-4 py-2"
          >
            Yes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
