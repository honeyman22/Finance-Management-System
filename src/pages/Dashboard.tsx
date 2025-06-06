import React from "react";import RecentActivity from "../components/dashboard/RecentActivities";
import DashboardSummary from "../components/dashboard/summary/DashboardSummary";
import PendingApprovals from "../components/dashboard/PendingApprovals";
import ShareTransactionTable from "../components/dashboard/ShareTransactionTable";
import PendingLoansCard from "../components/dashboard/PendingLoansCard";
import Cookies from "js-cookie";
import Barcharts from "../components/dashboard/Barcharts";
import { api } from "../api/api-client";
import { DashBoardLoanApprovalRequestResponseBody } from "../dtos/dashboard.dto";
import { Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import UserDashBoardSummary from "../components/dashboard/summary/UserDashBoardSummary";
import PageHeader from "../components/common/PageHeader";
import { useDisclosure } from "@mantine/hooks";
import { MdAdd } from "react-icons/md";
import ApplyLoanModal from "../components/loan/ApplyLoanModal";
import CreateUserModal from "../components/users/CreateUserModal";

const Login: React.FC = () => {
  const role = Cookies.get("user");
  const {
    data: loans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-loan-requests"],
    queryFn: () =>
      api.get<DashBoardLoanApprovalRequestResponseBody>(
        "dashboard/all-pending-loan-approval-requests"
      ),
  });

  const [open, { toggle }] = useDisclosure();
  const [openUserModal, { toggle: toggleUserModal }] = useDisclosure(false);

  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        subtitle="Efficiently monitor and manage all users associated with Brother Finance."
        buttons={
          role === "admin"
            ? [
                {
                  icon: <MdAdd className="h-6 w-6" />,
                  label: "Add new user",
                  onClick: () => toggle(),
                },
              ]
            : [
                {
                  icon: <MdAdd className="h-6 w-6" />,
                  label: "Apply for Loan",
                  onClick: () => toggleUserModal(),
                },
              ]
        }
      />
      {role === "user" ? <UserDashBoardSummary /> : <DashboardSummary />}
      <RecentActivity />
      <Barcharts />
      <ShareTransactionTable />
      {role === "admin" && (
        <>
          <PendingApprovals />
          {isLoading || isError ? (
            <Skeleton height={400} animate={false} />
          ) : loans?.data?.data?.length === 0 ? null : (
            <PendingLoansCard loans={loans?.data?.data} />
          )}
        </>
      )}
      <ApplyLoanModal open={open} close={toggle} />{" "}
      <CreateUserModal open={openUserModal} onClose={toggleUserModal} />
    </div>
  );
};

export default Login;
