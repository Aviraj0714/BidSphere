import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaCirclePlus,
} from "react-icons/fa6";
import {
  IoIosNotifications,
  IoMdSettings,
  IoIosListBox,
} from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOutSharp, IoWalletOutline } from "react-icons/io5";

const Sidebar = () => {
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
    <div className="col-lg-3 col-md-4">
      <div className="bg-dark text-light p-4 rounded">
        <ul className="list-unstyled">
          <li>
            <Link
              className={`d-flex align-items-center gap-2 p-2 rounded text-decoration-none ${
                activeLink === "/user-profile/profile"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              to="/user-profile/profile"
              onClick={() => handleLinkClick("/user-profile/profile")}
            >
              <FaUser size={16} />
              Profile
            </Link>
          </li>

          {user?.userType === "seller" && (
            <>
              <li>
                <Link
                  className={`d-flex align-items-center gap-2 p-2 rounded text-decoration-none ${
                    activeLink === "/user-profile/manage-items"
                      ? "bg-primary text-white"
                      : "text-light"
                  }`}
                  to="/user-profile/manage-items"
                  onClick={() => handleLinkClick("/user-profile/manage-items")}
                >
                  <FaEdit size={16} />
                  Manage Items
                </Link>
              </li>
              <li>
                <Link
                  className="d-flex align-items-center gap-2 p-2 rounded text-decoration-none text-light"
                  to="/create-auction"
                >
                  <FaCirclePlus size={16} />
                  Create Auction
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              className={`d-flex align-items-center gap-2 p-2 rounded text-decoration-none ${
                activeLink === "/user-profile/bids-items"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              to="/user-profile/bids-items"
              onClick={() => handleLinkClick("/user-profile/bids-items")}
            >
              <IoIosListBox size={18} />
              Bids Items
            </Link>
          </li>
          <li>
            <Link
              className={`d-flex align-items-center gap-2 p-2 rounded text-decoration-none ${
                activeLink === "/user-profile/notifications"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              to="/user-profile/notifications"
              onClick={() => handleLinkClick("/user-profile/notifications")}
            >
              <IoIosNotifications size={18} />
              Notifications
            </Link>
          </li>
          <li>
            <Link
              className={`d-flex align-items-center gap-2 p-2 rounded text-decoration-none ${
                activeLink === "/user-profile/account-settings"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              to="/user-profile/account-settings"
              onClick={() => handleLinkClick("/user-profile/account-settings")}
            >
              <IoMdSettings size={18} />
              Account Settings
            </Link>
          </li>
          <li>
            <Link
              className={`d-flex align-items-center gap-2 p-2 rounded text-decoration-none ${
                activeLink === "/user-profile/change-password"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              to="/user-profile/change-password"
              onClick={() => handleLinkClick("/user-profile/change-password")}
            >
              <RiLockPasswordFill size={16} />
              Change Password
            </Link>
          </li>
          <li>
            <Link
              className={`d-flex align-items-center gap-2 p-2 rounded text-decoration-none ${
                activeLink === "/user-profile/payment-method"
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
              to="/user-profile/payment-method"
              onClick={() => handleLinkClick("/user-profile/payment-method")}
            >
              <IoWalletOutline size={18} />
              Payment Method
            </Link>
          </li>
          <li>
            <button
              className="d-flex align-items-center gap-2 p-2 rounded border-0 bg-transparent text-light w-100"
              onClick={logoutHandle}
            >
              <IoLogOutSharp size={18} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
