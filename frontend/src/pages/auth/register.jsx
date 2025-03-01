import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register, reset } from "../../store/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful", { autoClose: 1000 });
      dispatch(reset());
      navigate("/login");
    } else if (isError) {
      toast.error(message, { autoClose: 1000 });
      dispatch(reset());
    }
  }, [isSuccess, isError, isLoading, dispatch, navigate, message]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Email format is invalid", { autoClose: 1000 });
      return;
    } else if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
        { autoClose: 1000 }
      );
      return;
    }

    dispatch(reset());
    dispatch(register(formData));
  };

  return (
    <div className="d-flex min-vh-100 w-100 align-items-center justify-content-center bg-dark text-light">
      <div className="w-50 p-4 rounded bg-secondary text-center">
        <h1 className="fs-3 fw-bold text-white">
          <span className="text-primary">B</span>id
          <span className="text-primary">F</span>air
        </h1>
        <p className="mt-2 fs-5">Create your new account</p>
        <hr className="my-3 border-light w-75 mx-auto" />
        <form className="w-100" onSubmit={handleRegister}>
          <div className="mb-3 text-start">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control bg-secondary text-white"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              minLength={5}
            />
          </div>

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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold text-info">
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
