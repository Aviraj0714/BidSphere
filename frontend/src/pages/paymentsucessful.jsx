import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteCartItem } from "../store/cart/cartSlice";
import { updatePaymentStatus } from "../store/auction/auctionSlice";
import { FaRegCheckCircle } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const PaymentSuccess = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updatePaymentStatus(id));
    dispatch(deleteCartItem(id));

    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [dispatch, id, navigate]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 text-white text-center">
      <Row>
        <Col>
          <FaRegCheckCircle size={96} className="text-success mb-3" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="fw-bold">Payment Successful!</h2>
          <p className="text-muted">Thank you for your billing.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
