import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import NavSidebar from "./NavSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/admin/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/admin/dashboard" className="navbar-brand fw-bold">
          <span className="text-primary text-uppercase">B</span>id
          <span className="text-primary text-uppercase">F</span>air
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Navbar Items */}
        <div className={`collapse navbar-collapse ${navbarOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us" onClick={closeNavbar}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us" onClick={closeNavbar}>
                About Us
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/user-profile/cart"
                  onClick={closeNavbar}
                >
                  Cart
                </Link>
              </li>
            )}
          </ul>

          {/* User Profile & Notifications */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <Link to="/user-profile/notifications" className="me-3">
                  <IoIosNotificationsOutline size={30} className="text-light" />
                </Link>
                <img
                  src={user?.profilePicture}
                  alt="User"
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  style={{ cursor: "pointer" }}
                />
              </>
            ) : (
              <Link
                to="/admin/login"
                className="btn btn-primary fw-semibold text-light"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Dropdown for User */}
      {user && sidebarOpen && (
        <div className="dropdown-menu show position-absolute end-0 mt-3 p-2 shadow bg-dark text-white">
          <Link className="dropdown-item text-light" to="/admin/dashboard">
            Profile
          </Link>
          <Link
            className="dropdown-item text-light"
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
          >
            Account Setting
          </Link>
          <button className="dropdown-item text-light" onClick={logoutHandle}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
