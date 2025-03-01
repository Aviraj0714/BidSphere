import { Link } from "react-router-dom";
import CountDownTimer from "../components/countdown";
import { useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import socket from "../socket";

const SingleAuction = ({
  name,
  startingPrice,
  image,
  endTime,
  startTime,
  id,
  status,
  sellerImage,
  sellerName,
  sellerId,
}) => {
  const [statusData, setStatusData] = useState(status);

  socket.on("setStatus", async () => {
    await setStatusData("over");
  });

  const logInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-100 d-flex flex-column justify-content-between bg-dark text-light rounded p-3">
      <div>
        {/* Auction Image */}
        <div className="position-relative overflow-hidden bg-white rounded">
          <img
            className="w-100 rounded object-contain img-fluid"
            src={image}
            alt="item"
          />
          <div className="position-absolute bottom-2 end-2 border border-primary rounded-pill py-1 px-3 small bg-dark bg-opacity-75">
            <CountDownTimer startTime={startTime} endTime={endTime} status={status} id={id} />
          </div>
        </div>
        <h3 className="my-3 fs-5">{name}</h3>
      </div>

      <div>
        {/* Seller Info */}
        <div className="d-flex align-items-center">
          <img src={sellerImage} className="rounded-circle me-2" width="36" height="36" alt="seller" />
          <h3 className="fs-6">{sellerName}</h3>
        </div>

        {/* Auction Status */}
        {statusData === "over" ? (
          <div className="mt-3 border-top pt-2">
            <Link to={`/single-auction-detail/${id}`} className="btn btn-danger w-100 text-white fw-bold">
              View
            </Link>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center mt-2 border-top pt-2">
            <div>
              <p className="small mb-1">Current Bid</p>
              <p className="mb-0 fw-bold">${startingPrice}</p>
            </div>
            <Link
              to={`/single-auction-detail/${id}`}
              className={`btn d-flex align-items-center fw-bold text-white ${
                sellerId === logInUser?._id
                  ? "btn-secondary text-muted border"
                  : "btn-primary border"
              }`}
            >
              <BsCurrencyDollar size={18} className="me-1" />
              Place Bid
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleAuction;
