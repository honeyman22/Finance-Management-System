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
  activationDate: Yup.string().required("Activation date is required."),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character."
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
});
