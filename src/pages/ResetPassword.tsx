import { useForm } from "react-hook-form";
import CustomInput from "../components/common/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../schema/auth.schema";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const router = useNavigate();
  const location = useLocation();
  const token = location.search.split("=")[1];

  const { mutate: resetPassword } = useMutation({
    mutationFn: async (data: { password: string; confirmPassword: string }) => {
      await api.post(`/auth/reset-password`, {
        token: token,
        password: data?.password,
      });
    },
    onSuccess: () => {
      router("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <div className="flex justify-center bg-gray-50 h-screen items-center p-6">
      <form
        onSubmit={handleSubmit((data) => resetPassword(data))}
        action=""
        className="flex w-full bg-white sm:w-[450px] sm:shadow-sm p-4  rounded-md flex-col mt-5 gap-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Reset Password
        </h1>
        <CustomInput
          id="password"
          label="Password"
          errors={errors}
          register={register}
          type="password"
        />
        <CustomInput
          id="confirmPassword"
          label="Confirm Password"
          errors={errors}
          register={register}
          type="password"
        />
        <div className="flex gap-4">
          <button
            type="button"
            aria-label="cancle"
            onClick={() => {
              router("/");
            }}
            className="bg-gray-600 flex-1 mt-4 text-white rounded-md px-4 py-2"
          >
            Cancle
          </button>
          <button
            type="submit"
            aria-label="submit"
            className="bg-blue-600 mt-4 flex-1 text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
