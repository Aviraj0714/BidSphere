import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row align-items-center">
          {/* Logo Section */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <Link to="/dashboard" className="text-decoration-none text-light">
              <h1 className="fw-bold">
                <span className="text-primary text-uppercase">B</span>id
                <span className="text-primary text-uppercase">F</span>air
              </h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline m-0">
              <li className="list-inline-item mx-2">
                <Link to="/about-us" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link
                  to="/privacy-policy"
                  className="text-light text-decoration-none"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link
                  to="/contact-us"
                  className="text-light text-decoration-none"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        {/* Copyright Section */}
        <div className="text-center">
          <small>
            © {new Date().getFullYear()}{" "}
            <Link to="/admin/dashboard" className="text-primary text-decoration-none fw-bold">
              <span className="text-uppercase">B</span>id
              <span className="text-uppercase">F</span>air
            </Link>
            . All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
