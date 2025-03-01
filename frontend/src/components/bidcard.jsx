const BidCard = ({ bid }) => {
    return (
      <div className="d-flex align-items-center justify-content-between border border-secondary rounded-pill py-1 px-2 px-md-4 mt-2 w-100 w-md-75">
        {/* Left Section (Profile Image & Details) */}
        <div className="d-flex align-items-center gap-3 gap-sm-4 text-white">
          <img
            src={bid?.bidder?.profilePicture}
            alt="Bidder Profile"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="d-flex flex-column">
            <span className="fw-semibold">{bid?.bidder?.fullName}</span>
            <span className="small text-secondary">
              {new Date(bid?.bidTime).toLocaleDateString()}{" "}
              {new Date(bid?.bidTime).toLocaleTimeString()}
            </span>
          </div>
        </div>
  
        {/* Right Section (Bid Amount) */}
        <div className="text-white">Bid Amount: ${bid?.bidAmount}</div>
      </div>
    );
  };
  
  export default BidCard;
  