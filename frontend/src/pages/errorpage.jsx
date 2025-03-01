import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import errorimg from "../assets/error.png";

const ErrorPage = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-white text-center vh-100">
      <Row>
        <Col>
          <Image src={errorimg} alt="Error" className="img-fluid w-75" />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h1 className="fw-bold">Oops... Page Not Found</h1>
          <p className="text-muted">The page you're looking for doesn't exist or has been removed.</p>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Link to="/">
            <Button variant="primary" size="lg">Go To Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
