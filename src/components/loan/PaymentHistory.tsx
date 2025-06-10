import React from "react";
import { api } from "../../api/api-client";
import { AllLoanResponseBody } from "../../dtos/loans.dto";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import ImageViewModal from "../common/ImageViewModal";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Pagination } from "@mantine/core";
import { FiExternalLink } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const PaymentHistory: React.FC = () => {
  const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
  const role = brotherFinance?.role;
  const router = useNavigate();
  const [openImage, { toggle: toggleOpenImage }] = useDisclosure(false);
  const { data: allLoansData } = useQuery({
    queryKey: ["all-loans"],
    queryFn: () => api.get<AllLoanResponseBody>(`${role}/loan`),
  });
  const [image, setImage] = React.useState<string | null>(null);
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          All Loans
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          A summary of all loans you've taken or given, including amounts, due
          dates, and current balances.
        </p>
      </div>
      <div className="border-t border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Disbursement Date",
                "User",
                "Principal",
                "Total Interest",
                "Total fine",
                "Loan Term",
                "Receipt",
                "Status",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allLoansData?.data?.data.map((payment, index) => (
              <tr key={index + 6}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.disbursementDate.split("T")[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.principleAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.totalInterest}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.totalFine}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.loanTerm} months
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <ActionIcon
                    onClick={() => {
                      setImage(payment.receipt);
                      toggleOpenImage();
                    }}
                  >
                    <BsEye />
                  </ActionIcon>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status === "paid" ? "Paid" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 gap-2 flex items-center whitespace-nowrap ">
                  <ActionIcon onClick={() => router(`/loans/${payment.id}`)}>
                    <FiExternalLink />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(allLoansData?.data?.pagination?.page?.totalPages ?? 0) > 1 && (
        <div className="p-4 flex border-t justify-end">
          <Pagination
            total={allLoansData?.data?.pagination?.page?.totalPages ?? 0}
            gap={0}
          />
        </div>
      )}
      <ImageViewModal open={openImage} toggle={toggleOpenImage} image={image} />
    </div>
  );
};

export default PaymentHistory;
