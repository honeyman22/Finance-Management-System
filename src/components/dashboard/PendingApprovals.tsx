import { useQuery } from "@tanstack/react-query";import PendingItem from "./PendingItems";
import { api } from "../../api/api-client";
import { DashBoardPendingApprovalsResponseBody } from "../../dtos/dashboard.dto";

const PendingApprovals = () => {
  const { data: approvalRequests } = useQuery({
    queryKey: ["pending-approval-requests"],
    queryFn: () =>
      api.get<DashBoardPendingApprovalsResponseBody>(
        "dashboard/pending-approval-requests"
      ),
  });
  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <div className="px-4 py-5 border-b sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Pending Approvals
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
          <PendingItem
            key={item.id}
            item={item}
            onView={() => console.log("Hello")}
          />
        ))}

        <li className="text-center hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <button
              onClick={() => console.log("View all pending approvals clicked")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-transparent border-none cursor-pointer"
            >
              View all pending approvals &rarr;
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PendingApprovals;
