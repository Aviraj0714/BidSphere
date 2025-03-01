import { useSelector, useDispatch } from "react-redux";
import { getLiveAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";

const LiveHome = ({ onlyAuction }) => {
  const dispatch = useDispatch();

  // Ensure liveAuctions is always an array
  const liveAuctions = useSelector((state) => state.auction.liveAuctions) || [];

  const [liveAuctionsData, setLiveAuctionsData] = useState([]);

  // Fetch auctions only once when component mounts
  useEffect(() => {
    dispatch(getLiveAuctions());
  }, [dispatch]);

  // Update state only when liveAuctions changes
  useEffect(() => {
    if (JSON.stringify(liveAuctions) !== JSON.stringify(liveAuctionsData)) {
      setLiveAuctionsData(liveAuctions);
    }
  }, [liveAuctions]); // ✅ This ensures the state only updates if data actually changes

  return (
    <div id="livehome">
      <div className="d-flex align-items-center gap-2 mb-3">
        {!onlyAuction && (
          <>
            <div className="position-relative">
              <span className="position-absolute start-0 top-0 translate-middle p-1 bg-primary rounded-circle"></span>
              <span className="position-relative d-inline-block p-1 bg-primary rounded-circle"></span>
            </div>
            <h2 className="h4 fw-bold text-black text-light">Live Auctions</h2>
          </>
        )}
      </div>

      {liveAuctionsData.length > 0 ? (
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
          {liveAuctionsData.map((item) => (
            <swiper-slide key={item._id}>
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
                sellerId={item?.sellerId}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      ) : (
        <p className="text-light text-black">No live auctions available.</p>
      )}
    </div>
  );
};

export default LiveHome;
