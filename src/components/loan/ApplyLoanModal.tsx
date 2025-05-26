import { yupResolver } from "@hookform/resolvers/yup";
import { applyForLoanSchema } from "../../schema/loan.schema";
import { useForm } from "react-hook-form";
import { Modal, Select } from "@mantine/core";
import { FaSortDown } from "react-icons/fa";
import CustomInput from "../common/CustomInput";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";
const ApplyLoanModal = ({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(applyForLoanSchema),
    defaultValues: {
      loanAmount: "",
      loanTerm: "5",
      loanType: "Others",
      repaymentFrequency: "monthly",
    },
  });

  const { mutate: applyForLoan } = useMutation({
    mutationFn: async (data: any) => {
      await api.post("/loan/apply", {
        amount: parseInt(data.loanAmount),
        repaymentFrequency: data.repaymentFrequency,
        loanDuration: parseInt(data.loanTerm),
      });
    },
    onSuccess: () => {
      close();
      toast.success("Loan application submitted successfully");
      // Optionally, you can invalidate queries or show a success message
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <Modal
      centered
      withCloseButton={false}
      size="lg"
      opened={open}
      onClose={close}
    >
      <form
        onSubmit={handleSubmit((data) => applyForLoan(data))}
        className="bg-white rounded-md flex flex-col gap-4 pb-4"
      >
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Loan Details
        </h3>
        <div className="p-4 bg-green-400 bg-opacity-15 rounded-md items-center flex justify-between">
          <div className="">
            <p className="text-green-700 text-sm ">Eligible Loan Amount</p>
            <p className=" font-medium text-green-700">
              Based on your deposit history and membership
            </p>
          </div>
          <h3 className="text-xl font-semibold text-green-600">NPR 25,000</h3>
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
          disabled
          value={"Others"}
          data={["Personal", "Business", "Education", "Others"]}
          onChange={(value) => setValue("loanType", value ?? "")}
          rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
          error={errors["loanType"]?.message ?? ""}
        />
        <Select
          label="Loan Tenure (Months)"
          placeholder="Select tenure"
          data={["3", "5", "6", "12"]}
          value={"5"}
          onChange={(value) => setValue("loanTerm", value ?? "")}
          rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
          error={errors["loanTerm"]?.message ?? ""}
        />{" "}
        <Select
          label="Repayment Frequency"
          value={"monthly"}
          disabled
          placeholder="Select frequency"
          data={["monthly", "bi-Weekly", "weekly"]}
          onChange={(value) => setValue("repaymentFrequency", value ?? "")}
          rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
          error={errors["repaymentFrequency"]?.message ?? ""}
        />
        <div className="flex w-full gap-4 mt-4 ">
          <button
            type="button"
            onClick={close}
            className="text-gray-500 flex-1 border rounded-md px-4 h-10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white flex-1 bg-blue-600 rounded-md px-4 h-10"
          >
            Apply
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplyLoanModal;
