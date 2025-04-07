import { useState, useEffect } from "react";const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gray-800 border-r text-white w-full lg:w-64 lg:min-h-screen  lg:left-0 lg:top-0 lg:h-screen lg:overflow-y-auto">
      <div className="px-4 py-5">
        {/* Logo and Mobile Button */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Brother Finance</div>
          <button
            className="lg:hidden text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              // Close Icon
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="mt-8 hidden lg:block">
          <ul className="space-y-2">
            {[
              { label: "Dashboard", icon: "🏠", href: "#dashboard" },
              { label: "Deposits", icon: "💰", href: "#deposits" },
              { label: "Loans", icon: "🏦", href: "#loans" },
              { label: "Installments", icon: "📅", href: "#installments" },
              { label: "Shares", icon: "📈", href: "#shares" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="px-4 py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  <span className="mr-3">{item.icon}</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Section - Desktop */}
        <div className="mt-auto hidden lg:block pt-8">
          <div className="border-t border-gray-700 pt-4">
            <a
              href="#profile"
              className="px-4 py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              👤 Profile
            </a>
            <a
              href="#logout"
              className="mt-2 px-4 py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              🚪 Logout
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-gray-800 rounded-lg transition-all duration-150">
            <ul className="px-2 py-3 space-y-1">
              {[
                "Dashboard",
                "Deposits",
                "Loans",
                "Installments",
                "Shares",
                "Profile",
                "Logout",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
