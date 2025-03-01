import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import herovector from "../../assets/main.jpg";
import { RiFindReplaceLine } from "react-icons/ri";

const HeroHome = () => {
  const logInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container text-black py-5">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-lg-6 text-white position-relative">
          {/* Background Blur Effects */}
          <div
            className="position-absolute rounded-circle"
            style={{
              width: "300px",
              height: "300px",
              filter: "blur(150px)",
              left: "-50px",
              top: "-80px",
            }}
          ></div>
          <div
            className="position-absolute bg-info rounded-circle"
            style={{
              width: "200px",
              height: "200px",
              filter: "blur(150px)",
              left: "45%",
              top: "100px",
            }}
          ></div>
          <div
            className="position-absolute bg-danger rounded-circle"
            style={{
              width: "250px",
              height: "250px",
              filter: "blur(150px)",
              right: "50px",
              bottom: "20%",
            }}
          ></div>

          <h3 className="text-uppercase text-black">Discover, Collect and Sell</h3>
          <h1 className="display-4 text-black fw-bold">
            Discover Rare Products And Bid in Real-Time
          </h1>
          <p className="lead text-black">
            Our real-time auctions let you join the thrill of selling, hunting,
            and bidding live on rare products. Explore our listings to start
            bidding or sell your own products!
          </p>

          {/* Buttons */}
          <div className="d-flex gap-3">
            <Link to="/dashboard" className="btn btn-outline-primary px-4 py-2">
              <RiFindReplaceLine className="me-2 " />
              Explore More
            </Link>
            <Link
              to={logInUser ? "/create-auction" : "/login"}
              className="btn btn-primary px-4 py-2"
            >
              Create Now <FaArrowRightLong className="ms-2" />
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 text-center">
          <img
            src={herovector}
            alt="Hero"
            className="img-fluid"
            style={{ animation: "float 3s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
