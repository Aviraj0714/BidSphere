import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, reset, updateProfile } from "../store/auth/authSlice";
import { toast } from "react-toastify";

const AccountSetting = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email,
    gender: user?.gender || "",
    address: user?.address || "",
    city: user?.city || "",
    userType: user?.userType || "",
    description: user?.description || "",
    phone: user?.phone || "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const [imgUrl, setImgUrl] = useState(user?.profilePicture);
  const imgRef = useRef(null);

  const handleFormSubmit = (e) => {
    dispatch(reset());
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("gender", formData.gender);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("userType", formData.userType);
    data.append("description", formData.description);
    data.append("phone", formData.phone);

    if (imgRef.current.files[0]) {
      data.append("profilePicture", imgRef.current.files[0]);
    } else {
      data.append("profilePicture", imgUrl);
    }

    dispatch(updateProfile(data)).then(() => {
      if (isSuccess) {
        toast.success(message || "User profile updated successfully.", {
          autoClose: 500,
        });
      }
      if (isError) {
        toast.error(message, { autoClose: 500 });
      }
    });

    setImgUrl(null);
    dispatch(getCurrentUser());
    dispatch(reset());
  };

  return (
    <div className="p-4 w-100 bg-dark text-light rounded">
      <h2 className="text-white fw-bold fs-4 border-bottom border-secondary pb-3 mb-4">
        Account Settings
      </h2>

      <form onSubmit={handleFormSubmit}>
        {/* Profile Picture Upload */}
        <div
          className="position-relative overflow-hidden w-auto h-auto rounded-lg mb-3"
          onClick={() => imgRef.current.click()}
        >
          <img
            src={imgUrl || user?.profilePicture}
            alt="Upload"
            className="w-100 object-contain"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-75 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition">
            <p className="text-white fw-bold">Change Profile Picture</p>
          </div>
        </div>

        <input
          type="file"
          className="d-none"
          onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
          ref={imgRef}
        />

        {/* Form Fields */}
        <div className="row row-cols-1 row-cols-lg-3 g-3">
          <div className="col">
            <input
              type="text"
              className="form-control bg-secondary text-white p-3"
              placeholder="Full Name"
              value={formData.fullName}
              name="fullName"
              required
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control bg-secondary text-white p-3"
              placeholder="Email"
              value={formData.email}
              name="email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="col">
            <select
              className="form-select bg-secondary text-white p-3"
              value={formData.gender}
              name="gender"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-lg-2 g-3 mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control bg-secondary text-white p-3"
              placeholder="Address"
              value={formData.address}
              name="address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control bg-secondary text-white p-3"
              placeholder="City"
              value={formData.city}
              name="city"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-3">
          <input
            type="number"
            className="form-control bg-secondary text-white p-3"
            placeholder="Phone Number"
            value={formData.phone}
            name="phone"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        <div className="mt-3">
          <select
            className="form-select bg-secondary text-white p-3"
            value={formData.userType}
            name="userType"
            onChange={(e) =>
              setFormData({ ...formData, userType: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div className="mt-3">
          <textarea
            className="form-control bg-secondary text-white p-3"
            rows="3"
            placeholder="Description"
            value={formData.description}
            name="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary w-25"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;
