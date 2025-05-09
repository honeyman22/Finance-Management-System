import PageHeader from "../../components/common/PageHeader";import { MdAdd } from "react-icons/md";
import UserTable from "../../components/users/UserTable";
import { useDisclosure } from "@mantine/hooks";
import CreateUserModal from "../../components/users/CreateUserModal";
const UserManagementPage = () => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div className="flex flex-col gap-8">
      <div>
        <PageHeader
          title="User Management"
          subtitle="Efficiently monitor and manage all users associated with Brother Finance."
          buttons={[
            {
              icon: <MdAdd className="h-6 w-6" />,
              label: "Add User",
              onClick: () => {
                toggle();
              },
            },
          ]}
        />
      </div>
      <UserTable />
      <CreateUserModal open={opened} onClose={toggle} />
    </div>
  );
};

export default UserManagementPage;
