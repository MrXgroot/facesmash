import { Home, Search, Trophy, UserRound } from "lucide-react"; // Lucide icons
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/leaderboard", icon: Trophy, label: "Ranks" },
    { to: "/profile", icon: UserRound, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-600 z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 text-xs transition-all ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Icon
                size={22}
                className={`transition-transform ${
                  isActive ? "scale-110" : "opacity-80"
                }`}
              />
              <span className="tracking-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
