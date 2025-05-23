import CustomInput from "../components/common/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api-client";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

const Login = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const router = useNavigate();
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post("/auth/login", data);
      const myData = response.data?.data;
      Cookies.set("user", myData?.role);
    },
    onSuccess: () => {
      router("/");
    },
  });
  return (
    <div className="w-full flex h-screen bg-gray-100 justify-center items-center p-4">
      <form
        action=""
        onSubmit={handleSubmit((data) => loginUser(data))}
        className="w-[28rem] shadow-lg rounded-xl p-8 bg-white"
      >
        <h2 className="text-3xl text-center font-bold">Brother Finance</h2>
        <p className="text-sm text-center text-gray-600">
          Sign in to access your financial dashboard
        </p>
        <div className="mt-4">
          <div className="hidden md:block relative h-48 mb-8">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8bG9naW4lMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzE2ODYzMnww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="person using MacBook Pro"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x400?text=Brother+Finance";
              }}
            />
          </div>
        </div>
        <div className="flex flex-col mt-5 gap-4">
          <CustomInput
            id="email"
            label="Email"
            errors={errors}
            register={register}
          />
          <CustomInput
            id="password"
            label="Password"
            errors={errors}
            register={register}
            type="password"
          />
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="/reset-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            disabled={isPending}
            className="bg-blue-600 mt-4 text-white rounded-md px-4 py-2"
          >
            {isPending ? <Loader size={16} /> : " Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
