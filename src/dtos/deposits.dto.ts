import { Pagination } from "../types";
export interface DepositTableDataRoot {
  message: string;
  data: DepositData[];
  pagination: Pagination;
}

export interface DepositData {
  id: string;
  amount: number;
  depositDate: string;
  paymentMethod: string;
  fine: number;
  isPaid: boolean;
  status: string;
  receipt: any;
}

export interface DepositSummaryResponseBody {
  message: string;
  data: Summary;
}

export interface Summary {
  totalDeposits: number;
  totalFines: number;
  numberOfDeposits: number;
  thisYearDeposits: number[];
}
