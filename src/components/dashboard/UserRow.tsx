import { User } from "../../types";
const UserRow: React.FC<{ user: User }> = ({ user }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-600 font-medium">{user.initials}</span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{user.id}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{user.depositAmount}</div>
      <div className="text-sm text-gray-500">{user.depositDuration}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{user.loanAmount}</div>
      <div className="text-sm text-gray-500">{user.loanStatus}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {user.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <a href="/" className="text-indigo-600 hover:text-indigo-900 mr-3">
        View
      </a>
      <a href="/" className="text-gray-600 hover:text-gray-900">
        Edit
      </a>
    </td>
  </tr>
);
export default UserRow;
