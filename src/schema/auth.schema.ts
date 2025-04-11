import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be valid."
    ),
  password: Yup.string().required("Password is required."),
  remember: Yup.bool(),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .required("Email is required.")
    .email("Email must be valid.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be valid."
    ),
  phoneNumber: Yup.string().required("Phone number is required."),
  password: Yup.string().required("Password is required."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});
