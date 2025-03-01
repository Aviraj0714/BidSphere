import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleAuctionById,
  reset,
  updateSingleAuction,
} from "../../store/auction/auctionSlice.js";
import { getAllCategories } from "../../store/category/categorySlice.js";
import { getAllCities } from "../../store/city/citySlice.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const EditAuction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleAuction } = useSelector((state) => state.auction);
  const [singleAuctionData, setSingleAuctionData] = useState(singleAuction);
  const [imgUrl, setImgUrl] = useState(singleAuction?.image || "");
  const imgRef = useRef(null);
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(getSingleAuctionById(id));
  }, [id]);

  useEffect(() => {
    if (singleAuction) {
      setSingleAuctionData(singleAuction);
    }
  }, [singleAuction]);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    category: "",
    location: "",
    startingPrice: 0,
  });

  useEffect(() => {
    setFormData({
      name: singleAuctionData?.name || "",
      description: singleAuctionData?.description || "",
      startTime: singleAuctionData?.startTime
        ? new Date(singleAuctionData?.startTime).toISOString().slice(0, 16)
        : "",
      endTime: singleAuctionData?.endTime
        ? new Date(singleAuctionData?.endTime).toISOString().slice(0, 16)
        : "",
      category: singleAuctionData?.category?._id || "",
      location: singleAuctionData?.location?._id || "",
      startingPrice: parseFloat(singleAuctionData?.startingPrice) || 0,
    });
    setImgUrl(singleAuctionData?.image || "");
  }, [singleAuctionData]);

  const handleProductUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("startingPrice", formData.startingPrice);
    data.append("category", formData.category);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("location", formData.location);
    data.append("description", formData.description);

    if (imgRef.current.files[0]) {
      data.append("image", imgRef.current.files[0]);
    } else {
      data.append("image", imgUrl);
    }

    dispatch(updateSingleAuction({ data: data, id: id }));
    dispatch(reset());
  };

  return (
    <div className="container mt-4">
      <form className="row justify-content-center" onSubmit={handleProductUpload}>
        {/* Image Upload Section */}
        <div className="col-md-4 text-center">
          <h2 className="mb-3">Upload Image</h2>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="upload"
              className="img-fluid border rounded mb-3"
              style={{ cursor: "pointer", maxHeight: "250px" }}
              onClick={() => imgRef.current.click()}
            />
          ) : (
            <div
              className="border border-secondary rounded p-4 d-flex align-items-center justify-content-center"
              style={{ height: "250px", cursor: "pointer" }}
              onClick={() => imgRef.current.click()}
            >
              <p className="text-muted">Click to upload</p>
            </div>
          )}
          <input type="file" className="d-none" onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))} ref={imgRef} />
        </div>

        {/* Form Section */}
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Edit Auction</h2>
            
            {/* Product Name */}
            <div className="mb-3">
              <label htmlFor="product_name" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="product_name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Category Selection */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                className="form-select"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.data &&
                  categories.data.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Date Inputs */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="start_time" className="form-label">Start Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="start_time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="end_time" className="form-label">End Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="end_time"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>

            {/* Price and Location */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="starting_price" className="form-label">Starting Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="starting_price"
                  required
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="location" className="form-label">Area</label>
                <select
                  id="location"
                  className="form-select"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  {cities.data &&
                    cities.data.map((location) => (
                      <option key={location._id} value={location._id}>
                        {location.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAuction;
