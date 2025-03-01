import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordSendMail, reset } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, dispatch, navigate, message]);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Email is required");
      return;
    }
    dispatch(forgotPasswordSendMail({ email }));
  };

  return (
    <div className="d-flex vh-100 w-100 align-items-center justify-content-center bg-dark text-light">
      <div className="w-50 p-4 rounded bg-secondary text-center">
        <h1 className="fs-3 fw-bold text-white">
          <span className="text-primary">B</span>id
          <span className="text-primary">F</span>air
        </h1>
        <p className="mt-2 fs-5">Reset your account password</p>
        <hr className="my-3 border-light w-75 mx-auto" />
        
        <form className="w-100" onSubmit={handlePasswordReset}>
          <div className="mb-3 text-start">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control bg-secondary text-white"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
