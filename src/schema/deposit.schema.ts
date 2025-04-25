import * as Yup from "yup";
export const addDepositSchema = Yup.object().shape({
  depositDate: Yup.string().required("Deposit date is required."),
  paymentMethod: Yup.string().required("Payment method is required."),
  receipt: Yup.mixed().required("Image is required."),
});
