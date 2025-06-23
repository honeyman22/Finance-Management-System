import { Loader, Modal, Select, Tooltip } from "@mantine/core";import CustomDropzone from "../common/CustomDropzone";
import { DateInput } from "@mantine/dates";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDepositSchema } from "../../schema/deposit.schema";
import { FaSortDown } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";
const PayDepositModal = ({
  fine,
  open,
  close,
  id,
}: {
  fine: number;
  open: boolean;
  close: () => void;
  id: string;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addDepositSchema),
  });

  const queryClient = useQueryClient();

  const { mutate: payDeposit, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const depositFormData = new FormData();
      depositFormData.append("image", data.receipt);
      depositFormData.append("paymentMethod", data.paymentMethod);
      await api.put(`/deposit/update/${id}`, depositFormData);
    },

    onSuccess: () => {
      close();
      toast.success("Deposit paid successfully");
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <Modal centered title={"Pay Deposit"} opened={open} onClose={close}>
      <form
        onSubmit={handleSubmit((data) => payDeposit(data))}
        className=" flex flex-col gap-4 pb-4"
      >
        <h3 className="text-lg  font-medium text-gray-900">Deposit Details</h3>
        <div className="p-4 bg-blue-50 rounded-md items-center flex justify-between">
          <div className=" text-sm ">
            <p className="text-blue-800 font-medium ">Fixed Monthly Amount</p>
            <p className=" text-blue-600">Standard deposit amount is fixed</p>
          </div>
          <div className="gap-2 flex font-bold text-xl ">
            <p className=" text-gray-900">₹1000</p>
            {fine > 0 && (
              <Tooltip
                label="Failure to make the deposit on or before the due date will result in a penalty of ₹10 per day of delay."
                withArrow
                color="red"
                events={{ hover: true, touch: true, focus: false }}
              >
                <p className=" text-red-500">+ fine </p>
              </Tooltip>
            )}
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
          data={[
            {
              label: "Esewa",
              value: "esewa",
            },
            { label: "Bank Transfer", value: "bank_transfer" },
          ]}
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

        <button
          disabled={isPending}
          className="text-white mt-4 bg-green-500 rounded-md px-4 h-10"
        >
          {isPending ? <Loader size={"md"} /> : "   Submit Application"}
        </button>
      </form>
    </Modal>
  );
};

export default PayDepositModal;
