import { Link, NavLink } from "react-router";
import ThemeController from './ThemeController.jsx';
import PropTypes from "prop-types";

const Navbar = ({ themeToggle, theme}) => {
  const navMenu = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/reviews">All Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/add-review">Add Review</NavLink>
      </li>
      <li>
        <NavLink to="/my-reviews">My Reviews</NavLink>
      </li>
    </>
  );
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navMenu}
          </ul>
        </div>
        <Link to='/' className="cursor-pointer font-bold text-2xl">CHILL-GAMER</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navMenu}
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink to="/login" className="btn">Login</NavLink>
        <NavLink to="/register" className="btn">Register</NavLink>
        <ThemeController themeToggle={themeToggle} theme={theme} />
      </div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  themeToggle: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}