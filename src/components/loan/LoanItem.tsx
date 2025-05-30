import { LuBanknote } from "react-icons/lu";
import { FaCalendar, FaCheckCircle, FaInfo } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import LoanDetailsModal from "./LoanDetailsModal";
import { ActiveLoan } from "../../dtos/loans.dto";
const LoanDetail: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <div className=" flex items-center  gap-2 border-gray-200 text-sm text-gray-500 ">
    <p className=" text-gray-400">{icon}</p>
    {text}
  </div>
);
const LoanItem: React.FC<{ loan: ActiveLoan }> = ({ loan }) => {
  const [openDetails, { toggle: toggleDetails }] = useDisclosure();
  const remainingPercent =
    ((loan.principleAmount - loan.remainingPrinciple) / loan.principleAmount) *
    100;
  return (
    <li className="border-b border-gray-200 px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <LuBanknote className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {loan.userName}
            </div>
            <div className="text-sm text-gray-500">Loan ID: {loan.id}</div>
          </div>
        </div>
        <div className="ml-2 flex-shrink-0">
          <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
            {loan.status}
          </span>
        </div>
      </div>
      <div className="mt-4 sm:flex items-center  sm:justify-between">
        <div className="sm:flex sm:space-x-6">
          <LoanDetail
            icon={<FaInfo />}
            text={`Principal: ${loan.principleAmount}`}
          />
          <LoanDetail
            icon={<FaCheckCircle />}
            text={`Interest Rate: ${loan.interestRate} %`}
          />
          <LoanDetail icon={<FaCalendar />} text={`Term: ${loan.loanTerm}`} />
        </div>
        <div className="mt-2 sm:mt-0">
          <button
            onClick={toggleDetails}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-600">
              Repayment Progress
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {remainingPercent}%
            </span>
          </div>
          <div className="overflow-hidden h-2 mt-1 flex rounded bg-blue-100">
            <div
              style={{ width: `${remainingPercent}%` }}
              className="bg-blue-500 text-white text-center text-xs"
            ></div>
          </div>
        </div>
      </div>
      <LoanDetailsModal
        activeLoan={loan}
        open={openDetails}
        toggle={toggleDetails}
      />
    </li>
  );
};

export default LoanItem;
