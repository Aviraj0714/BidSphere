import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa6";
import { RiAuctionFill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { IoLogOutSharp } from "react-icons/io5";

const Sidebar = ({ closeNavbar }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {}, [user]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="d-none d-sm-block col-lg-3">
      <div className="card bg-dark text-white shadow-sm p-3">
        <ul className="list-group list-group-flush">
          {/* Users */}
          <li className="list-group-item bg-dark text-white">
            <Link
              to="/admin/users"
              className={`d-flex align-items-center p-2 rounded ${activeLink === "/admin/users" ? "bg-primary text-white" : "text-light"}`}
              onClick={() => handleLinkClick("/admin/users")}
            >
              <FaUser size={16} className="me-2" />
              Users
            </Link>
          </li>

          {/* Auctions */}
          <li className="list-group-item bg-dark text-white">
            <Link
              to="/admin/auctions"
              className={`d-flex align-items-center p-2 rounded ${activeLink === "/admin/auctions" ? "bg-primary text-white" : "text-light"}`}
              onClick={() => handleLinkClick("/admin/auctions")}
            >
              <RiAuctionFill size={16} className="me-2" />
              Auctions
            </Link>
          </li>

          {/* Categories */}
          <li className="list-group-item bg-dark text-white">
            <Link
              to="/admin/categories"
              className={`d-flex align-items-center p-2 rounded ${activeLink === "/admin/categories" ? "bg-primary text-white" : "text-light"}`}
              onClick={() => handleLinkClick("/admin/categories")}
            >
              <BiSolidCategory size={16} className="me-2" />
              Category
            </Link>
          </li>

          {/* Logout */}
          <li className="list-group-item bg-dark text-white">
            <button
              className="d-flex align-items-center p-2 rounded w-100 border-0 bg-transparent text-light"
              onClick={logoutHandle}
            >
              <IoLogOutSharp size={16} className="me-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
