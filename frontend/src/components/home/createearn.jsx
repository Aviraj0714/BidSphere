import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const CreateEarnHome = () => {
  const logInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex flex-column gap-3 mb-4 p-5 mt-5 justify-content-center text-light bg-dark rounded-4 text-center">
      <div>
        <h2 className="mb-2 display-5 fw-bold">
          Create, Sell & Earn at <span className="text-primary text-uppercase">B</span>id
          <span className="text-primary text-uppercase">F</span>air
        </h2>
        <p className="fs-5">Start selling your amazing products now!</p>
      </div>
      <Link
        className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 fw-bold"
        to={logInUser ? "/create-auction" : "/login"}
      >
        <span>Get Started</span>
        <FaArrowRightLong />
      </Link>
    </div>
  );
};

export default CreateEarnHome;
