import { useEffect } from "react";const Sidebar = ({
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

  return (
    <nav
      className={`bg-gray-800 border-r transition-all delay-500 text-white ${
        isOpen ? "w-64 " : "w-20"
      }  h-screen`}
    >
      <div className="px-4 py-5">
        {/* Desktop Navigation */}
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
                <a
                  href={item.href}
                  className="px-4 py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  <span className="mr-3">{item.icon}</span>{" "}
                  {isOpen && item.label}
                </a>
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
            <a
              href="#logout"
              className="px-4 py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              <span className="mr-3"> 🚪</span> {isOpen && "Logout"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
