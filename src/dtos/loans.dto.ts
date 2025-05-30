export interface ActiveLoanResponseBody {
  message: string;
  data: ActiveLoan[];
}

export interface ActiveLoan {
  id: string;
  principleAmount: number;
  loanTerm: number;
  status: string;
  disbursementDate: string;
  userName: string;
  emi: string;
  interestRate: number;
  remainingPrinciple: number;
  nextPaymentDate: string;
  paymentmade: number;
}

export interface AllLoanResponseBody {
  message: string;
  data: LoanTableData[];
}

export interface LoanTableData {
  id: string;
  principleAmount: number;
  loanTerm: number;
  status: string;
  disbursementDate: string;
  userName: string;
  interestRate: number;
  totalFine: number;
  totalInterest: number;
  receipt: string;
}
