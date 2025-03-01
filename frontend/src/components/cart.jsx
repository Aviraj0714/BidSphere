import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../store/cart/cartSlice";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const fetchStripe = async () => {
      const stripeInstance = await loadStripe(
        "pk_test_51P5t81Lvvxf0OOpItZ5a94EMI92eFidBTy8oWVF7XTsHTwu17Q9BB292AQjV6s3fjSoWdp60vlG1jG090s6QgDm100UKAL5SIR"
      ); // Replace with your public key
      setStripe(stripeInstance);
    };

    fetchStripe();
  }, []);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (cartItems) {
      setCartItem(cartItems);
    }
  }, [cartItems]);

  const redirectToCheckout = async (product) => {
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.startingPrice * 100, // Stripe interprets price in cents
        },
        quantity: 1,
      },
    ];
    
    const sendProductData = { id: product._id, lineItems };

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/payments/checkout",
      { sendProductData },
      { withCredentials: true }
    );

    const result = await stripe.redirectToCheckout({ sessionId: data.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="p-4 p-md-5 bg-dark text-white rounded-3">
      <h2 className="fw-bold fs-4 border-bottom pb-3 mb-4">Your Cart</h2>
      {cartItem?.map((item) => (
        <div key={item._id} className="border border-light rounded-3 p-3 mb-3">
          {item.products.map((product) => (
            <div
              key={product._id}
              className="p-3 d-flex flex-column flex-md-row align-items-start align-items-md-center border-bottom border-light gap-3"
            >
              <div className="d-flex gap-3">
                <img
                  className="rounded-3"
                  src={product.image}
                  alt={product.name}
                  style={{ width: "85px", height: "85px" }}
                />
                <div>
                  <h3 className="fs-5 fw-bold">{product.name}</h3>
                  <p>${product.startingPrice}</p>
                </div>
              </div>
              <div className="d-flex gap-3 mt-2 mt-md-0 ms-auto">
                <Link
                  to={`/single-auction-detail/${product._id}`}
                  className="btn btn-outline-primary"
                >
                  View Product
                </Link>
                <button
                  className="btn btn-primary fw-bold"
                  onClick={() => redirectToCheckout(product)}
                >
                  Go to Checkout
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Cart;
