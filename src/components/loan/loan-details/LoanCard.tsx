import { ActionIcon } from "@mantine/core";import { LoanDetails } from "../../../dtos/loan-details.dto";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { BsEye } from "react-icons/bs";
import ImageViewModal from "../../common/ImageViewModal";
const LoanInfo = ({ activeLoan }: { activeLoan: LoanDetails }) => {
  const [openImage, { toggle: toggleOpenImage }] = useDisclosure(false);
  const [image, setImage] = React.useState<string | null>(null);
  return (
    <section className="bg-white rounded-xl shadow-md w-full">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Loan Summary
      </h3>
      <div className="mt-5 border-t border-gray-200 ">
        <dl className="divide-y divide-gray-200">
          {[
            ["Principal Amount", activeLoan.principleAmount],
            ["Disbursement Date", activeLoan.disbursementDate.split("T")[0]],
            ["Loan Term", `${activeLoan.loanTerm} months`],
            ["Interest Rate", `${activeLoan.interestRate} % per annum`],
            ["Monthly Installment", activeLoan.emi],
            [
              "Payments Made",
              `${activeLoan.paymentmade} of ${activeLoan.loanTerm}`,
            ],
            ["Remaining Principal", activeLoan.remainingPrinciple],
            ["Next Payment Due", activeLoan.nextPaymentDate.split("T")[0]],
            ["Loan Purpose", "Personal Use"],
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
                {activeLoan.status}
              </span>
            </dd>
          </div>
          <div className="p-3 flex justify-between text-sm">
            <dt className="text-gray-500">Receipt</dt>
            <dd className="text-right">
              <ActionIcon
                onClick={() => {
                  setImage(activeLoan.receipt);
                  toggleOpenImage();
                }}
              >
                <BsEye />
              </ActionIcon>
            </dd>
          </div>
        </dl>
      </div>
      <ImageViewModal open={openImage} toggle={toggleOpenImage} image={image} />
    </section>
  );
};

export default LoanInfo;
