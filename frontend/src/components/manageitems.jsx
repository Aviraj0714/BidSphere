import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteSingleAuctionById,
  getSellerAuction,
} from "../store/auction/auctionSlice";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Pagination from "./Pagination";

const ManageItems = () => {
  const dispatch = useDispatch();
  const { sellerAuction, isLoading } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getSellerAuction());
  }, [dispatch]);

  const handleDeleteAuction = async (id) => {
    await dispatch(deleteSingleAuctionById(id)).then(() => {
      toast.success("Item deleted.", { autoClose: 500 });
    });
    dispatch(getSellerAuction());
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sellerAuction?.auctions?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const nextPage = () => setCurrentPage(currentPage + 1);

  return (
    <div className="overflow-auto p-4 w-100 bg-dark text-light rounded">
      <h2 className="text-light font-weight-bold border-bottom pb-3 mb-4">
        Manage Items
      </h2>
      <div className="overflow-auto p-4 bg-secondary rounded border border-secondary">
        <table className="table table-dark table-striped table-hover text-left">
          <thead>
            <tr className="bg-primary text-white">
              <th className="rounded-left">Product</th>
              <th>Category</th>
              <th>Bids</th>
              <th>Status</th>
              <th>Your Bid</th>
              <th>Winner</th>
              <th className="rounded-right">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {sellerAuction?.auctions?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-5">No Items</td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <Loading width="sidebar" />
                </td>
              </tr>
            ) : (
              currentItems?.map((auction) => (
                <tr key={auction?._id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={auction?.image}
                        alt="Auction"
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                      <span>{auction?.name}</span>
                    </div>
                  </td>
                  <td>{auction?.category?.name || "---"}</td>
                  <td>{auction?.bids?.length}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {auction?.status}
                    </span>
                  </td>
                  <td>{auction?.startingPrice}</td>
                  <td>{auction?.winner?.bidder?.fullName || "----"}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary me-2"
                      to={`/single-auction-detail/${auction?._id}`}
                    >
                      <FaEye size={16} />
                    </Link>
                    {auction?.status === "upcoming" && (
                      <Link
                        className="btn btn-outline-primary me-2"
                        to={`/edit-auction/${auction?._id}`}
                      >
                        <FaRegEdit size={16} />
                      </Link>
                    )}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteAuction(auction?._id)}
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {sellerAuction?.auctions?.length > 0 && (
        <Pagination
          totalPosts={sellerAuction?.auctions?.length}
          postsPerPage={itemsPerPage}
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
};

export default ManageItems;
