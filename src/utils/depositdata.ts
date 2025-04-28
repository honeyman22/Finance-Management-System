import { Deposit } from "../components/transaction/type";export const deposits: Deposit[] = [
  {
    date: "2025-04-01",
    transactionId: "TXN123456",
    amount: "$500",
    method: "Bank Transfer",
    status: "Approved",
  },
  {
    date: "2025-04-05",
    transactionId: "TXN123457",
    amount: "$750",
    method: "Credit Card",
    status: "Pending",
  },
  {
    date: "2025-04-10",
    transactionId: "TXN123458",
    amount: "$300",
    method: "PayPal",
    status: "Rejected",
  },
];

export const pendingDeposits = [
  { name: "Rahul Sharma", amount: 1000, submittedDate: "Oct 28, 2024" },
  { name: "Priya Patel", amount: 1000, submittedDate: "Oct 27, 2024" },
];
