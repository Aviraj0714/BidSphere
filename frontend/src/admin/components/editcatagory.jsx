import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCategory, reset, updateCategory } from "../../store/category/categorySlice.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleCategory, isLoading } = useSelector((state) => state.category);
  const [singleCategoryData, setSingleCategoryData] = useState(singleCategory);
  const [imgUrl, setImgUrl] = useState(singleCategory?.imageUrl || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    dispatch(getSingleCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleCategory) {
      setSingleCategoryData(singleCategory);
    }
  }, [singleCategory]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (singleCategoryData) {
      setFormData({
        name: singleCategoryData?.name || "",
        description: singleCategoryData?.description || "",
      });
      setImgUrl(singleCategoryData?.imageUrl || "");
    }
  }, [singleCategoryData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgUrl(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleProductUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);

    if (selectedFile) {
      data.append("image", selectedFile);
    } else {
      data.append("imageUrl", imgUrl);
    }

    dispatch(updateCategory({ data: data, id: id }));
    toast.success("Category updated successfully");
    dispatch(reset());
  };

  return (
    <div className="container mt-5">
      <form className="row g-4" onSubmit={handleProductUpload}>
        <div className="col-md-4">
          <h2 className="mb-3">Edit Category</h2>

          {imgUrl ? (
            <div className="position-relative" onClick={() => imgRef.current.click()}>
              <img
                src={imgUrl}
                alt="upload img"
                className="img-fluid rounded border p-2"
                style={{ width: "100%", height: "250px", objectFit: "contain" }}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white fw-bold opacity-0 hover-opacity-100">
                Click to edit image
              </div>
            </div>
          ) : (
            <div
              className="border border-dashed rounded d-flex align-items-center justify-content-center p-4"
              style={{ height: "250px", cursor: "pointer" }}
              onClick={() => imgRef.current.click()}
            >
              <p className="text-muted">Click to upload</p>
            </div>
          )}

          <input type="file" className="d-none" onChange={handleFileChange} ref={imgRef} />
        </div>

        <div className="col-md-8">
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">
              Category Name
            </label>
            <input
              required
              id="product_name"
              type="text"
              className="form-control"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              value={formData.name}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              required
              id="description"
              rows="5"
              className="form-control"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              value={formData.description}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
