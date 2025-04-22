import * as Yup from "yup";
export const shareTransactionSchema = Yup.object().shape({
  transactionType: Yup.string().required("Transaction type is required."),
  shareName: Yup.string().required("Share name is required."),
  quantity: Yup.string().required("Quantity is required."),
  unitPrice: Yup.string().required("Unit price is required."),
  transactionDate: Yup.string().required("Transaction date is required."),
  notes: Yup.string(),
  receipt: Yup.mixed().required("Receipt is required."),
});
