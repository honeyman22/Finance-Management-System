import { Pagination, Skeleton } from "@mantine/core";
import UserRow from "./UserRow";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { UserResponseBody } from "../../dtos/users.dto";
const UserTable: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await api.get<UserResponseBody>("admin/user/all");
    },
  });
  const renderTable = () => {
    if (isLoading || isError) {
      return (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Name",
                  "Activation Date",
                  "Deposits",
                  "Loans",
                  "Status",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          {Array(10)
            .fill("_")
            .map((_, index) => (
              <Skeleton
                key={index + 6}
                className="my-0.5"
                animate={false}
                height={64}
              />
            ))}
        </>
      );
    } else {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Activation Date",
                "Deposits",
                "Loans",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.data?.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <div className="overflow-x-auto"> {renderTable()}</div>
      {(data?.data?.pagination?.page?.totalPages ?? 0) > 1 && (
        <div className="p-4 flex border-t justify-end">
          <Pagination
            total={data?.data?.pagination?.page?.totalPages ?? 0}
            gap={0}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;
