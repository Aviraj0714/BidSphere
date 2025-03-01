import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBidsAuctionsByUser } from "../store/bid/bidSlice";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Loading from "./Loading";
import Pagination from "./Pagination";

const BidsItem = () => {
  const dispatch = useDispatch();
  const { bids, isLoading } = useSelector((state) => state.bid);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBidsAuctionsByUser());
  }, []);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bids?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => (prev * itemsPerPage < bids.length ? prev + 1 : prev));

  return (
    <div className="overflow-auto p-4 p-md-5 bg-dark text-white rounded-3">
      <h2 className="text-white fw-bold fs-4 border-bottom pb-3 mb-4">Bids Items</h2>
      <div className="overflow-auto bg-secondary rounded-3 border border-light p-3">
        <table className="table table-hover text-start text-nowrap">
          <thead className="table-dark">
            <tr className="text-capitalize">
              <th className="rounded-start">Product</th>
              <th>Category</th>
              <th>Status</th>
              <th>Bid</th>
              <th>Your Bid</th>
              <th className="rounded-end text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <Loading width="sidebar" />
                </td>
              </tr>
            ) : bids?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-5">No Bids Made Yet.</td>
              </tr>
            ) : (
              currentItems?.map((bid) => (
                <tr key={bid?._id}>
                  <td className="rounded-start">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={bid?.auction?.image}
                        alt="Auction"
                        className="rounded-circle"
                        style={{ width: "50px", height: "50px" }}
                      />
                      <span>{bid?.auction?.name}</span>
                    </div>
                  </td>
                  <td>{bid?.auction?.category?.name}</td>
                  <td>
                    <span className="badge bg-info text-dark">{bid?.auction?.status}</span>
                  </td>
                  <td>${bid?.auction?.startingPrice}</td>
                  <td>${bid?.bidAmount}</td>
                  <td className="text-center rounded-end">
                    <Link
                      className="btn btn-outline-primary d-inline-flex align-items-center"
                      to={`/single-auction-detail/${bid?.auction?._id}`}
                    >
                      <FaEye size={20} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {bids?.length > 0 && (
          <Pagination
            totalPosts={bids?.length}
            postsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
      </div>
    </div>
  );
};

export default BidsItem;
