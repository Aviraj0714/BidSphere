import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="position-relative bg-dark shadow w-100">
      <div className="container py-4 py-md-5">
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
          <Link
            to="/dashboard"
            className="d-flex align-items-center mb-3 mb-sm-0 text-decoration-none"
          >
            <h1 className="text-light fw-bold">
              <span className="text-primary text-uppercase">B</span>id
              <span className="text-primary text-uppercase">F</span>air
            </h1>
          </Link>

          <ul className="d-flex flex-wrap align-items-center text-light fw-medium list-unstyled">
            <li className="me-3 me-md-4">
              <Link to="/about-us" className="text-light text-decoration-none hover-text-primary">
                About Us
              </Link>
            </li>
            <li className="me-3 me-md-4">
              <Link to="/privacy-policy" className="text-light text-decoration-none hover-text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="text-light text-decoration-none hover-text-primary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-3 border-secondary" />

        <div className="text-center text-light fs-6">
          © {new Date().getFullYear()}
          <Link to="/" className="ms-1 text-decoration-none">
            <span className="fw-bold text-primary">
              <span className="text-uppercase"> B</span>id
              <span className="text-uppercase">F</span>air
            </span>
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
