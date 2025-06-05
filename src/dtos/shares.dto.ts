import { Pagination } from "../types";export interface ShareDetailsResponseBody {
  message: string;
  data: ShareDetails;
}

export interface ShareDetails {
  shareName: string;
  purchaseQuantity: number;
  sellQuantity: number;
  remainingQuantity: number;
  createdAt: string;
  profit: number;
  transactions: Transaction[];
}

export interface Transaction {
  totalAmount: number;
  expenses: number;
  quantity: number;
  perUnitValue: number;
  transactionType: string;
  createdAt: string;
  receipt: any;
}

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

export interface ShareSummaryResponseBody {
  message: string;
  data: Data;
}

export interface Data {
  totalInvestMent: number;
  totalPurchaseAmount: number;
  totalSellAmount: number;
  totalExpenses: number;
}
