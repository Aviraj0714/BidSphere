import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAuctionById, reset, updateSingleAuction } from "../store/auction/auctionSlice.js";
import { getAllCategories } from "../store/category/categorySlice.js";
import { getAllCities } from "../store/city/citySlice.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button, Alert, Image } from "react-bootstrap";

const EditAuction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const { singleAuction, isLoading, message, isError, isSuccess } = useSelector((state) => state.auction);
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    category: "",
    location: "",
    startingPrice: 0,
    imgUrl: "",
  });

  useEffect(() => {
    dispatch(getSingleAuctionById(id));
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, [id]);

  useEffect(() => {
    if (singleAuction) {
      setFormData({
        name: singleAuction?.name || "",
        description: singleAuction?.description || "",
        startTime: singleAuction?.startTime ? new Date(singleAuction.startTime).toISOString().slice(0, 16) : "",
        endTime: singleAuction?.endTime ? new Date(singleAuction.endTime).toISOString().slice(0, 16) : "",
        category: singleAuction?.category?._id || "",
        location: singleAuction?.location?._id || "",
        startingPrice: parseFloat(singleAuction?.startingPrice) || 0,
        imgUrl: singleAuction?.image || "",
      });
    }
  }, [singleAuction]);

  useEffect(() => {
    if (isError) {
      toast.error(message, { autoClose: 500 });
    } else if (isSuccess) {
      toast.success("Auction updated successfully", { autoClose: 500 });
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

    if (imgRef.current.files[0]) {
      data.append("image", imgRef.current.files[0]);
    } else if (singleAuction?.image) {
      data.append("image", singleAuction.image);
    }

    dispatch(updateSingleAuction({ data, id }));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Edit Auction</h2>
          {isLoading && <Alert variant="info">Loading...</Alert>}
          <Form onSubmit={handleProductUpload}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="" disabled>Select Category</option>
                {categories?.data?.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Starting Price</Form.Label>
              <Form.Control type="number" required value={formData.startingPrice} onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local" required value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="datetime-local" required value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Select required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}>
                <option value="" disabled>Select Location</option>
                {cities?.data?.map((city) => (
                  <option key={city._id} value={city._id}>{city.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Form.Group>

            <Form.Group className="mt-3 text-center">
              {formData.imgUrl && <Image src={formData.imgUrl} className="mb-3" fluid rounded />}
              <Form.Control type="file" ref={imgRef} onChange={(e) => setFormData({ ...formData, imgUrl: URL.createObjectURL(e.target.files[0]) })} />
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">Update</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAuction;
