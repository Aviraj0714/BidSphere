import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, reset } from "../../store/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate("/admin/users");
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message);
      dispatch(reset());
      if (user?.userType === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/dashboard");
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  };

  return (
    <div className="d-flex min-vh-100 w-100 align-items-center justify-content-center bg-dark text-light">
      <div className="w-90 w-sm-50 p-4 rounded bg-secondary text-center">
        <h1 className="text-white fw-bold">
          <span className="text-primary text-uppercase">B</span>id
          <span className="text-primary text-uppercase">F</span>air
        </h1>
        <p className="fs-5">Login with your account</p>
        <hr className="w-75 mx-auto" />

        <form className="w-90 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fs-6">Email Address</label>
            <input
              type="email"
              placeholder="Your Email"
              className="form-control bg-dark text-white border-secondary"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label fs-6">Password</label>
            <div className="input-group">
              <input
                type="password"
                placeholder="Your Password"
                className="form-control bg-dark text-white border-secondary"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
