import CustomInput from "../components/common/CustomInput";import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api-client";

import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const router = useNavigate();
  const { mutate: loginUser } = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
      phoneNumber: string;
    }) => {
      await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        user_type: "user",
      });
    },
    onSuccess: () => {
      router("/login");
    },
  });
  return (
    <div className="w-full flex h-screen bg-gray-100 justify-center items-center p-4">
      <form
        action=""
        onSubmit={handleSubmit((data) => loginUser(data))}
        className="w-[28rem] shadow-lg rounded-xl p-8 bg-white"
      >
        <h2 className="text-3xl text-center font-bold">Create Account</h2>
        <p className="text-sm text-center text-gray-600">
          Register to manage your finances with Brother Finance
        </p>
        <div className="flex flex-col mt-5 gap-4">
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
                I agree to the{" "}
                <span className="font-medium text-blue-500">Terms</span> and{" "}
                <span className="font-medium text-blue-500">
                  Privacy Policy
                </span>
              </label>
            </div>
          </div>
          <button className="bg-blue-600 mt-4 text-white font-medium rounded-md px-4 py-2">
            Create Account
          </button>
        </div>
        <div className="w-full text-center mt-4">
          <Link to="/login" className=" text-gray-600 text-sm">
            Already have account?{" "}
            <span className=" text-blue-500 hover:underline">Signin</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
