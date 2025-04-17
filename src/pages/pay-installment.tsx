import { yupResolver } from "@hookform/resolvers/yup";import { useForm } from "react-hook-form";
import { payLoanSchema } from "../schema/loan.schema";
import CustomInput from "../components/common/CustomInput";
import { FaInfoCircle, FaSortDown } from "react-icons/fa";
import { Divider, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import CustomDropzone from "../components/common/CustomDropzone";
const PayInstallmentPage = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(payLoanSchema),
  });
  return (
    <div className="lg:flex w-full lg:items-center lg:p-10 lg:justify-center">
      <div className="bg-white rounded-md">
        <div className="flex ">
          <img
            src="/deposit.jpg"
            alt=""
            className="w-1/2 hidden lg:block object-cover"
          />
          <div className="p-4 w-full  sm:p-8 lg:w-1/2">
            <h3 className="text-2xl font-sans leading-6 font-bold text-gray-900">
              Pay Loan Installment
            </h3>
            <p className="mt-2 text-sm font-sans  text-gray-600">
              Complete the form below to make your loan installment payment
            </p>
            <form
              action=""
              onSubmit={handleSubmit((data) => console.log(data))}
              className="mt-4 w-full flex flex-col gap-4"
            >
              <div className=" flex flex-col gap-4 pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Loan Details
                </h3>
                <div className="p-6 flex  rounded-md bg-opacity-80 bg-gray-100">
                  <div className="flex flex-col w-2/3 font-sans text-sm gap-3">
                    <div className=" ">
                      <p className="text-gray-500 ">Loan ID</p>
                      <p className=" font-medium text-gray-900 ">BF-L-10023</p>
                    </div>
                    <div className="">
                      <p className="text-gray-500 text-sm ">Interest Rate</p>
                      <p className=" font-medium text-gray-900">
                        12% per annum
                      </p>
                    </div>
                    <div className="">
                      <p className="text-gray-500 text-sm ">Total EMI</p>
                      <p className=" font-medium text-gray-900">
                        ₹1,330 per month
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col  font-sans text-sm gap-3">
                    <div className=" ">
                      <p className="text-gray-500 ">Loan Amount</p>
                      <p className=" font-medium text-gray-900 ">NPR 25,000</p>
                    </div>
                    <div className="">
                      <p className="text-gray-500 text-sm ">Loan Term</p>
                      <p className=" font-medium text-gray-900">12 months</p>
                    </div>
                    <div className="">
                      <p className="text-gray-500 text-sm ">EMIs Paid</p>
                      <p className=" font-medium text-gray-900">3 of 12</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4  border-yellow-400 p-4 mb-2 flex items-start gap-4">
                <FaInfoCircle className="text-yellow-500" />
                <div className="-mt-1 text-yellow-600">
                  <p className="text-yellow-600 text-sm font-medium leading-6">
                    Upcoming Installment
                  </p>
                  <p className="text-yellow-600  leading-6">
                    Your next installment of{" "}
                    <span className="font-semibold"> ₹1,330 </span> is due on{" "}
                    <span className="font-semibold">15 November, 2023.</span>
                  </p>
                </div>
              </div>
              <Divider />
              <div className=" flex flex-col gap-4 pb-4">
                <h3 className="text-lg  font-medium text-gray-900">
                  Payment Details
                </h3>
                <CustomInput
                  errors={errors}
                  id={"amount"}
                  label={"Payment Amount"}
                  register={register}
                  type="number"
                />
                <DateInput
                  onChange={(value) => {
                    setValue("date", value?.toDateString() ?? "");
                  }}
                  label="Payment Date"
                  placeholder="Select date"
                  id="date"
                  error={errors["date"]?.message ?? ""}
                />
                <Select
                  label="Payment Method"
                  placeholder="Select method"
                  data={["Bank Transfor", "Cheque", "Cash", "Others"]}
                  onChange={(value) => setValue("paymentMethod", value ?? "")}
                  rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
                  error={errors["paymentMethod"]?.message ?? ""}
                />
                <CustomDropzone
                  onDrop={(files: any) => setValue("receipt", files[0])}
                  onReject={(files: any) => setValue("receipt", files[0])}
                  image={watch("receipt")}
                  id="receipt"
                                  label="Upload Receipt"
                                  
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor={"notes"}
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Notes
                </label>
                <textarea
                  id={"notes"}
                  {...register("notes")}
                  autoComplete="none"
                  className="appearance-none resize-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows={5}
                />
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

export default PayInstallmentPage;
