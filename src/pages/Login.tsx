import CustomInput from "../components/common/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api-client";

import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const router = useNavigate();
  const { mutate: loginUser } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await api.post("/auth/login", data);
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forget-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button className="bg-blue-600 mt-4 text-white rounded-md px-4 py-2">
            Sign in
          </button>
        </div>
        <div className="w-full text-center mt-4">
          <Link to="/register" className=" text-gray-600 text-sm">
            Don't have account?{" "}
            <span className=" text-blue-500 hover:underline">Signup</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
