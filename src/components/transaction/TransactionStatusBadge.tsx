import { FC } from "react";
export const TransactionStatusBadge: FC<{ status: "Approved" | "Pending" }> = ({
  status,
}) => {
  const badgeColor =
    status === "Approved"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeColor}`}
    >
      {status}
    </span>
  );
};
