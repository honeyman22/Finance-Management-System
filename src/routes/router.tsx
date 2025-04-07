import { createBrowserRouter, redirect } from "react-router-dom";
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
    children: [
      {
        path: "/",
        async lazy() {
          const Dashboard = await import("../pages/Dashboard");
          return { Component: Dashboard.default };
        },
      },
    ],
  },
]);
