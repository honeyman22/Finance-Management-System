import { Modal, Tooltip } from "@mantine/core";import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { payInstallmentSchema } from "../../../schema/loan.schema";
import { api } from "../../../api/api-client";
import CustomDropzone from "../../common/CustomDropzone";
const PayInstallments = ({
  fine,
  open,
  close,
  id,
  emi,
}: {
  fine: number;
  open: boolean;
  close: () => void;
  id: string;
  emi: number;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(payInstallmentSchema),
  });

  const { mutate: payInstallment } = useMutation({
    mutationFn: async (data: any) => {
      const depositFormData = new FormData();
      depositFormData.append("image", data.receipt);
      await api.put(`/loan-payment/${id}`, depositFormData);
    },

    onSuccess: () => {
      close();
      toast.success("Installment paid successfully.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <Modal
      centered
      title={"Pay Installment"}
      size={"md"}
      opened={open}
      onClose={close}
    >
      <form
        onSubmit={handleSubmit((data) => payInstallment(data))}
        className=" flex flex-col gap-4 pb-4"
      >
        <h3 className="text-lg  font-medium text-gray-900">
          Installment Details
        </h3>
        <div className="p-4 bg-blue-50 rounded-md items-center flex justify-between">
          <p className="text-blue-800 font-medium  text-sm ">
            Your Monthly Installment Amount
          </p>
          <div className="gap-2 flex font-bold text-xl ">
            <p className=" text-gray-900"> रू {emi}</p>
            {fine > 0 && (
              <Tooltip
                label="Failure to make the deposit on or before the due date will result in a penalty of ₹10 per day of delay."
                withArrow
                color="red"
                events={{ hover: true, touch: true, focus: false }}
              >
                <p className=" text-red-500">+ {fine} </p>
              </Tooltip>
            )}
          </div>
        </div>

        <CustomDropzone
          onDrop={(files: any) => setValue("receipt", files[0])}
          onReject={(files: any) => setValue("receipt", files[0])}
          image={watch("receipt")}
          id="receipt"
          label="Upload Receipt"
          errors={errors}
        />

        <button className="text-white mt-4 bg-green-500 rounded-md px-4 h-10">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default PayInstallments;
