import { MdAdd } from "react-icons/md";import PageHeader from "../../components/common/PageHeader";
import ShareSummary from "../../components/shares/ShareSummary";
import { useDisclosure } from "@mantine/hooks";
import ShareTable from "../../components/shares/ShareTable";
import RegisterShareModal from "../../components/shares/RegisterShareModal";
import Cookies from "js-cookie";

const ShareManagementPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const role = Cookies.get("user");
  return (
    <div className="w-full flex flex-col gap-8">
      {role === "admin" ? (
        <PageHeader
          title="Share Management"
          subtitle="Keep track of all your shares with Brother Finance's robust share management system."
          buttons={[
            {
              icon: <MdAdd className="h-6 w-6" />,
              label: "Add new share type",
              onClick: () => {
                open();
              },
            },
          ]}
        />
      ) : (
        <PageHeader
          title="Share Management"
          subtitle="Keep track of all your shares with Brother Finance's robust share management system."
        />
      )}
      <ShareSummary />
      <ShareTable />
      <RegisterShareModal open={opened} close={close} />
    </div>
  );
};

export default ShareManagementPage;
