import { Link } from "react-router-dom";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="d-flex flex-column align-items-center justify-content-center text-center bg-dark text-white py-5" style={{ height: "280px" }}>
        <h1 className="fw-bold">Privacy Policy</h1>
        <Breadcrumb className="mt-2">
          <Breadcrumb.Item as={Link} to="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Privacy Policy</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Content Section */}
      <Container className="py-5">
        {/* Privacy Policy */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Privacy Policy</h2>
            <p className="text-muted mt-3">
              Real-Time Online Auction system takes the privacy of its users seriously. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to protect your personal data.
            </p>
          </Col>
        </Row>

        {/* Collect Information */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Collect Information</h2>
            <ul className="mt-3 text-muted">
              <li>
                <strong>Personal Information:</strong> This includes your name, email, phone number, billing address, and shipping address. You provide this information when registering, listing an item, placing a bid, or contacting support.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> Includes browsing history, IP address, and device information, collected automatically when you use our website.
              </li>
            </ul>
          </Col>
        </Row>

        {/* Usage of Information */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Usage of Information</h2>
            <p className="text-muted mt-3">
              We use the collected information for:
            </p>
            <ul className="mt-3 text-muted">
              <li><strong>Service Improvement:</strong> Allows auction participation, processes transactions, and provides customer support.</li>
              <li><strong>Personalization:</strong> Recommends relevant auctions based on user preferences.</li>
              <li><strong>Marketing Communications:</strong> Sends newsletters and promotional offers (opt-out available).</li>
            </ul>
          </Col>
        </Row>

        {/* Security of User Data */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Security of User Data</h2>
            <p className="text-muted mt-3">
              Steps we take to protect your data:
            </p>
            <ul className="mt-3 text-muted">
              <li>Secure servers for data storage.</li>
              <li>Encryption for data protection.</li>
              <li>Restricted access to authorized personnel only.</li>
            </ul>
          </Col>
        </Row>

        {/* Copyright and Security */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Copyright and Security</h2>
            <p className="text-muted mt-3">
              Our platform respects intellectual property rights, prohibits copyright violations, and maintains security against unauthorized access.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
