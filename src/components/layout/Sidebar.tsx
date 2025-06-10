import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const AdminSideBar = [
  { label: "Dashboard", icon: "🏠", href: "/" },
  { label: "Loans", icon: "🏦", href: "/loans" },
  { label: "Users", icon: "👥", href: "/users" },
  { label: "Shares", icon: "📈", href: "/shares" },
];

const UserSideBar = [
  { label: "Dashboard", icon: "🏠", href: "/" },
  { label: "Deposits", icon: "💰", href: "/deposits" },
  { label: "Loans", icon: "🏦", href: "/loans" },
  { label: "Shares", icon: "📈", href: "/shares" },
];

const Sidebar = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: () => void;
}) => {
  const router = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setOpen();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  const handleLogout = () => {
    Cookies.remove("brotherFinance");
    Cookies.remove("token");
    setTimeout(() => {
      router("/login");
    }, 2000);
  };
  const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
  const role = brotherFinance?.role;
  const sideBar = role === "admin" ? AdminSideBar : UserSideBar;
  return (
    <nav
      className={`bg-gray-800 border-r transition-all delay-500 text-white ${
        isOpen ? "w-64 " : "w-20"
      }  h-screen`}
    >
      <div className="px-4 py-5">
        <div className="mt-8 ">
          <ul className="space-y-2">
            {sideBar?.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => router(item.href)}
                  className="px-4 w-full py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  <span className="mr-3">{item.icon}</span>{" "}
                  {isOpen && item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Section - Desktop */}
        <div className="mt-auto  pt-8">
          <div className="border-t border-gray-700 pt-4">
            {role !== "admin" && (
              <button
                onClick={() => router("/profile")}
                className="px-4 py-2 rounded-md w-full flex items-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              >
                <span className="mr-3"> 👤</span> {isOpen && "Profile"}
              </button>
            )}

            <button
              onClick={() => handleLogout()}
              className="px-4 py-2 w-full rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              <span className="mr-3"> 🚪</span> {isOpen && "Logout"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
