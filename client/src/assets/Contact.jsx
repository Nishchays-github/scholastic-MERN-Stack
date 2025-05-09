import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pic from "./Logo.svg";
import { Mail, User, MessageSquare, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_57myzxh",
        "template_0m5zosk",
        formRef.current,
        "Yjkl8ImWD30CMk0qH"
      )
      .then(
        (result) => {
          setSuccess(true);
          setLoading(false);
          formRef.current.reset();
          setTimeout(() => setSuccess(false), 4000);
        },
        (error) => {
          console.error(error.text);
          setLoading(false);
        }
      );
  };

  return (
    <div className="w-full scroll-smooth font-sans">
      {/* Header */}
      <Header User={User} />


      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-14"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have questions, feedback, or partnership inquiries, reach out below.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <motion.form
              ref={formRef}
              onSubmit={sendEmail}
              className="bg-purple-50 p-6 md:p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-700 text-center">
                Send a Message
              </h2>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-purple-500" size={18} />
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-purple-500" size={18} />
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 text-purple-500" size={18} />
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                {loading ? "Sending..." : "Submit"}
              </motion.button>

              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-green-600 text-center"
                >
                  Message sent successfully!
                </motion.p>
              )}
            </motion.form>

            {/* Contact Info */}
            <motion.div
              className="p-6 md:p-8 rounded-lg bg-gray-50 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-700 text-center">
                Contact Information
              </h2>
              
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-purple-600" />
                  <a href="mailto:brijeshpalsingh2002@gmail.com" className="hover:underline">
                    brijeshpalsingh2002@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-purple-600" />
                  <a href="tel:+919057887244" className="hover:underline">
                    +91 9057887244
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-purple-600" />
                  <a
                    href="https://maps.google.com/?q=Bhambu+PG,Jaipur,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Jaipur, India
                  </a>
                </li>
              </ul>

              {/* Embedded Map */}
              <h3 className="mt-8 text-lg font-semibold text-purple-700">
                Our Location
              </h3>
              <div className="mt-4 w-full h-48 md:h-64 rounded-lg overflow-hidden">
                <iframe
                  title="Google Maps Location"
                  width="100%"
                  height="100%"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.767054708469!2d75.86217031545602!3d26.82570898334434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9070007aac1%3A0x55f9fdcae9aaf0bb!2sBhambu%20PG!5e0!3m2!1sen!2sin!4v1678398777329!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Business Hours */}
              <h3 className="mt-6 md:mt-8 text-lg font-semibold text-purple-700">
                Business Hours
              </h3>
              <ul className="mt-2 space-y-1 text-gray-700">
                <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                <li>Saturday: 10:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>

              {/* Social Media */}
              <h3 className="mt-6 md:mt-8 text-lg font-semibold text-purple-700">
                Follow Us
              </h3>
              <div className="flex items-center gap-4 mt-3 text-purple-600 text-xl">
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" className="hover:text-purple-700"><FaFacebook /></a>
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" className="hover:text-purple-700"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" className="hover:text-purple-700"><FaLinkedin /></a>
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" className="hover:text-purple-700"><FaTwitter /></a>
              </div>

              {/* Live Chat Button */}
              {/* <div className="mt-8 text-center">
                <a 
                  href="https://app.chitchat.gg/chat/new/681646b7c7f00720794fc4ee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                    Chat with Us
                  </button>
                </a>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Contact;