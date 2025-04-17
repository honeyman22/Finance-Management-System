import * as Yup from "yup";export const applyForLoanSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid."),
  phoneNumber: Yup.string().required("Phone number is required."),
  loanAmount: Yup.string().required("Loan amount is required."),
  loanTerm: Yup.string().required("Loan term is required."),
  loanType: Yup.string().required("Loan type is required."),
  repaymentFrequency: Yup.string().required("Repayment frequency is required."),
  notes: Yup.string(),
});

export const payLoanSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required."),
  date: Yup.string().required("Date is required."),
  notes: Yup.string(),
  paymentMethod: Yup.string().required("Payment method is required."),
  receipt: Yup.mixed().required("Receipt is required."),
  confirmation: Yup.bool().required("Confirmation is required."),
});
