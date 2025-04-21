import * as Yup from "yup";
export const addDepositSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid."),
  phoneNumber: Yup.string().required("Phone number is required."),
  depositDate: Yup.string().required("Deposit date is required."),
  paymentMethod: Yup.string().required("Payment method is required."),
  receipt: Yup.mixed().required("Image is required."),
  notes: Yup.string(),
  confirmation: Yup.bool().required("Confirmation is required."),
});
