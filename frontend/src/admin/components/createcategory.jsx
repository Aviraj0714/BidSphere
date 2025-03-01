import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { createCategory, reset } from "../../store/category/categorySlice";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef(null);
  const navigate = useNavigate();

  const { isSuccess, isError, message } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleProductUpload = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);

    if (!imgRef.current.files[0]) {
      return alert("Image is required");
    } else if (imgRef.current.files[0].size > 1024 * 1024) {
      return alert("Image size should be less than 1MB");
    } else {
      data.append("image", imgRef.current.files[0]);
    }

    dispatch(createCategory(data));
  };

  // Handle success or error messages
  useEffect(() => {
    if (isSuccess) {
      toast.success("Category created successfully");
      dispatch(reset());
      navigate("/admin/categories");
    }
    if (isError) {
      toast.error(message || "Something went wrong");
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch, navigate]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Create Category</h2>
            <form onSubmit={handleProductUpload}>
              <div className="row">
                {/* Image Upload Section */}
                <div className="col-md-4 text-center">
                  <h5>Upload Image</h5>
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt="upload"
                      className="img-fluid border rounded"
                      onClick={() => imgRef.current.click()}
                      style={{ cursor: "pointer", maxHeight: "200px" }}
                    />
                  ) : (
                    <div
                      className="border border-secondary rounded d-flex flex-column align-items-center justify-content-center p-4"
                      style={{ height: "200px", cursor: "pointer" }}
                      onClick={() => imgRef.current.click()}
                    >
                      <IoCloudUploadOutline size={50} className="text-primary" />
                      <p className="mt-2">Click to Upload</p>
                      <small className="text-muted">PNG, JPG, JPEG | Max Size 1MB</small>
                    </div>
                  )}
                  <input
                    type="file"
                    className="d-none"
                    onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
                    ref={imgRef}
                    accept=".png, .jpg, .jpeg"
                  />
                </div>

                {/* Form Inputs */}
                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="category_name" className="form-label">
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category_name"
                      placeholder="Enter category name"
                      required
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      value={formData.name}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="5"
                      placeholder="Describe the category"
                      required
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      value={formData.description}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
