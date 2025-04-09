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
    ],
  },
  {
    path: "/*",
    async lazy() {
      const PageNotFound = await import("../pages/Pagenotfound");
      return { Component: PageNotFound.default };
    },
  },
]);
