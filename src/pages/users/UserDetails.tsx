import { useQuery } from "@tanstack/react-query";import PageHeader from "../../components/common/PageHeader";
import ProfileCard from "../../components/users/ProfileCard";
import { api } from "../../api/api-client";
import { Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";
import { Deposit, Loan, UserDetailsResponseBody } from "../../dtos/users.dto";

const TableHeader = ({ tableheader }: { tableheader: string[] }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableheader.map((header) => (
          <th
            key={header}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const UserDetails = () => {
  const { id } = useParams();
  const {
    data: userdetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userdetails", id],
    queryFn: async () => {
      return await api.get<UserDetailsResponseBody>(`/admin/user/${id}`);
    },
  });
  const renderFunction = () => {
    if (isError || isLoading) {
      return (
        <div className="flex flex-col gap-0.5 p-4">
          <table>
            <TableHeader
              tableheader={["Date", "Amount", "Fine", "Method", "Status"]}
            />
          </table>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index + 6} animate={false} height={40} />
            ))}
        </div>
      );
    } else {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            tableheader={["Date", "Amount", "Fine", "Method", "Status"]}
          />
          <tbody>
            {userdetails?.data?.data?.deposit?.map((deposit: Deposit) => (
              <tr key={deposit?.id} className="hover:bg-gray-50 border-b p-2">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit?.depositDate.split("T")[0]}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit?.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit?.fine}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit?.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deposit?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  const renderLoanFunction = () => {
    if (isError || isLoading) {
      return (
        <div className="flex flex-col gap-0.5 p-4">
          <table>
            <TableHeader
              tableheader={[
                "Date",
                "Loan Amount",
                "Interest",
                "Fine",
                "Duration",
                "Frequency",
                "Status",
              ]}
            />
          </table>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index + 6} animate={false} height={40} />
            ))}
        </div>
      );
    } else {
      return (
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            tableheader={[
              "Date",
              "Loan Amount",
              "Interest",
              "Fine",
              "Duration",
              "Frequency",
              "Status",
            ]}
          />
          <tbody>
            {userdetails?.data?.data?.loan?.map((loan: Loan) => (
              <tr
                key={loan?.loanDate}
                className="hover:bg-gray-50 border-b p-2"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan?.loanDate.split("T")[0]}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan?.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan?.totalInterest}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan?.totalFine}
                </td>{" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan?.loanDuration}
                </td>{" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan?.repaymentFrequency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <PageHeader
          title={`${userdetails?.data?.data?.fullName}'s Details`}
          subtitle=""
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[400px]">
          <ProfileCard
            profile={userdetails?.data?.data}
            isLoading={isLoading}
            type="admin"
          />
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div className="w-full overflow-x-auto flex flex-col gap-2 bg-white rounded-md ">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-semibold pt-3">Deposit History</h2>
            </div>
            <div className="overflow-x-auto">{renderFunction()}</div>
          </div>
          <div className="w-full overflow-x-auto flex flex-col gap-2 bg-white rounded-md ">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-semibold pt-3">Loan History</h2>
            </div>
            <div className="overflow-x-auto">{renderLoanFunction()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
