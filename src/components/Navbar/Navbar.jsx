import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdLeaderboard } from "react-icons/md";





import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link
        to="/home"
        className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}
      >
        <AiFillHome size={24} />
        <span>Home</span>
      </Link>

      <Link
        to="/search"
        className={`nav-link ${location.pathname === "/search" ? "active" : ""}`}
      >
        <BiSearch size={24} />
        <span>Search</span>
      </Link>

      <Link
        to="/profile"
        className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
      >
        <CgProfile size={24} />
        <span>Profile</span>
      </Link>
       <Link
        to="/leaderBoard"
        className={`nav-link ${location.pathname === "/leaderBoard" ? "active" : ""}`}
      >
        <MdLeaderboard size={24} />
        <span>Leader Board</span>
      </Link>
    </div>
  );
};

export default Navbar;
