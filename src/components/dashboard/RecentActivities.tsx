import { MdBadge } from "react-icons/md";
import { api } from "../../api/api-client";
import { useQuery } from "@tanstack/react-query";
import { RecentActivityResponseBody } from "../../dtos/dashboard.dto";
import { Skeleton } from "@mantine/core";

const TableHeader = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Transaction
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Amount
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
      </tr>
    </thead>
  );
};

const RecentActivity = () => {
  const {
    data: recentActivity,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: () =>
      api.get<RecentActivityResponseBody>("dashboard/recent-transaction"),
  });

  return (
    <div className="bg-white shadow rounded-lg w-full  overflow-hidden border border-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your financial activities over the last 30 days
        </p>
      </div>

      <div className="overflow-x-auto border-t">
        {isLoading || isError ? (
          <>
            <table className=" w-full divide-y divide-gray-200">
              <TableHeader />
            </table>{" "}
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index + 6}
                  animate={false}
                  className="mt-1"
                  height={40}
                />
              ))}
          </>
        ) : (
          Array.isArray(recentActivity?.data?.data) &&
          recentActivity.data.data.length > 0 && (
            <table className=" w-full divide-y divide-gray-200">
              <TableHeader />
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity?.data?.data.map((item, idx) => (
                  <tr key={idx + 9}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100`}
                        >
                          <div className={`text-blue-600 `}>
                            <MdBadge className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.type}
                          </div>
                          <div className="text-sm text-gray-500">
                            {`${item.type} ${item.status}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
