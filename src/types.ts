export type PendingItemType = "deposit" | "loan" | "installment";export interface PendingItemData {
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

export interface Loan {
  id: string;
  title: string;
  status: string;
  principal: string;
  interestRate: string;
  term: string;
  repaymentProgress: number;
}
declare module "html2pdf.js" {
  const html2pdf: any;
  export default html2pdf;
}
