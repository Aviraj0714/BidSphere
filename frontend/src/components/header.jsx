import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { getNotificationForUser } from "../store/notification/notificationSlice";
import socket from "../socket";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  let navigate = useNavigate();
  let location = useLocation();
  const logInUser = JSON.parse(localStorage.getItem("user"));

  const unReadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );

  useEffect(() => {
    if (logInUser) {
      dispatch(getNotificationForUser());
    }
    socket.on("newBidNotification", () => {
      socket.emit("joinAuction", logInUser?._id);
      dispatch(getNotificationForUser());
    });
  }, [location]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark border-bottom border-secondary py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-brand text-light fw-bold">
          <span className="text-primary text-uppercase">B</span>id
          <span className="text-primary text-uppercase">F</span>air
        </Link>

        {/* Navbar Links (Desktop) */}
        <div className="d-none d-sm-flex">
          <Link to="/" className="text-light fw-bold mx-3 text-decoration-none hover-text-primary">
            Home
          </Link>
          <Link to="/contact-us" className="text-light fw-bold mx-3 text-decoration-none hover-text-primary">
            Contact
          </Link>
          <Link to="/about-us" className="text-light fw-bold mx-3 text-decoration-none hover-text-primary">
            About
          </Link>
        </div>

        {/* User Section */}
        <div className="d-flex align-items-center">
          {user ? (
            <div className="d-flex align-items-center">
              <Link to="/user-profile/cart" className="text-light mx-3">
                <BsCart3 className="text-white hover-text-primary transition-all" />
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

              <Link to="/user-profile/notifications" className="position-relative me-3">
                {unReadNotifications.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {unReadNotifications.length}
                  </span>
                )}
                <IoIosNotificationsOutline size={30} className="text-white cursor-pointer" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="btn btn-outline-light d-sm-none"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary mx-2">
                Sign In
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="btn btn-outline-light d-sm-none"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                {navbarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {navbarOpen && (
        <ul className="position-absolute top-100 start-0 w-100 vh-100 bg-dark d-flex flex-column align-items-center pt-4">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white fs-4" onClick={() => setNavbarOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact-us" className="nav-link text-white fs-4" onClick={() => setNavbarOpen(false)}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about-us" className="nav-link text-white fs-4" onClick={() => setNavbarOpen(false)}>
              About
            </Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link to="/user-profile/cart" className="nav-link text-white fs-4" onClick={() => setNavbarOpen(false)}>
                Cart
              </Link>
            </li>
          )}
        </ul>
      )}

      {/* User Dropdown */}
      {user && sidebarOpen && (
        <div className="dropdown-menu show position-absolute end-0 mt-2 p-3 bg-dark text-white rounded">
          <Link to="/user-profile/profile" className="dropdown-item text-white">
            Profile
          </Link>
          <Link to={user.userType === "seller" ? "/user-profile/manage-items" : "/user-profile/bids-items"} className="dropdown-item text-white">
            {user.userType === "seller" ? "Manage Items" : "Bids Items"}
          </Link>
          <Link to="/user-profile/account-settings" className="dropdown-item text-white">
            Account Settings
          </Link>
          <button className="dropdown-item text-white bg-transparent border-0" onClick={logoutHandle}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
