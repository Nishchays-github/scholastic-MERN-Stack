import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your message has been submitted!");
    setFormData({ fullName: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-600">Get in Touch</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-gray-700 hover:text-red-500 transition-transform transform hover:scale-110"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
          >
            Submit
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-6 text-center text-gray-600">
          <p className="font-bold text-black">Other Contact Info:</p>
          <address className="mt-2">
            <p>Address: SKIT, Jaipur, 302017</p>
            <p>
              Phone:{" "}
              <a href="tel:+919057887244" className="text-blue-500 hover:underline">
                +91 9057887244
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:brijeshpalsingh2002@gmail.com" className="text-blue-500 hover:underline">
                brijeshpalsingh2002@gmail.com
              </a>
            </p>
          </address>
        </div>
      </div>
    </div>
  );
};

export default Contact;
