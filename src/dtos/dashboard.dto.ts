export interface DashBoardAnalysisResponseBody {
  message: string;
  data: Data[];
}

export interface Data {
  name: string;
  thisMonth?: number;
  lastMonth?: number;
}

export interface DashBoardSharesResponseBody {
  message: string;
  data: ShareTransaction[];
}

export interface ShareTransaction {
  shareName: string;
  totalAmount: number;
  quantity: number;
  perUnitValue: number;
  transactionType: string;
}

export interface DashBoardPendingApprovalsResponseBody {
  message: string;
  data: PendingApprovels[];
}

export interface PendingApprovels {
  id: string;
  amount: number;
  month: number;
  fine: number;
  receipt: any;
  userName: string;
  submittedAt: string;
  type: string;
}

export interface DashBoardLoanApprovalRequestResponseBody {
  message: string;
  data: LoanApprovalRequest[];
}

export interface LoanApprovalRequest {
  id: string;
  amount: number;
  loanDuration: number;
  repaymentFrequency: string;
  status: string;
  createdAt: string;
  user: User;
}

export interface User {
  fullName: string;
}
