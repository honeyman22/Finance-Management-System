import { MdAdd } from "react-icons/md";
import PageHeader from "../../components/common/PageHeader";
import ShareSummary from "../../components/shares/ShareSummary";
import TransactionModal from "../../components/shares/TransactionModal";
import { useDisclosure } from "@mantine/hooks";
import ShareTable from "../../components/shares/ShareTable";

const ShareManagementPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        title="Share Management"
        subtitle="Keep track of all your shares with Brother Finance's robust share management system."
        buttons={[
          {
            icon: <MdAdd className="h-6 w-6" />,
            label: "Record Share Transaction",
            onClick: () => {
              open();
            },
          },
        ]}
      />
      <ShareSummary />
      <ShareTable />
      <TransactionModal close={close} open={opened} />
    </div>
  );
};

export default ShareManagementPage;
