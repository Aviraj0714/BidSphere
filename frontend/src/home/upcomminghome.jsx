import { useDispatch, useSelector } from "react-redux";
import SingleAuction from "../SingleAuction";
import { getUpcomingAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";

const UpcomingHome = () => {
  const dispatch = useDispatch();
  const { upComingAuctions = [] } = useSelector((state) => state.auction);
  const [upComingAuctionsData, setUpComingAuctionsData] = useState([]);

  useEffect(() => {
    dispatch(getUpcomingAuctions());
  }, [dispatch]);

  useEffect(() => {
    setUpComingAuctionsData(upComingAuctions);
  }, [upComingAuctions]);

  return (
    <div className="mb-4">
      <h2 className="h4 fw-bold text-light mb-3">Upcoming Auctions</h2>

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
        <p className="text-light">No upcoming auctions available.</p>
      )}
    </div>
  );
};

export default UpcomingHome;
