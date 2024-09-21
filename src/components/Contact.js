import React, { useContext, useState } from "react";
import ServiceContext from "../context/services/ServiceContext";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate()
  const context = useContext(ServiceContext)
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // function when input changes
  const onChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // handle form when submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    context.contact(data.name, data.email, data.subject, data.message)
    setData({ name: "", email: "", subject: "", message: "" });
    navigate("/")
    context.showAlert('success', 'Successully Sent')
  };
  return (
    <div>
      <div className="container mt-5">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              onChange={onChange}
              value={data.name}
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              onChange={onChange}
              value={data.email}
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              onChange={onChange}
              type="text"
              value={data.subject}
              className="form-control"
              id="subject"
              name="subject"
              placeholder="Enter your email subject"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              onChange={onChange}
              value={data.message}
              className="form-control"
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
