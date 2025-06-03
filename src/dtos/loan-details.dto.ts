export interface LonDetailsResponseBody {
  message: string;
  data: Data;
}

export interface Data {
  userDetails: UserDetails;
  loanDetails: LoanDetails;
  paymentHistory: PaymentHistory[];
}

export interface UserDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  image: any;
}

export interface LoanDetails {
  id: string;
  principleAmount: number;
  loanTerm: number;
  status: string;
  disbursementDate: string;
  userName: string;
  receipt: string;
  emi: string;
  interestRate: string;
  remainingPrinciple: number;
  nextPaymentDate: string;
  paymentmade: number;
}

export interface PaymentHistory {
  id: string;
  emi: number;
  paymentDate: string;
  status: string;
  openingBalance: number;
  closingBalance: number;
  interest: number;
  fine: number;
  receipt: any;
  paidPrinciple: number;
}
