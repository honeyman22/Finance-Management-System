import * as Yup from "yup";
export const applyForLoanSchema = Yup.object().shape({
  loanAmount: Yup.string().required("Loan amount is required."),
  loanTerm: Yup.string().required("Loan term is required."),
  loanType: Yup.string().required("Loan type is required."),
  repaymentFrequency: Yup.string().required("Repayment frequency is required."),
});

export const payLoanSchema = Yup.object().shape({
  amount: Yup.string().required("Amount is required."),
  date: Yup.string().required("Date is required."),
  notes: Yup.string(),
  paymentMethod: Yup.string().required("Payment method is required."),
  receipt: Yup.mixed().required("Receipt is required."),
  confirmation: Yup.bool().required("Confirmation is required."),
});

export const acceptRejectLoanSchema = Yup.object().shape({
  receipt: Yup.mixed().optional(),
  notes: Yup.string().optional(),
});

export const payInstallmentSchema = Yup.object().shape({
  receipt: Yup.mixed().required("Receipt is required."),
});

export const settlementSchema = Yup.object().shape({
  receipt: Yup.mixed().required("Receipt is required."),
  interest: Yup.number().required("Interest is required."),
  paidAmount: Yup.number().required("Paid amount is required."),
  principleAmount: Yup.number().required("Principle amount is required."),
});

export const rejectSettelmentSchema = Yup.object().shape({
  notes: Yup.string().required("Notes are required."),
});
