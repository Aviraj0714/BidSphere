import { Link } from "react-router-dom";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import aboutimg from "../assets/aboutus.png";
import dev1 from "../assets/dev1.jpg";

import CreateEarnHome from "../components/home/createearn";

const AboutUs = () => {
  const devs = [
    {
      id: 1,
      src: dev1,
      name: "Aviraj Bhaliya",
      skill: "Frontend Developer",
      link1: "https://www.linkedin.com/",
      link2: "https://github.com/Aviraj0714",
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="d-flex flex-column align-items-center justify-content-center text-white text-center py-5 bg-dark">
        <h1 className="fw-bold">About Us</h1>
        <div className="d-flex gap-2">
          <Link to="/" className="text-decoration-none text-light">Home</Link>
          <span>/</span>
          <span className="text-primary">About Us</span>
        </div>
      </div>

      <div className="container py-5 text-white">
        {/* About Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 text-center">
            <img src={aboutimg} alt="About Us" className="img-fluid rounded" />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold text-black">Largest Marketplace To Collect, Buy And Sell Creative Digital Assets</h2>
            <p className="text-black">
              We are an online auction platform dedicated to creative digital assets. Artists, designers, and creators worldwide can buy and sell digital works in a dynamic bidding environment.
            </p>
            <p className="text-black">
              Need a stock video clip or a unique logo design? Our vast library includes fonts, graphics, 3D models, and more, ready to be discovered through exciting auctions.
            </p>
            <p className="text-black">
              Become a seller and showcase your talent! Auction your creations and connect with a global audience eager to fuel their projects with your innovation.
            </p>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="text-center mb-5">
          <h3 className="text-primary fw-bold">Our Team</h3>
          <h2 className="fw-bold text-black">Meet With Our Experts</h2>
        </div>

        <div className="row g-4">
          {devs.map(({ id, src, name, skill, link1, link2 }) => (
            <div key={id} className="col-md-4">
              <div className="card text-center bg-dark text-white border border-secondary">
                <img src={src} alt={name} className="card-img-top rounded-top" />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{skill}</p>
                  <div className="d-flex justify-content-center gap-3">
                    <a href={link2} target="_blank" className="btn btn-primary">
                      <FaGithub size={18} />
                    </a>
                    <a href={link1} target="_blank" className="btn btn-primary">
                      <FaLinkedinIn size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="text-center mt-5">
          <h3 className="text-primary fw-bold ">Process</h3>
          <h2 className="fw-bold text-black">Create And Sell <span className="text-primary">Your Products</span></h2>
        </div>

        <div className="row g-4 mt-4">
          {[
            { step: "01", title: "Setup your Account", desc: "Register for a free account and unlock the power to sell anything, anytime." },
            { step: "02", title: "Create Your Auction", desc: "Create a compelling listing that showcases your item and attracts potential buyers." },
            { step: "03", title: "Add Starting Price for Bid", desc: "Determine your starting bid and consider a reserve price for added control." },
            { step: "04", title: "List Product for Sale", desc: "Publish your Product and watch the bids come in, turning your unused items into revenue." }
          ].map(({ step, title, desc }) => (
            <div className="col-md-6 col-lg-3" key={step}>
              <div className="card bg-dark text-white border border-secondary p-4">
                <h2 className="fw-bold text-primary">{step}</h2>
                <h4 className="fw-bold">{title}</h4>
                <p className="text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <CreateEarnHome />
      </div>
    </>
  );
};

export default AboutUs;
