import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";
import axios from "axios";

const SearchLocationCategory = () => {
  const [filter, setFilter] = useState({
    location: "",
    category: "",
    itemName: "",
  });

  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, [dispatch]);

  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=318f69a969db4f7599b7fbb5043e444e`
              );

              if (response.data?.results?.[0]) {
                let district = response.data.results[0].components.district;
                district = district?.slice(0, -8)?.trim();
                setCity(district);
              }
            } catch (error) {
              console.error("Error getting city name:", error);
            }
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true }
        );
      }
    };

    fetchLocation();
  }, []);

  const SearchByFilter = useCallback(() => {
    dispatch(getAllAuctions(filter));
  }, [dispatch, filter]);

  return (
    <div className="container mt-4">
      <div className="row g-2 p-3 bg-dark text-light rounded">
        {/* Location Dropdown */}
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          >
            <option value="">Select Location</option>
            {city && <option value={city}>Current Location</option>}
            {cities.data &&
              cities.data.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.data &&
              categories.data.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Name"
            value={filter.itemName}
            onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
          />
        </div>

        {/* Search Button */}
        <div className="col-md-3 d-grid">
          <button className="btn btn-primary" onClick={SearchByFilter}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchLocationCategory;
