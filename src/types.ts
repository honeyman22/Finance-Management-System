export type PendingItemType = "deposit" | "loan" | "installment";
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

export interface Share {
  id: number;
  shareName: string;
  unitPrice: number;
  quantity: number;
  transactionType: string;
  status: string | null;
  image: string | null;
}

export interface Pagination {
  page: Page;
  limit: number;
}

export interface Page {
  totalPages: number;
  currentPage: number;
  nextPage: any;
  previousPage: any;
}
