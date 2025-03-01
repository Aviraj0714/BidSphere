import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleAuction from "../components/SingleAuction";
import SearchLocationCategory from "../components/searchlocation";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState([]);

  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );

  useEffect(() => {
    dispatch(getAllAuctions());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setAuctionData(auction);
    } else if (isError) {
      toast.error(message);
    }
  }, [auction, isError, isSuccess, message]);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = auctionData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="min-vh-100 w-100 bg-dark text-light">
      <div className="container">
        <SearchLocationCategory />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mt-4">
          <div className="row g-4">
            {auctionData &&
              currentItems.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                  <SingleAuction
                    name={item?.name}
                    startingPrice={item?.startingPrice}
                    image={item?.image}
                    endTime={item?.endTime}
                    startTime={item?.startTime}
                    id={item?._id}
                    status={item?.status}
                    sellerImage={item?.seller?.profilePicture}
                    sellerName={item?.seller?.fullName}
                    sellerId={item?.seller?._id}
                    bidLength={item?.bids?.length}
                    winnerFullName={item?.winner?.bidder?.fullName}
                    winnerProfilePicture={item?.winner?.bidder?.profilePicture}
                    winnerBidAmount={item?.winner?.bidAmount}
                    winnerBidTime={item?.winner?.bidTime}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {auctionData && auctionData.length !== 0 && (
        <div className="container my-4">
          <Pagination
            totalPosts={auctionData.length}
            postsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
