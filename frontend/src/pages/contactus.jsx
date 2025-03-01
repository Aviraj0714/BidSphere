import { Link } from "react-router-dom";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_qvbrhqd", "template_llfzueg", form.current, {
        publicKey: "e2FbflmSwNqyMF6op",
      })
      .then(
        () => {
          toast.success("Email Sent Successfully.", {
            autoClose: 1000,
          });

          // Clear input fields
          form.current.reset();
        },
        () => {
          toast.error("Error Sending Email.");
        }
      );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="d-flex flex-column align-items-center justify-content-center text-white text-center py-5 bg-dark">
        <h1 className="fw-bold">Contact Us</h1>
        <div className="d-flex gap-2">
          <Link to="/" className="text-decoration-none text-light">Home</Link>
          <span>/</span>
          <span className="text-primary">Contact Us</span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Address */}
          <div className="col-md-4">
            <div className="card bg-dark text-white text-center p-4 border border-secondary">
              <div className="bg-primary rounded-circle p-3 mx-auto">
                <IoLocationOutline size={38} />
              </div>
              <h2 className="mt-3 fw-bold">Address</h2>
              <p>Mandi Bahauddin, Punjab, Pakistan</p>
            </div>
          </div>

          {/* Call Us */}
          <div className="col-md-4">
            <div className="card bg-dark text-white text-center p-4 border border-secondary">
              <div className="bg-primary rounded-circle p-3 mx-auto">
                <IoCallOutline size={38} />
              </div>
              <h2 className="mt-3 fw-bold">Call Us</h2>
              <p>+92 3414544858</p>
            </div>
          </div>

          {/* Email Us */}
          <div className="col-md-4">
            <div className="card bg-dark text-white text-center p-4 border border-secondary">
              <div className="bg-primary rounded-circle p-3 mx-auto">
                <IoMailOutline size={38} />
              </div>
              <h2 className="mt-3 fw-bold">Email Us</h2>
              <p>arkoodapk@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-dark text-white p-5 rounded mt-5">
          <h2 className="fw-bold mb-4">Contact Form</h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <input type="text" name="from_name" className="form-control" placeholder="Full Name" required />
            </div>
            <input type="text" value="Yasir" className="d-none" name="to_name" />
            <div className="mb-3">
              <input type="email" name="user_email" className="form-control" placeholder="Email" required />
            </div>
            <div className="mb-3">
              <textarea name="message" className="form-control" rows="5" placeholder="Write your Message" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
