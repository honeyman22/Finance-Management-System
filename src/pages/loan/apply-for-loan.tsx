import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Select } from "@mantine/core";
import { FaSortDown } from "react-icons/fa";
import { applyForLoanSchema } from "../../schema/loan.schema";
import CustomInput from "../../components/common/CustomInput";

const ApplyForLoan = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(applyForLoanSchema),
  });
  return (
    <div className="lg:flex w-full lg:items-center lg:p-10 lg:justify-center">
      <div className="bg-white rounded-md">
        <div className="flex ">
          <img
            src="/loan.jpg"
            alt=""
            className="w-1/2 hidden lg:block object-cover"
          />
          <div className="p-4 w-full sm:p-8 lg:w-1/2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Apply for Loan
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You can apply for loans up to ₹25,000 based on your membership and
              deposit history.
            </p>
            <form
              action=""
              onSubmit={handleSubmit((data) => console.log(data))}
              className="mt-4 w-full flex flex-col gap-4"
            >
              <div className="border-b flex flex-col gap-4 pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
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
              </div>
              <div className="border-b flex flex-col gap-4 pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Loan Details
                </h3>
                <div className="p-4 bg-green-400 bg-opacity-15 rounded-md items-center flex justify-between">
                  <div className="">
                    <p className="text-green-700 text-sm ">
                      Eligible Loan Amount
                    </p>
                    <p className=" font-medium text-green-700">
                      Based on your deposit history and membership
                    </p>
                  </div>
                  <h3 className="text-xl font-semibold text-green-600">
                    NPR 25,000
                  </h3>
                </div>
                <CustomInput
                  id="loanAmount"
                  label="Loan Amount"
                  errors={errors}
                  register={register}
                  type={"number"}
                />
                <Select
                  label="Loan Purpose"
                  placeholder="Select purpose"
                  data={["Personal", "Business", "Education", "Others"]}
                  onChange={(value) => setValue("loanType", value ?? "")}
                  rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
                  error={errors["loanType"]?.message ?? ""}
                />
                <Select
                  label="Loan Tenure (Months)"
                  placeholder="Select tenure"
                  data={["3", "6", "12"]}
                  onChange={(value) => setValue("loanTerm", value ?? "")}
                  rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
                  error={errors["loanTerm"]?.message ?? ""}
                />{" "}
                <Select
                  label="Repayment Frequency"
                  placeholder="Select frequency"
                  data={["Monthly", "Bi-Weekly", "Weekly"]}
                  onChange={(value) =>
                    setValue("repaymentFrequency", value ?? "")
                  }
                  rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
                  error={errors["repaymentFrequency"]?.message ?? ""}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor={"notes"}
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Notes
                </label>
                {/* <textarea
                  id={"notes"}
                  {...register("notes")}
                  autoComplete="none"
                  className="appearance-none resize-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows={5}
                /> */}
              </div>
              <div className="flex w-full justify-end">
                <button className="text-white bg-green-500 rounded-md px-4 h-10">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForLoan;
