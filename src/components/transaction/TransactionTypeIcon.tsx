import { FC } from "react";
type Props = {
  type: string;
};

export const TransactionTypeIcon: FC<Props> = ({ type }) => {
  const typeMap = {
    Deposit: { color: "bg-green-100", iconColor: "text-green-600", icon: "+" },
    Installment: {
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
      icon: "₹",
    },
    Loan: { color: "bg-blue-100", iconColor: "text-blue-600", icon: "L" },
    "Loan Application": {
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: "LA",
    },
    "Share Purchase": {
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: "S",
    },
  };

  const { color, iconColor, icon } = typeMap[type as keyof typeof typeMap] || {
    color: "bg-gray-100",
    iconColor: "text-gray-600",
    icon: "?",
  };

  return (
    <div className="flex items-center">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center ${color}`}
      >
        <span className={`text-sm font-bold ${iconColor}`}>{icon}</span>
      </div>
    </div>
  );
};
