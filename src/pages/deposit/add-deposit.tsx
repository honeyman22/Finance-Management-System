// import { yupResolver } from "@hookform/resolvers/yup";// import { useForm } from "react-hook-form";
// import { addDepositSchema } from "../../schema/deposit.schema";
// import { FaSortDown } from "react-icons/fa";
// import { Divider, Select, Tooltip } from "@mantine/core";
// import CustomInput from "../../components/common/CustomInput";
// import { DateInput } from "@mantine/dates";
// import CustomDropzone from "../../components/common/CustomDropzone";

const AddDepositPage = () => {
  // const {
  //   formState: { errors },
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  // } = useForm({
  //   resolver: yupResolver(addDepositSchema),
  // });
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
              Monthly Deposit Form
            </h3>
            <p className="mt-2 text-sm font-sans  text-gray-600">
              Submit your monthly deposit of ₹1,000 to continue growing your
              savings
            </p>
            {/* <form
              action=""
              onSubmit={handleSubmit((data) => console.log(data))}
              className="mt-4 w-full flex flex-col gap-4"
            >
              <div className=" flex flex-col gap-4 pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
                <CustomInput
                  errors={errors}
                  id={"name"}
                  label={"Full Name"}
                  register={register}
                  type="text"
                />
                <CustomInput
                  errors={errors}
                  id={"email"}
                  label={"Email"}
                  register={register}
                  type="email"
                />
                <CustomInput
                  errors={errors}
                  id={"phoneNumber"}
                  label={"Phone Number"}
                  register={register}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <Divider />

              <div className=" flex flex-col gap-4 pb-4">
                <h3 className="text-lg  font-medium text-gray-900">
                  Deposit Details
                </h3>
                <div className="p-4 bg-blue-50 rounded-md items-center flex justify-between">
                  <div className=" text-sm ">
                    <p className="text-blue-800 font-medium ">
                      Fixed Monthly Amount
                    </p>
                    <p className=" text-blue-600">
                      Standard deposit amount is fixed
                    </p>
                  </div>
                  <div className="gap-2 flex font-bold text-xl ">
                    <p className=" text-gray-900">₹1000</p>
                    <Tooltip
                      label="Failure to make the deposit on or before the due date will result in a penalty of ₹10 per day of delay."
                      withArrow
                      color="red"
                      events={{ hover: true, touch: true, focus: false }}
                    >
                      <p className=" text-red-500">+ 40</p>
                    </Tooltip>
                  </div>
                </div>

                <DateInput
                  onChange={(value) => {
                    setValue("depositDate", value?.toDateString() ?? "");
                  }}
                  label="Payment Date"
                  placeholder="Select date"
                  id="date"
                  error={
                    errors["depositDate"]?.message
                      ? String(errors["depositDate"]?.message as any)
                      : ""
                  }
                />
                <Select
                  label="Payment Method"
                  placeholder="Select method"
                  data={["Bank Transfor", "Cheque", "Cash", "Others"]}
                  onChange={(value) => setValue("paymentMethod", value ?? "")}
                  rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
                  error={
                    errors["paymentMethod"]?.message
                      ? String(errors["paymentMethod"]?.message as any)
                      : ""
                  }
                />
                <CustomDropzone
                  onDrop={(files: any) => setValue("receipt", files[0])}
                  onReject={(files: any) => setValue("receipt", files[0])}
                  image={watch("receipt")}
                  id="receipt"
                  label="Upload Receipt"
                  errors={errors}
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
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepositPage;
