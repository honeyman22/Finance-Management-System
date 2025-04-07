import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <div className="w-full flex justify-between  h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1  bg-gray-100">
        <Header />
        <div className="p-8 h-[calc(100vh-4rem)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
