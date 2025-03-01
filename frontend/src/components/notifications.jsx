import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaRegClock, FaRegCheckCircle } from "react-icons/fa";
import {
  getNotificationForUser,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../store/notification/notificationSlice";
import socket from "../socket";
import Pagination from "./Pagination";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const [notificationData, setNotificationData] = useState();
  const logInUser = JSON.parse(localStorage.getItem("user"));

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5);
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notificationData?.slice(indexOfFirstNotification, indexOfLastNotification);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const nextPage = () => setCurrentPage(currentPage + 1);

  useEffect(() => {
    dispatch(getNotificationForUser());
    socket.emit("joinAuction", logInUser?._id);
  }, [dispatch]);

  useEffect(() => {
    setNotificationData(notifications);
    socket.on("newBidNotification", () => {
      dispatch(getNotificationForUser());
    });
  }, [notifications]);

  const handleMarkAllAsRead = async () => {
    await dispatch(markAllNotificationsAsRead());
    dispatch(getNotificationForUser());
  };

  const handleMarkSingleAsRead = async (id) => {
    await dispatch(markNotificationAsRead(id));
    dispatch(getNotificationForUser());
  };

  return (
    <div className="overflow-auto d-flex flex-column w-100 p-4 bg-dark text-light rounded">
      <h2 className="text-light fw-bold border-bottom pb-3 mb-4">
        Notifications
      </h2>

      <button
        className="d-flex align-items-center gap-2 btn btn-danger fw-bold"
        onClick={handleMarkAllAsRead}
      >
        <FaRegCheckCircle size={18} /> Mark all as read
      </button>

      {notificationData?.length > 0 ? (
        <div className="overflow-auto border border-secondary rounded p-4 mt-4">
          {currentNotifications?.map((notification) => (
            <Link
              to={notification?.link}
              key={notification?._id}
              onClick={() => handleMarkSingleAsRead(notification?._id)}
              className={`card p-3 mb-3 border ${
                notification?.isRead ? "bg-secondary text-light" : "bg-primary text-white"
              }`}
            >
              <div className="d-flex gap-3">
                <img
                  src={notification?.auction?.image}
                  alt={notification?.auction?.name}
                  className="rounded"
                  width="100"
                  height="100"
                />
                <div>
                  <h5 className="fw-bold">{notification?.auction?.name}</h5>
                  <p>{notification?.message}</p>
                  <span className="d-flex align-items-center gap-2 text-secondary">
                    <FaRegClock size={18} className="text-primary" />
                    {new Date(notification?.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
          <h4 className="text-light">No Notifications</h4>
        </div>
      )}

      {notificationData?.length > 0 && (
        <Pagination
          totalPosts={notificationData?.length}
          postsPerPage={notificationsPerPage}
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
};

export default Notifications;
