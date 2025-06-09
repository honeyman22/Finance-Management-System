import { useQuery } from "@tanstack/react-query";
import ShareSumary from "../../components/shares/share-details/ShareSumary";
import ShareTransactionRow from "../../components/shares/share-details/ShareTransactionRow";
import { api } from "../../api/api-client";
import { ShareDetailsResponseBody, Transaction } from "../../dtos/shares.dto";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import PageHeader from "../../components/common/PageHeader";
import Cookies from "js-cookie";
import { MdAdd } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import TransactionModal from "../../components/shares/TransactionModal";
const TableHeader = () => {
  return (
    <thead>
      <tr className="text-sm text-gray-500  dark:text-gray-300">
        <th scope="col" className="px-6 text-start whitespace-nowrap py-3">
          Transaction Date
        </th>
        <th scope="col" className="px-6 text-start whitespace-nowrap py-3">
          Type
        </th>
        <th scope="col" className="px-6 text-start whitespace-nowrap py-3">
          Quantity
        </th>
        <th scope="col" className="px-6 text-start whitespace-nowrap py-3">
          Per Unit Value
        </th>
        <th scope="col" className="px-6 text-start whitespace-nowrap py-3">
          Total Amount
        </th>
        <th scope="col" className="px-6 text-start whitespace-nowrap py-3">
          Total Expenses
        </th>
        <th scope="col" className="px-6 whitespace-nowrap py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};
const ShareDetailsPage = () => {
  const { id } = useParams();
  const {
    data: shareDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["share-details", id],
    queryFn: () => api.get<ShareDetailsResponseBody>(`/shares/${id}`),
  });
  const role = Cookies.get("user");
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="flex flex-col gap-6">
      {role === "admin" ? (
        <PageHeader
          title={shareDetails?.data?.data?.shareName ?? "Share" + "deatils"}
          subtitle="All your share information in one place—clear, organized, and up to date."
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
      ) : (
        <PageHeader
          title="Share Management"
          subtitle="All your share information in one place—clear, organized, and up to date."
        />
      )}
      {isLoading || isError ? (
        <>
          <Skeleton height={300} />
          <div className="">
            <table>
              <TableHeader />
            </table>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index + 6} animate={false} height={40} />
              ))}
          </div>
        </>
      ) : (
        shareDetails?.data?.data?.transactions && (
          <>
            <ShareSumary share={shareDetails?.data?.data} />
            <div className="w-full bg-white rounded-lg overflow-y-auto">
              <table className="w-full">
                <TableHeader />
                {shareDetails?.data?.data?.transactions.map(
                  (transaction: Transaction) => (
                    <ShareTransactionRow
                      key={transaction.createdAt}
                      transaction={transaction}
                    />
                  )
                )}
              </table>
            </div>
          </>
        )
      )}
      <TransactionModal id={id} close={close} open={opened} />
    </div>
  );
};

export default ShareDetailsPage;
