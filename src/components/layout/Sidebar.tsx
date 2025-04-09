import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: () => void;
}) => {
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setOpen();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  const handleLogout = () => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };
  const router = useNavigate();
  return (
    <nav
      className={`bg-gray-800 border-r transition-all delay-500 text-white ${
        isOpen ? "w-64 " : "w-20"
      }  h-screen`}
    >
      <div className="px-4 py-5">
        <div className="mt-8 ">
          <ul className="space-y-2">
            {[
              { label: "Dashboard", icon: "🏠", href: "/" },
              { label: "Deposits", icon: "💰", href: "/deposits" },
              { label: "Loans", icon: "🏦", href: "/loans" },
              { label: "Installments", icon: "📅", href: "/installments" },
              { label: "Shares", icon: "📈", href: "/shares" },
            ].map((item) => (
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
            <a
              href="#profile"
              className="px-4 py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              <span className="mr-3"> 👤</span> {isOpen && "Profile"}
            </a>{" "}
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
