import React from "react";
import { Link } from "react-router-dom";
import errorimg from "../../assets/error.png";

const ErrorPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-white text-center vh-100">
      <img className="img-fluid w-50" src={errorimg} alt="Error" style={{ maxWidth: "600px" }} />

      <div className="mt-4">
        <h1 className="fs-3 fw-bold">Oops... Page Not Found</h1>
        <p className="text-secondary">
          The page you are looking for is not found or has been removed.
        </p>
      </div>

      <Link
        to="/admin/dashboard"
        className="btn btn-primary fw-bold px-4 py-2 mt-3"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
