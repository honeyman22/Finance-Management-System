import { FC } from "react";
import { MdAdd, MdCreditCard } from "react-icons/md";
interface DashboardHeaderProps {
  userName: string;
  onOpenDepositModal: () => void;
  onOpenLoanModal: () => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({
  userName,
  onOpenDepositModal,
  onOpenLoanModal,
}) => {
  return (
    <div className="flex  flex-col md:flex-row  justify-between w-full ">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back, {userName}</p>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-3">
        <button
          type="button"
          onClick={onOpenDepositModal}
          className="inline-flex h-10 items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 "
        >
          <MdAdd className="-ml-1 mr-2 h-5 w-5" />
          New Deposit
        </button>

        <button
          type="button"
          onClick={onOpenLoanModal}
          className="inline-flex items-center  h-10 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 "
        >
          <MdCreditCard className="-ml-1 mr-2 h-5 w-5" />
          Apply for Loan
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
