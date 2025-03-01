import { useDispatch, useSelector } from "react-redux";
// import SingleAuction from "../SingleAuction";
import { getUpcomingAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";

const UpcomingHome = () => {
  const dispatch = useDispatch();

  // Ensure upComingAuctions is always an array
  const upComingAuctions = useSelector((state) => state.auction.upComingAuctions) || [];

  const [upComingAuctionsData, setUpComingAuctionsData] = useState([]);

  // Fetch auctions only once when component mounts
  useEffect(() => {
    dispatch(getUpcomingAuctions());
  }, [dispatch]);

  // Update state only when upComingAuctions changes
  useEffect(() => {
    if (JSON.stringify(upComingAuctions) !== JSON.stringify(upComingAuctionsData)) {
      setUpComingAuctionsData(upComingAuctions);
    }
  }, [upComingAuctions]); // ✅ Ensures unnecessary updates don’t trigger re-renders

  return (
    <div className="mb-4">
      <h2 className="h4 fw-bold text-light text-black mb-3">Upcoming Auctions</h2>

      {upComingAuctionsData.length > 0 ? (
        <swiper-container
          breakpoints={JSON.stringify({
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          })}
          style={{ "--swiper-navigation-color": "#00A3FF" }}
          navigation="true"
          slides-per-view="1"
          space-between="16"
        >
          {upComingAuctionsData.map((item) => (
            <swiper-slide key={item._id}>
              <SingleAuction
                name={item?.name}
                startingPrice={item?.startingPrice}
                image={item?.image}
                endTime={item?.endTime}
                startTime={item?.startTime}
                id={item?._id}
                status={item.status}
                sellerImage={item?.seller?.profilePicture}
                sellerName={item?.seller?.fullName}
                sellerId={item?.sellerId}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      ) : (
        <p className="text-light text-black">No upcoming auctions available.</p>
      )}
    </div>
  );
};

export default UpcomingHome;
