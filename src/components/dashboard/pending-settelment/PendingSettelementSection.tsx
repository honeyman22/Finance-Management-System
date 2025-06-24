import { useQuery } from "@tanstack/react-query";import { api } from "../../../api/api-client";
import { PendingSettelementResponseBody } from "../../../dtos/dashboard.dto";
import { Avatar, Skeleton } from "@mantine/core";
import Cookies from "js-cookie";
import { MdCalendarMonth, MdLockClock } from "react-icons/md";

const PendingSettelementSection = () => {
  const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
  const role = brotherFinance?.role;
  const {
    data: approvalRequests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-settlement"],
    queryFn: () =>
      api.get<PendingSettelementResponseBody>("dashboard/pending-settlement"),
    enabled: role === "admin", // Only fetch if the user is an admin
  });
  if (!approvalRequests) return null;
  if (isLoading || isError) return <Skeleton height={200} />;
  if (approvalRequests?.data?.data.length === 0) return null;
  return (
    <div>
      <div className="bg-white shadow rounded-md overflow-hidden">
        <div className="px-4 py-5 border-b sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Pending Settelments
            </h2>
            <p className="text-sm text-gray-500">
              Items requiring your attention
            </p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {approvalRequests?.data?.data.length} pending
          </span>
        </div>

        <ul className="divide-y divide-gray-200">
          {approvalRequests?.data?.data.map((item) => (
            <li key={item.id} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar src={item.loan.user.image ?? "/logo.png"} />

                    <div className="ml-4">
                      <div className="text-sm font-medium text-indigo-600 capitalize">
                        Settlement Approval
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.loan.user.fullName} - ₹
                        {item.paidAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => console.log()}
                    className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    View
                  </button>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MdCalendarMonth className="mr-1.5 h-5 w-5 text-gray-400" />
                    Submitted on {item.createdAt.split("T")[0]}
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center text-sm text-yellow-600">
                    <MdLockClock className="mr-1.5 h-5 w-5 text-yellow-500" />
                    Awaiting approval
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PendingSettelementSection;
