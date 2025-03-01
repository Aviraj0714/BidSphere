import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { reset, resetNewPassword } from "../../store/auth/authSlice";

const ResetNewPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      setPassword("");

      setTimeout(() => {
        dispatch(reset());
        navigate("/login");
      }, 1000);
    }

    if (isError) {
      toast.error(message);
      setTimeout(() => dispatch(reset()), 1000);
    }

    return () => {
      dispatch(reset()); // Cleanup on unmount
    };
  }, [isSuccess, isError, dispatch, navigate, message]);

  const resetNewPasswordHandler = (e) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    const data = { password, id, token };
    dispatch(resetNewPassword(data));
  };

  return (
    <div className="d-flex vh-100 w-100 align-items-center justify-content-center bg-dark text-light">
      <div className="w-50 p-4 rounded bg-secondary text-center">
        <h1 className="fs-3 fw-bold text-white">
          <span className="text-primary">B</span>id
          <span className="text-primary">F</span>air
        </h1>
        <hr className="my-3 border-light w-75 mx-auto" />
        <form className="w-100" onSubmit={resetNewPasswordHandler}>
          <div className="mb-3 text-start">
            <label className="form-label">Enter New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Your new Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetNewPassword;
