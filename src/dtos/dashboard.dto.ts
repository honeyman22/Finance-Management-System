export interface DashBoardAnalysisResponseBody {  message: string;
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

export interface RecentActivityResponseBody {
  message: string;
  data: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  userId: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashBoardSummaryResponseBody {
  message: string;
  data: AdminSummary;
}

export interface AdminSummary {
  totalDeposit: number;
  totalApprovedLoan: number;
  totalFine: number;
  totalInterest: number;
}

export interface UserDashboardResponseBody {
  message: string;
  data: UserSummary;
}

export interface UserSummary {
  totalDeposit: number;
  approvedLoan: ApprovedLoan;
  installement: Installement;
}

export interface ApprovedLoan {
  id: string;
  principleAmount: number;
}

export interface Installement {
  date: string;
  amount: number;
  id: string;
  fine: number;
}

export interface PendingSettelementResponseBody {
  message: string;
  data: PendingSettelement[];
}

export interface PendingSettelement {
  id: string;
  paidAmount: number;
  loanId: string;
  principleAmount: number;
  interest: number;
  createdAt: string;
  receipt: string;
  loan: Loan;
}

export interface Loan {
  user: User;
}

export interface User {
  fullName: string;
  image?: string;
}
