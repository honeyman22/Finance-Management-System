export type Transaction = {  date: string;
  id: string;
  type:
    | "Deposit"
    | "Installment"
    | "Loan"
    | "Loan Application"
    | "Share Purchase";
  subtype: string;
  amount: string;
  status: "Approved" | "Pending";
  paymentMethod: string;
  approvedBy: string;
  approvalDate: string;
  notes: string;
};
