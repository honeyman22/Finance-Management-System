import { Modal } from "@mantine/core";import { useRef } from "react";
import html2pdf from "html2pdf.js";
const AmortizationScheduleModal = ({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) => {
  const payments = [
    {
      number: 1,
      date: "Sep 15, 2023",
      amount: "₹1,330",
      principal: "₹1,110",
      interest: "₹220",
      balance: "₹13,890",
      status: "Paid",
      statusStyle: "bg-green-100 text-green-800",
    },
    {
      number: 2,
      date: "Oct 15, 2023",
      amount: "₹1,330",
      principal: "₹1,130",
      interest: "₹200",
      balance: "₹12,760",
      status: "Paid",
      statusStyle: "bg-green-100 text-green-800",
    },
    {
      number: 3,
      date: "Nov 15, 2023",
      amount: "₹1,330",
      principal: "₹1,150",
      interest: "₹180",
      balance: "₹11,610",
      status: "Paid",
      statusStyle: "bg-green-100 text-green-800",
    },
    {
      number: 4,
      date: "Dec 15, 2023",
      amount: "₹1,330",
      principal: "₹1,170",
      interest: "₹160",
      balance: "₹10,440",
      status: "Upcoming",
      statusStyle: "bg-yellow-100 text-yellow-800",
    },
  ];
  const downloadRef = useRef(null);
  const handleDownload = () => {
    if (downloadRef.current) {
      html2pdf()
        .from(downloadRef.current)
        .set({
          margin: 0.5,
          filename: "Amortization-Schedule.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };
  return (
    <Modal
      size={"2xl"}
      opened={open}
      onClose={toggle}
      padding={0}
      withCloseButton={false}
      centered
    >
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <div className="p-4">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Amortization Schedule
          </h3>
          <p className="text-sm text-gray-500">
            Full repayment schedule for your Personal Loan (BF-L-10023)
          </p>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table
            ref={downloadRef}
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Payment #",
                  "Payment Date",
                  "Payment Amount",
                  "Principal",
                  "Interest",
                  "Remaining Balance",
                  "Status",
                ].map((heading, idx) => (
                  <th
                    key={idx + 9}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((p) => (
                <tr key={p.number}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {p.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {p.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {p.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {p.principal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {p.interest}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {p.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.statusStyle}`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          onClick={handleDownload}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
          id="download-schedule"
        >
          Download Schedule
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          id="close-schedule-button"
          onClick={toggle}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AmortizationScheduleModal;
