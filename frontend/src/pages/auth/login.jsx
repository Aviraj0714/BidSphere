import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, reset } from "../../store/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message, { autoClose: 1000 });
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message, { autoClose: 1000 });
      dispatch(reset());
      navigate("/dashboard");
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, isLoading, dispatch, navigate, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatch(login(formData));
  };

  return (
    <div className="d-flex min-vh-100 w-100 align-items-center justify-content-center bg-dark text-light">
      <div className="w-50 p-4 rounded bg-secondary text-center">
        <h1 className="fs-3 fw-bold text-white">
          <span className="text-primary">B</span>id
          <span className="text-primary">F</span>air
        </h1>

        <p className="mt-2 fs-5">Login with your account</p>
        <hr className="my-3 border-light w-75 mx-auto" />

        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control bg-secondary text-white"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-secondary text-white"
              placeholder="Your Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="text-end mb-3">
            <Link to="/forgot-password" className="text-info text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            Sign In
          </button>
        </form>

        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="fw-bold text-info">
            Sign Up.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
