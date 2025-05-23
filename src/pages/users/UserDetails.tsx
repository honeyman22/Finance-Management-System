import { useQuery } from "@tanstack/react-query";import PageHeader from "../../components/common/PageHeader";
import DepositTableRow from "../../components/deposit/DepositTableRow";
import ProfileCard from "../../components/users/ProfileCard";
import { api } from "../../api/api-client";
import { Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";

const DepositTableHeader = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
        </th>

        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Amount
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Fine
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Method
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>
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
      return await api.get(`/admin/user/${id}`);
    },
  });
  const renderFunction = () => {
    if (isError || isLoading) {
      return (
        <div className="flex flex-col gap-0.5 p-4">
          <table>
            <DepositTableHeader />
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
          <DepositTableHeader />
          {userdetails?.data?.data?.map((deposit: any) => (
            <DepositTableRow key={deposit.id} deposit={deposit} />
          ))}
        </table>
      );
    }
  };
  return (
    <div>
      <div>
        <PageHeader title={`Nishan Bhatttarai's Details`} subtitle="" />
      </div>
      <div className="flex gap-5">
        <div className="w-[400px]">
          <ProfileCard profile={null} isLoading={false} />
        </div>
        <div className="w-full">{renderFunction()}</div>
      </div>
    </div>
  );
};

export default UserDetails;
