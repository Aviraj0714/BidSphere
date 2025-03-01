import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import {
  updateAuctionStatus,
  selectAuctionWinner,
  reset,
} from "../store/auction/auctionSlice";

const CountDownTimer = (props) => {
  const currentTime = new Date().getTime();
  const startTime = new Date(props.startTime).getTime();
  const endTime = new Date(props.endTime).getTime();
  const dispatch = useDispatch();
  
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (!auctionStarted && currentTime >= startTime && currentTime < endTime) {
        setAuctionStarted(true);
      }
      if (auctionStarted && currentTime >= endTime && !auctionEnded) {
        setAuctionEnded(true);

        dispatch(selectAuctionWinner({ id: props?.id }));
        dispatch(reset());
        props?.Winner();
        setAuctionStarted(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionStarted, auctionEnded, dispatch, startTime, endTime, props?.id]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="text-danger fw-bold">Auction Ended!</span>
      );
    } else if (currentTime < startTime) {
      return (
        <span className="text-secondary">
          Auction starts at <strong>{new Date(startTime).toLocaleString()}</strong>
        </span>
      );
    } else {
      return (
        <span className="text-success fw-bold">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="text-center">
      <Countdown date={endTime} renderer={renderer} />
    </div>
  );
};

export default CountDownTimer;
