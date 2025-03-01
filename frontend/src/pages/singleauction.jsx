import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleAuctionById } from "../store/auction/auctionSlice";
import CountDownTimer from "../components/countdown";
import BidCard from "../components/bidcard";
import { placeABid } from "../store/bid/bidSlice";
import { toast } from "react-toastify";
import { sendNewBidNotification } from "../store/notification/notificationSlice";
import socket from "../socket";
import { getAllBidsForAuction } from "../store/bid/bidSlice";
import Loading from "../components/loading";

import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

const SingleAuctionDetail = () => {
  const [newBidAmount, setNewBidAmount] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { singleAuction } = useSelector((state) => state.auction);
  const { bids } = useSelector((state) => state.bid);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [auctionWinnerDetailData, setAuctionWinnerDetailData] = useState();
  const [bidsData, setBidsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const logInUser = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getSingleAuctionById(params.id)).then(() => setIsLoading(false));
    dispatch(getAllBidsForAuction(params.id));
  }, [params.id]);

  useEffect(() => {
    const checkAuctionStart = setInterval(() => {
      const currentTime = Date.now();
      const auctionStartTime = new Date(singleAuction?.startTime).getTime();
      const auctionEndTime = new Date(singleAuction?.endTime).getTime();

      if (currentTime >= auctionStartTime && currentTime <= auctionEndTime) {
        setAuctionStarted(true);
        clearInterval(checkAuctionStart);
      }
    }, 1000);

    return () => clearInterval(checkAuctionStart);
  }, [singleAuction?.startTime]);

  useEffect(() => {
    setBidsData(bids);
  }, [bids]);

  useEffect(() => {
    socket.emit("joinAuction", logInUser?._id);

    socket.on("winnerSelected", (data) => {
      setAuctionStarted(false);
      setAuctionWinnerDetailData(data);
    });

    socket.on("newBidData", (data) => {
      setBidsData((prevBids) => [
        {
          _id: Date.now(),
          bidder: { fullName: data.fullName, profilePicture: data.profilePicture },
          bidAmount: data.bidAmount,
          bidTime: data.bidTime,
          auction: data.auctionId,
        },
        ...prevBids,
      ]);
    });

    return () => {
      socket.off("winnerSelected");
      socket.off("newBidData");
    };
  }, []);

  const placeBidHandle = async (e) => {
    e.preventDefault();

    if (!user?.paymentVerified) {
      return toast.info("Please verify your payment method to place a bid.");
    }

    const bidAmount = Math.floor(newBidAmount);
    if (bidAmount <= singleAuction?.startingPrice) {
      return toast.info("Bid amount should be greater than the current bid.");
    }

    if (singleAuction?.endTime < Date.now() / 1000) {
      return toast.info("Auction time is over.");
    }

    dispatch(placeABid({ id: params.id, amount: bidAmount }));
    setNewBidAmount("");

    socket.emit("newBid", {
      profilePicture: logInUser?.profilePicture,
      fullName: logInUser?.fullName,
      bidAmount,
      bidTime: Date.now(),
      auctionId: params.id,
    });

    dispatch(sendNewBidNotification({ auctionId: params.id, type: "BID_PLACED", newBidAmount }));
  };

  if (isLoading) return <Loading />;

  const isAuctionOver = singleAuction?.status === "over" || auctionWinnerDetailData;
  const isSeller = singleAuction?.seller?._id === logInUser?._id;
  const bidDisabled = isSeller || !auctionStarted || newBidAmount <= singleAuction?.startingPrice;

  return (
    <Container className="py-5">
      <Row className="gy-4">
        <Col md={6}>
          <img className="img-fluid rounded" src={singleAuction?.image} alt="product" />
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow">
            <h2 className="text-dark">{singleAuction?.name}</h2>
            <hr />

            <div className="mb-3">
              <h5>Description</h5>
              <p>{singleAuction?.description}</p>
            </div>

            <div className="mb-3">
              <h5>{bidsData.length ? "Current Bid" : "Starting Price"}</h5>
              <p className="fw-bold">${singleAuction?.startingPrice}</p>
            </div>

            <CountDownTimer startTime={singleAuction?.startTime} endTime={singleAuction?.endTime} />

            <div className="mt-4">
              <h5>Bids</h5>
              <div className="overflow-auto" style={{ maxHeight: "200px" }}>
                {bidsData.length ? bidsData.map((bid) => <BidCard key={bid._id} bid={bid} />) : <p>No bids yet</p>}
              </div>
            </div>

            {!isAuctionOver && auctionStarted && (
              <Form onSubmit={placeBidHandle} className="mt-3">
                <Row className="g-2">
                  <Col xs={8}>
                    <Form.Control
                      type="number"
                      placeholder="Enter your bid"
                      value={newBidAmount}
                      onChange={(e) => setNewBidAmount(e.target.value)}
                      required
                    />
                  </Col>
                  <Col xs={4}>
                    <Button type="submit" variant="primary" disabled={bidDisabled} className="w-100">
                      Place Bid
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleAuctionDetail;
