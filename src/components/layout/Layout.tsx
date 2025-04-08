import { Outlet } from "react-router-dom";import Header from "./Header";
import Sidebar from "./Sidebar";

import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import useIsMobile from "../../hooks/useIsMobile";
const Layout = () => {
  const [open, { toggle }] = useDisclosure(false);

  const isMobile = useIsMobile();
  return (
    <div className=" flex justify-between  h-screen">
      {isMobile ? (
        <Drawer
          padding={0}
          withCloseButton={false}
          opened={open}
          size="256px"
          onClose={toggle}
          transitionProps={{ duration: 500 }}
          withinPortal={false}
        >
          <Sidebar isOpen={open} setOpen={toggle} />
        </Drawer>
      ) : (
        <Sidebar isOpen={open} setOpen={toggle} />
      )}

      <div className=" w-full bg-gray-100">
        <Header setOpen={toggle} />
        <div className="p-5 h-[calc(100vh-5rem)]  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
