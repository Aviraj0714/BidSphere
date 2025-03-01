import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../store/auth/authSlice";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const { user } = useSelector((state) => state.auth);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name, email, address: { line1: address } },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const endpoint = user?.paymentVerified
      ? "update-payment-method"
      : "add-payment-method";

    axios
      .post(
        `http://localhost:8000/api/v1/payments/${endpoint}`,
        { paymentMethodId: paymentMethod.id },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            user?.paymentVerified
              ? "Payment Method Updated Successfully"
              : "Payment Method Added Successfully"
          );
          setName("");
          setEmail("");
          setAddress("");
          cardElement.clear();
        }
      })
      .catch((error) => toast.error(error.response?.data?.message || "Error processing payment"));
  };

  return (
    <div className="px-7 pt-4 pb-10 w-full bg-theme-bg rounded-2xl">
      <h1 className="text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5">
        Payment Method
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:w-[450px] gap-3 inputs:outline-none inputs:px-2 inputs:py-[10px] inputs:rounded-md inputs:white [&_button[type=submit]]:bg-theme-color [&_button:hover[type=submit]]:bg-color-danger inputs:border inputs:border-border-info-color focus:inputs:border-theme-color"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name on Card"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <CardElement className="outline-none px-2 py-3 rounded-md bg-white border border-border-info-color focus:border-theme-color" />
        <button
          type="submit"
          disabled={!stripe}
          className="px-3 py-4 rounded-xl text-white cursor-pointer font-bold tracking-wide"
        >
          {user?.paymentVerified ? "Update Payment Method" : "Add Payment Method"}
        </button>
      </form>
    </div>
  );
};

const PaymentMethod = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await loadStripe(
        "pk_test_51P5t81Lvvxf0OOpItZ5a94EMI92eFidBTy8oWVF7XTsHTwu17Q9BB292AQjV6s3fjSoWdp60vlG1jG090s6QgDm100UKAL5SIR"
      );
      setStripePromise(stripe);
    };

    initializeStripe();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentMethod;
