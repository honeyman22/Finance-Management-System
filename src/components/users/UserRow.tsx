import { useDisclosure } from "@mantine/hooks";
import DetailsModal from "./DetailsModal";
import ReuseableModal from "../common/ReuseableModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/api-client";
import { toast } from "react-toastify";
import { User } from "../../dtos/users.dto";
import { useNavigate } from "react-router-dom";
const UserRow: React.FC<{ user: User }> = ({ user }) => {
  const [open, { toggle }] = useDisclosure(false);
  const [openDeactivete, { toggle: toggleDeactivate }] = useDisclosure(false);
  const router = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deactivateUser } = useMutation({
    mutationFn: async () => {
      await api.put(`/admin/user/deactivate/${user.id}`, { id: user.id });
    },
    onSuccess: () => {
      toast.success("User deactivated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toggleDeactivate();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-600 font-medium">{user.name[0]}</span>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {user.name}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {user.activationDate.split("T")[0]}
          </div>
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
          <button
            onClick={() => router(`/users/${user.id}`)}
            aria-label="View user details"
            className="text-indigo-600 hover:text-indigo-900 mr-3"
          >
            View
          </button>
          <button
            aria-label="deactivate user"
            onClick={toggleDeactivate}
            className="text-red-600 hover:text-red-900"
          >
            Deactivate
          </button>
        </td>
      </tr>
      <DetailsModal open={open} toggle={toggle} user={user} />
      <ReuseableModal
        open={openDeactivete}
        toggle={toggleDeactivate}
        func={deactivateUser}
        title={"Deactivate User"}
        subtitle={"Are you sure you want to deactivate this user?"}
      />
    </>
  );
};
export default UserRow;
