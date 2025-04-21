import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../components/layout/Layout";
const userLogged = () => {
  return true;
};

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => (userLogged() ? null : redirect("/login")),
    async lazy() {
      const Layout = await import("../components/layout/Layout");
      return { Component: Layout.default };
    },
    element: <Layout />,
    children: [
      {
        path: "/",
        async lazy() {
          const Dashboard = await import("../pages/Dashboard");
          return { Component: Dashboard.default };
        },
      },
      {
        path: "/deposits",
        children: [
          {
            index: true,
            async lazy() {
              const AddDeposit = await import("../pages/deposit/add-deposit");
              return { Component: AddDeposit.default };
            },
          },
        ],
      },
      {
        path: "/loans",
        children: [
          {
            index: true,
            async lazy() {
              const Loan = await import("../pages/loan/loan");
              return { Component: Loan.default };
            },
          },
          {
            path: "apply-for-loan",
            async lazy() {
              const ApplyForLoan = await import("../pages/loan/apply-for-loan");
              return { Component: ApplyForLoan.default };
            },
          },
          {
            path: "pay-installment/:id",
            async lazy() {
              const PayInstallmentPage = await import(
                "../pages/loan/pay-installment"
              );
              return { Component: PayInstallmentPage.default };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    async lazy() {
      const Login = await import("../pages/Login");
      return { Component: Login.default };
    },
  },
  {
    path: "/register",
    async lazy() {
      const SignUp = await import("../pages/SignUp");
      return { Component: SignUp.default };
    },
  },
  {
    path: "/*",
    async lazy() {
      const PageNotFound = await import("../pages/Pagenotfound");
      return { Component: PageNotFound.default };
    },
  },
]);
