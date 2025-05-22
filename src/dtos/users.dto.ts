export interface UserResponseBody {
  message: string;
  pagination: Pagination;
  data: User[];
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

export interface User {
  id: string;
  name: string;
  email: string;
  image: any;
  status: string;
  phoneNumber: string;
  activationDate: string;
  depositAmount: number;
  depositDuration: string;
  loanAmount: number;
  loanStatus: any;
}

export interface ProfileResponseBody {
  message: string;
  data: ProfileData;
}

export interface ProfileData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  activationDate: string;
  image: string;
  totalDeposit: number;
  totalLoan: number;
  activeLoan: number;
}
