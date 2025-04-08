import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { useDisclosure } from "@mantine/hooks";
const Layout = () => {
  const [open, { toggle }] = useDisclosure(false);
  return (
    <div className="w-full flex justify-between  h-screen">
      <div>
        <Sidebar isOpen={open} setOpen={toggle} />
      </div>
      <div className="flex-1  bg-gray-100">
        <Header setOpen={toggle} />
        <div className="p-8 h-[calc(100vh-5rem)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
