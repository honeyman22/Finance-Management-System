import { createBrowserRouter, redirect } from "react-router-dom";import Layout from "../components/layout/Layout";
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
        async lazy() {
          const Deposit = await import("../pages/Deposit");
          return { Component: Deposit.default };
        },
      },
      {
        path: "/loans",
        children: [
          {
            index: true,
            async lazy() {
              const Loan = await import("../pages/Loan");
              return { Component: Loan.default };
            },
          },
          {
            path: "apply-for-loan",
            async lazy() {
              const ApplyForLoan = await import("../pages/apply-for-loan");
              return { Component: ApplyForLoan.default };
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
