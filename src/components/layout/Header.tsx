import { MdMenu, MdNotifications } from "react-icons/md";
import Cookies from "js-cookie";
const Header = ({ setOpen }: { setOpen: () => void }) => {
  const role = Cookies.get("user");
  return (
    <header className="bg-gray-800  shadow-sm px-4 py-3 h-20 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button onClick={setOpen} className=" text-white">
          <MdMenu size={32} />
        </button>
        {/* Left - App Name or User Info */}
        <div className="text-lg font-semibold capitalize text-white">
          {role} Panel, <span className="font-bold">Brother Finance</span>
        </div>
      </div>
      {/* Right - Notification Icon */}
      <div className="relative">
        <button
          className="text-white  p-2 rounded-full focus:text-gray-800 focus:bg-gray-200 border"
          aria-label="Notifications"
        >
          <MdNotifications className="w-6 h-6" />
        </button>

        {/* Notification Badge (optional) */}
        <span className="absolute -top-1 -right-1 text-white inline-flex items-center text-sm justify-center w-4 h-4 rounded-full bg-red-500">
          3
        </span>
      </div>
    </header>
  );
};

export default Header;
