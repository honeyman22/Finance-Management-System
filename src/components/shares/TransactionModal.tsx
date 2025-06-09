import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Select } from "@mantine/core";
import { useForm } from "react-hook-form";
import { shareTransactionSchema } from "../../schema/share.schema";
import { FaSortDown } from "react-icons/fa";
import CustomInput from "../common/CustomInput";
import { DateInput } from "@mantine/dates";
import CustomDropzone from "../common/CustomDropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";

const TransactionModal = ({
  open,
  close,
  id,
}: {
  open: boolean;
  close: () => void;
  id: string | undefined;
}) => {
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
    watch,
  } = useForm({ resolver: yupResolver(shareTransactionSchema) });

  const queryClient = useQueryClient();

  const { mutate: recordTransaction } = useMutation({
    mutationFn: async (data: any) => {
      const transactionFormData = new FormData();
      transactionFormData.append("image", data.receipt);
      transactionFormData.append("transactionType", data.transactionType);
      transactionFormData.append("quantity", data.quantity);
      transactionFormData.append("perunitValue", data.perunitValue);
      transactionFormData.append("totalAmount", data.totalAmount);
      transactionFormData.append("transactionDate", data.transactionDate);

      await api.post(`/shares/${id}`, transactionFormData);
    },
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({ queryKey: ["shares-list"] });
      toast.success("Share transaction recorded successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });

  return (
    <Modal
      withCloseButton={false}
      opened={open}
      title={"Record Share Transaction"}
      size="lg"
      centered
      onClose={close}
    >
      <form
        onSubmit={handleSubmit((data) => recordTransaction(data))}
        className="flex flex-col gap-4 py-4 "
      >
        <div className="flex flex-col sm:flex-row  gap-4">
          <div className="w-full">
            <Select
              label="Loan Purpose"
              placeholder="Select purpose"
              data={["purchase", "sell"]}
              onChange={(value) => setValue("transactionType", value ?? "")}
              rightSection={<FaSortDown className=" mb-2 text-gray-500" />}
              error={errors["transactionType"]?.message ?? ""}
            />
          </div>
          <div className="w-full">
            <DateInput
              onChange={(value) => {
                setValue("transactionDate", value?.toDateString() ?? "");
              }}
              label="Transaction Date"
              id="transactionDate"
              error={
                errors["transactionDate"]?.message
                  ? String(errors["transactionDate"]?.message as any)
                  : ""
              }
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  gap-4">
          <div className="w-full">
            <CustomInput
              id="quantity"
              label="Quantity"
              errors={errors}
              register={register}
              type="number"
            />
          </div>
          <div className="w-full">
            <CustomInput
              id="perunitValue"
              label="Price per Share"
              errors={errors}
              register={register}
            />
          </div>
        </div>

        <CustomInput
          id="totalAmount"
          label="Total Payment"
          errors={errors}
          register={register}
        />

        <CustomDropzone
          onDrop={(files: any) => setValue("receipt", files[0])}
          onReject={(files: any) => setValue("receipt", files[0])}
          image={watch("receipt")}
          id="receipt"
          label="Upload Receipt"
          errors={errors}
        />
        <div className="flex w-full gap-4 mt-4 ">
          <button
            type="button"
            onClick={close}
            className="text-gray-500 flex-1 border rounded-md px-4 h-10"
          >
            Cancel
          </button>
          <button className="text-white flex-1 bg-blue-600 rounded-md px-4 h-10">
            Save Transaction
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionModal;
