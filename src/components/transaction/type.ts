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

export interface Deposit {
  date: string;
  transactionId: string;
  amount: string;
  method: string;
  status: "Approved" | "Pending" | "Rejected";
}
