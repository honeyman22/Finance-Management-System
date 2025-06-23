import { Loader, Modal, Tooltip } from "@mantine/core";import { SettelmetGetData } from "../../../dtos/loan-details.dto";
import CustomDropzone from "../../common/CustomDropzone";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/api-client";
import { toast } from "react-toastify";

import { settlementSchema } from "../../../schema/loan.schema";
import CustomInput from "../../common/CustomInput";
import { useParams } from "react-router-dom";
const SettelmentModal = ({
  open,
  toggle,
  settelment,
}: {
  open: boolean;
  toggle: () => void;
  settelment: SettelmetGetData;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    register,
  } = useForm({
    resolver: yupResolver(settlementSchema),
    defaultValues: {
      interest: settelment?.interest,
      paidAmount: settelment?.paidAmount,
      principleAmount: settelment?.principleAmount,
      receipt: settelment?.receipt,
    },
  });

  const queryClient = useQueryClient();

  const { id } = useParams<string>();
  const { mutate: payDeposit, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const settlementFormData = new FormData();
      settlementFormData.append("image", data.receipt);
      settlementFormData.append("loanId", id ?? "");
      settlementFormData.append("interest", data.interest);
      settlementFormData.append("paidAmount", data.paidAmount);
      settlementFormData.append("principleAmount", data.principleAmount);
      await api.post(`/settelment`, settlementFormData);
    },

    onSuccess: () => {
      toggle();
      toast.success("Loan setteled  successfully");
      queryClient.invalidateQueries({ queryKey: ["settelment-details"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <Modal opened={open} onClose={toggle} title="Settelment">
      <form
        onSubmit={handleSubmit((data) => payDeposit(data))}
        className=" flex flex-col gap-4 pb-4"
      >
        <h3 className="text-lg  font-medium text-gray-900">
          Settelment Details ({settelment?.status})
        </h3>
        <div className="p-4 bg-blue-50 rounded-md items-center flex justify-between">
          <p className="text-blue-800 font-medium  text-sm ">
            Fixed Monthly Amount
          </p>
          <div className="gap-2 flex font-bold text-xl ">
            <p className=" text-gray-900">रू {settelment.principleAmount}</p>
            {settelment.interest > 0 && (
              <Tooltip
                label="Your Interest Amount"
                withArrow
                color="red "
                events={{ hover: true, touch: true, focus: false }}
              >
                <p className=" text-red-500">+ {settelment.interest} </p>
              </Tooltip>
            )}
          </div>
        </div>

        <CustomInput
          errors={errors}
          register={register}
          id="principleAmount"
          label="Total Principle Amount"
          disabled
        />
        <CustomInput
          errors={errors}
          register={register}
          id="interest"
          label="Interest"
          disabled
        />
        <CustomInput
          errors={errors}
          register={register}
          id="paidAmount"
          label="Total Paid Amount"
          disabled
        />
        <CustomDropzone
          onDrop={(files: any) => setValue("receipt", files[0])}
          onReject={(files: any) => setValue("receipt", files[0])}
          image={watch("receipt")}
          id="receipt"
          label="Upload Receipt"
          errors={errors}
          ischangeable={settelment.status !== "pending"}
        />
        <div className="w-full flex gap-2">
          <button
            disabled={isPending || settelment.status === "pending"}
            className={`text-white mt-4 bg-green-500 flex-1 rounded-md px-4 h-10 ${
              settelment.status === "pending" && "cursor-not-allowed"
            }`}
          >
            {isPending ? <Loader size={"md"} /> : "Settel Now"}
          </button>
          <button
            disabled={isPending || settelment.status === "pending"}
            className={`text-white mt-4 bg-gray-500 flex-1 rounded-md px-4 h-10 ${
              settelment.status === "pending" && "cursor-not-allowed"
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SettelmentModal;
