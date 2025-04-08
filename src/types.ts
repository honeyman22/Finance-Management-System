export type PendingItemType = "deposit" | "loan" | "installment";
export interface PendingItemData {
  id: string;
  type: PendingItemType;
  name: string;
  amount: number;
  date: string;
  status: "pending" | "approved";
}

export interface User {
  name: string;
  email: string;
  initials: string;
  id: string;
  depositAmount: string;
  depositDuration: string;
  loanAmount: string;
  loanStatus: string;
  status: string;
}
