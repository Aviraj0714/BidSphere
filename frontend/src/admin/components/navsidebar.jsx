import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaCirclePlus,
  FaEdit,

} from "react-icons/fa6";
import { 
  IoIosNotifications, 
  IoMdSettings, 
  IoIosListBox 
} from "react-icons/io";
import { 
  RiLockPasswordFill 
} from "react-icons/ri";
import { 
  IoLogOutSharp, 
  IoWalletOutline 
} from "react-icons/io5";

const NavSidebar = ({ closeNavbar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    dispatch(reset());
    navigate("/admin/login");
  };

  return (
    <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ minWidth: "250px" }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/admin/dashboard" ? "bg-primary" : ""
            }`}
            to="/admin/dashboard"
            onClick={closeNavbar}
          >
            <FaUser size={16} /> Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/admin/users" ? "bg-primary" : ""
            }`}
            to="/admin/users"
            onClick={closeNavbar}
          >
            <FaEdit size={16} /> Users
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/admin/auctions" ? "bg-primary" : ""
            }`}
            to="/admin/auctions"
            onClick={closeNavbar}
          >
            <FaCirclePlus size={16} /> Auctions
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/admin/categories" ? "bg-primary" : ""
            }`}
            to="/admin/categories"
            onClick={closeNavbar}
          >
            <IoIosListBox size={18} /> Category
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/user-profile/notifications" ? "bg-primary" : ""
            }`}
            to="/user-profile/notifications"
            onClick={closeNavbar}
          >
            <IoIosNotifications size={18} /> Notifications
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/user-profile/account-settings" ? "bg-primary" : ""
            }`}
            to="/user-profile/account-settings"
            onClick={closeNavbar}
          >
            <IoMdSettings size={18} /> Account Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/user-profile/change-password" ? "bg-primary" : ""
            }`}
            to="/user-profile/change-password"
            onClick={closeNavbar}
          >
            <RiLockPasswordFill size={16} /> Change Password
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link text-white d-flex align-items-center gap-2 p-2 rounded ${
              location.pathname === "/user-profile/payment-method" ? "bg-primary" : ""
            }`}
            to="/user-profile/payment-method"
            onClick={closeNavbar}
          >
            <IoWalletOutline size={18} /> Payment Method
          </Link>
        </li>

        <li className="nav-item">
          <button
            className="btn btn-danger d-flex align-items-center gap-2 w-100 mt-3"
            onClick={logoutHandle}
          >
            <IoLogOutSharp size={18} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavSidebar;
