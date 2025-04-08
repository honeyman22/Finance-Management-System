import { Pagination } from "@mantine/core";import UserRow from "./UserRow";
import { users } from "../../utils/transactiondata";
const UserTable: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <div className="flex border-b justify-between items-center px-4 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Users Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of all registered users
          </p>
        </div>
        <button className="text-sm px-3 py-1.5 text-white rounded-md font-medium bg-primary">
          + Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "ID", "Deposits", "Loans", "Status", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 flex border-t justify-end">
        <Pagination total={5} gap={0} />
      </div>
    </div>
  );
};

export default UserTable;
