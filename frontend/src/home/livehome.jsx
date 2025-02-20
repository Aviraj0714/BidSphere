import SingleAuction from "../SingleAuction";
import { useSelector, useDispatch } from "react-redux";
import { getLiveAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";

const LiveHome = ({ onlyAuction }) => {
  const dispatch = useDispatch();
  const { liveAuctions } = useSelector((state) => state.auction);
  const [liveAuctionsData, setLiveAuctionsData] = useState([]);

  useEffect(() => {
    dispatch(getLiveAuctions());
  }, [dispatch]);

  useEffect(() => {
    setLiveAuctionsData(liveAuctions);
  }, [liveAuctions]);

  return (
    <div id="livehome">
      <div className="d-flex align-items-center gap-2 mb-3">
        {!onlyAuction && (
          <>
            <div className="position-relative">
              <span className="position-absolute start-0 top-0 translate-middle p-1 bg-primary rounded-circle"></span>
              <span className="position-relative d-inline-block p-1 bg-primary rounded-circle"></span>
            </div>
            <h2 className="h4 fw-bold text-light">Live Auctions</h2>
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
        <p className="text-light">No live auctions available.</p>
      )}
    </div>
  );
};

export default LiveHome;
