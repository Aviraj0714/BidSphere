import React from "react";

const ProcessHome = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-light fw-medium mb-4">
        Create And Sell <span className="text-primary">Your Products</span>
      </h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {[
          {
            number: "01",
            title: "Setup your Account",
            description:
              "Register for a free account and unlock the power to sell anything, anytime.",
          },
          {
            number: "02",
            title: "Create Your Auction",
            description:
              "Create a compelling listing that showcases your item and attracts potential buyers.",
          },
          {
            number: "03",
            title: "Add Starting Price for Bid",
            description:
              "Determine your starting bid and consider a reserve price for added control.",
          },
          {
            number: "04",
            title: "List Product for Sale",
            description:
              "Publish your Product and watch the bids come in, turning your unused items into revenue.",
          },
        ].map((step, index) => (
          <div className="col" key={index}>
            <div className="card text-light bg-dark p-4 rounded-3 border-0">
              <h2 className="display-4 fw-bold text-muted">{step.number}</h2>
              <h3 className="fs-4 fw-bold">{step.title}</h3>
              <p className="text-secondary">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessHome;
