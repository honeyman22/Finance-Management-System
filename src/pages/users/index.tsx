import PageHeader from "../../components/common/PageHeader";import { MdAdd } from "react-icons/md";
const index = () => {
  return (
    <div className="flex flex-col gap-8">
      {" "}
      <div>
        <PageHeader
          title="User Management"
          subtitle="Efficiently monitor and manage all users associated with Brother Finance."
          buttons={[
            {
              icon: <MdAdd className="h-6 w-6" />,
              label: "Add User",
              onClick: () => {
                open();
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default index;
