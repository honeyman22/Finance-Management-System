import { MdNotifications } from "react-icons/md";const Header = () => {
  return (
    <header className="bg-gray-800  shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left - App Name or User Info */}
      <div className="text-lg font-semibold text-white">
        Welcome, <span className="font-bold">Brother Finance</span>
      </div>

      {/* Right - Notification Icon */}
      <div className="relative">
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 p-2 rounded-full"
          aria-label="Notifications"
        >
          <MdNotifications className="w-6 h-6" />
        </button>

        {/* Notification Badge (optional) */}
        <span className="absolute top-1 right-1 inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-red-500">
          <span className="sr-only"></span>
        </span>
      </div>
    </header>
  );
};

export default Header;
