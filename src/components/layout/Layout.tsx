import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Drawer } from "@mantine/core";
import useIsMobile from "../../hooks/useIsMobile";
import { useRecoilState } from "recoil";
import { layoutAtom } from "../../atom/layout-atom";
const Layout = () => {
  const [open, setOpen] = useRecoilState(layoutAtom);

  const isMobile = useIsMobile();
  return (
    <div className=" flex justify-between  h-screen">
      {isMobile ? (
        <Drawer
          padding={0}
          withCloseButton={false}
          opened={open}
          size="256px"
          onClose={() => setOpen(!open)}
          transitionProps={{ duration: 500 }}
          withinPortal={false}
        >
          <Sidebar isOpen={open} setOpen={() => setOpen(!open)} />
        </Drawer>
      ) : (
        <Sidebar isOpen={open} setOpen={() => setOpen(!open)} />
      )}

      <div className=" w-full bg-gray-100">
        <Header setOpen={() => setOpen(!open)} />
        <div className="p-5 h-[calc(100vh-5rem)]  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
