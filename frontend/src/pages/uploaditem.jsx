import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAuction, reset } from "../store/auction/auctionSlice";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";
import { toast } from "react-toastify";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const UploadItem = () => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef(null);
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const { isSuccess, isError, message } = useSelector((state) => state.auction);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    startTime: "",
    endTime: "",
    location: "",
    startingPrice: "",
    description: "",
  });

  useEffect(() => {
    dispatch(reset());

    if (isError) {
      toast.error(message, { autoClose: 500 });
      dispatch(reset());
    } else if (isSuccess && isError === undefined) {
      toast.success(message, { autoClose: 500 });
      dispatch(reset());

      setFormData({
        name: "",
        category: "",
        startTime: "",
        endTime: "",
        location: "",
        startingPrice: "",
        description: "",
      });
      setImgUrl("");
    }
    dispatch(reset());
  }, [isSuccess, isError]);

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

    if (!imgRef.current.files[0]) {
      return alert("Image is required");
    } else if (imgRef.current.files[0].size > 1024 * 1024) {
      return alert("Image size should be less than 1MB");
    } else {
      data.append("image", imgRef.current.files[0]);
    }

    dispatch(createAuction(data));
    dispatch(reset());
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow">
            <h2 className="text-center mb-4">Upload Item</h2>
            <Form onSubmit={handleProductUpload}>
              {/* Image Upload */}
              <div className="text-center mb-3">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt="Uploaded"
                    onClick={() => imgRef.current.click()}
                    className="img-fluid rounded border p-2 cursor-pointer"
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                  />
                ) : (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center border border-secondary rounded p-4"
                    style={{ height: "200px", cursor: "pointer" }}
                    onClick={() => imgRef.current.click()}
                  >
                    <IoCloudUploadOutline size={50} className="text-primary mb-2" />
                    <p>Click to Upload</p>
                    <small className="text-muted">PNG, JPG, JPEG | Max 1MB</small>
                  </div>
                )}

                <Form.Control
                  type="file"
                  className="d-none"
                  onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
                  ref={imgRef}
                  accept=".png, .jpg, .jpeg"
                />
              </div>

              {/* Product Name */}
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Modern Abstract Painting"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Form.Group>

              {/* Category Selection */}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.data &&
                    categories.data.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              {/* Start & End Time */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      required
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Starting Price & Location */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Starting Price</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Area</Form.Label>
                    <Form.Select
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    >
                      <option value="">Select Area</option>
                      {cities.data &&
                        cities.data.map((location) => (
                          <option key={location._id} value={location._id}>
                            {location.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Describe your product, art, etc."
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button type="submit" variant="primary" className="w-100">
                Upload
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadItem;
