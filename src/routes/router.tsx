import { createBrowserRouter, redirect } from "react-router-dom";import Layout from "../components/layout/Layout";
import Cookies from "js-cookie";
const userLogged = () => {
  const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
  if (!brotherFinance?.token) return false;
  return true;
};
// Loader for protected routes
export const protectedLoader = () => {
  const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
  if (!brotherFinance?.token) return redirect("/login");
  return null;
};

// Loader for login page
export const guestLoader = () => {
  const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
  if (brotherFinance?.token) return redirect("/");
  return null;
};
console.log("Router loaded", userLogged());
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
        loader: protectedLoader,
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
              const DepositPage = await import("../pages/deposit/index");
              return { Component: DepositPage.default };
            },
          },
          {
            path: "add-deposit",
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
            path: ":id",
            async lazy() {
              const LoanDetails = await import("../pages/loan/loan-details");
              return { Component: LoanDetails.default };
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
      {
        path: "/users",
        children: [
          {
            index: true,
            async lazy() {
              const UserPage = await import("../pages/users");
              return { Component: UserPage.default };
            },
          },
          {
            path: ":id",
            async lazy() {
              const UserDetails = await import("../pages/users/UserDetails");
              return { Component: UserDetails.default };
            },
          },
        ],
      },
      {
        path: "/profile",
        async lazy() {
          const Profile = await import("../pages/Profile");
          return { Component: Profile.default };
        },
      },
      {
        path: "/checkout",
        async lazy() {
          const Checkout = await import("../components/stripe/Checkout");
          return { Component: Checkout.default };
        },
      },
      {
        path: "/shares",
        children: [
          {
            index: true,
            async lazy() {
              const ShareManagementPage = await import("../pages/shares");
              return { Component: ShareManagementPage.default };
            },
          },
          {
            path: ":id",
            async lazy() {
              const ShareDetailsPage = await import(
                "../pages/shares/share-details"
              );
              return { Component: ShareDetailsPage.default };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    loader:guestLoader,
    async lazy() {
      const Login = await import("../pages/Login");
      return { Component: Login.default };
    },
  },
  {
    path: "/reset-password",
    loader:guestLoader,
    async lazy() {
      const ResetPassword = await import("../pages/ResetPassword");
      return { Component: ResetPassword.default };
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
