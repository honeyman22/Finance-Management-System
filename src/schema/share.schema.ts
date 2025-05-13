import * as Yup from "yup";
export const shareTransactionSchema = Yup.object().shape({
  transactionType: Yup.string().required("Transaction type is required."),
  quantity: Yup.number().required("Quantity is required."),
  totalAmount: Yup.number().required("Total amount is required."),
  perunitValue: Yup.number().required("Unit price is required."),
  transactionDate: Yup.string().required("Transaction date is required."),
  receipt: Yup.mixed().required("Receipt is required."),
});

export const registerShareSchema = Yup.object().shape({
  shareName: Yup.string().required("Share name is required."),
});
