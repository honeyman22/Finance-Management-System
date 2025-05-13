import { Pagination } from "../types";
export interface ShareListResponseBody {
  message: string;
  pagination: Pagination;
  data: SharesListData[];
}
export interface SharesListData {
  id: string;
  shareName: string;
  remainingQuantity: number;
  totalExpenses: number;
  totalInvestments: number;
  latestTransactionPerUnitValue: number;
}
