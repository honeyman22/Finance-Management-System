import { ActionIcon, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { BsEye } from "react-icons/bs";
import ImageViewModal from "../../common/ImageViewModal";
import { Settlement } from "../../../dtos/loan-details.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/api-client";
import { toast } from "react-toastify";
import RejectSettelmentModal from "../../dashboard/pending-settelment/RejectSettelmentModal";
const SettelmentCard = ({ settelement }: { settelement: Settlement }) => {
  const [openImage, { toggle: toggleOpenImage }] = useDisclosure(false);
  const [image, setImage] = React.useState<string | null>(null);
  const [openRejectModal, { toggle: toggleOpenRejectModal }] =
    useDisclosure(false);
  // const [image, setImage] = React.useState<string | null
  const queryClient = useQueryClient();

  const { mutate: acceptSettelement, isPending } = useMutation({
    mutationFn: async () => {
      await api.put(`admin/settelment/approve/${settelement.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loan-details"],
      });
      toggleOpenImage();
      toast.success("Settelment Approved Successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <section className="bg-white rounded-xl shadow-md w-full">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Settelment Summary
      </h3>
      <div className="mt-5 border-t border-gray-200 ">
        <dl className="divide-y divide-gray-200">
          {[
            ["Principal Amount", settelement.principleAmount],
            ["Interest", `${settelement.interest} months`],
            ["Total Paid Amount", settelement.paidAmount],
            ["Created At", settelement.createdAt.split("T")[0]],
          ].map(([title, value], idx) => (
            <div
              className="py-3 px-3 flex justify-between text-sm"
              key={idx + 4}
            >
              <dt className="text-gray-500">{title}</dt>
              <dd
                className={`text-gray-900 text-right ${
                  title === "Monthly Installment" ? "font-medium" : ""
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
          <div className="p-3 flex justify-between text-sm">
            <dt className="text-gray-500">Status</dt>
            <dd className="text-right">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {settelement.status}
              </span>
            </dd>
          </div>
          <div className="p-3 flex justify-between text-sm">
            <dt className="text-gray-500">Receipt</dt>
            <dd className="text-right">
              <ActionIcon
                onClick={() => {
                  setImage(settelement.receipt);
                  toggleOpenImage();
                }}
              >
                <BsEye />
              </ActionIcon>
            </dd>
          </div>
        </dl>
        {settelement.status === "pending" && (
          <div className="flex gap-4 p-4">
            <button
              onClick={() => acceptSettelement()}
              className="text-white w-full bg-green-500 rounded-md px-4 h-10"
              disabled={isPending}
            >
              {isPending ? <Loader size={16} /> : "Approve"}
            </button>
            <button
              onClick={toggleOpenRejectModal}
              className="text-white w-full bg-red-500 rounded-md px-4 h-10"
            >
              Reject
            </button>
          </div>
        )}
      </div>
      <ImageViewModal open={openImage} toggle={toggleOpenImage} image={image} />
      <RejectSettelmentModal
        open={openRejectModal}
        close={toggleOpenRejectModal}
        id={settelement.id}
      />
    </section>
  );
};

export default SettelmentCard;
