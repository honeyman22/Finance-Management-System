import React from "react";import { useDisclosure } from "@mantine/hooks";
import Cookies from "js-cookie";
import ImageViewModal from "../../common/ImageViewModal";
import { PaymentHistory } from "../../../dtos/loan-details.dto";
import { ActionIcon } from "@mantine/core";
import { BsEye } from "react-icons/bs";
const InstallmentTables = ({
  installments,
}: {
  installments: PaymentHistory[];
}) => {
  const role = Cookies.get("user");
  const [openImage, { toggle: toggleOpenImage }] = useDisclosure(false);
  const [image, setImage] = React.useState<string | null>(null);
  const userHeader = [
    "Payment Date",
    "Opening Balance",
    "Interest",
    "Principle Paid",
    "EMI",
    "Closing Balance",
    "Receipt",
    "Status",
    "Action",
  ];
  const AdminHeader = [
    "Payment Date",
    "Opening Balance",
    "Interest",
    "Principle Paid",
    "EMI",
    "Closing Balance",
    "Receipt",
    "Status",
  ];
  const header = role !== "admin" ? AdminHeader : userHeader;
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
              {header?.map((header) => (
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
            {installments?.map((payment, index) => (
              <tr key={index + 6}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.paymentDate.split("T")[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.openingBalance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.interest}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.paidPrinciple}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.emi}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.closingBalance}
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
                {role !== "user" && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex justify-start">
                      <button className="text-white rounded-md bg-green-500 py-0.5 px-4  hover:bg-green-900 mr-3">
                        Pay
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImageViewModal open={openImage} toggle={toggleOpenImage} image={image} />
    </div>
  );
};

export default InstallmentTables;
