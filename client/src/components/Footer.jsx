import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Pic from '../assets/Logo.svg'; // Adjust the path as needed

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-300 to-blue-300 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <Link to="/">
                <img src={Pic} alt="Scholastic Logo" className="h-12 md:h-16" />
              </Link>
              <span className="text-xl md:text-2xl font-semibold ml-2">Scholastic</span>
            </div>
            <p className="text-gray-800 max-w-md">
              Empowering parents with data-driven school choices since 2020.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-3">Contact Us</h4>
            <ul className="text-gray-800 space-y-2">
              <li>Email: <a href="mailto:brijeshpalsingh2002@gmail.com" className="hover:text-white">brijeshpalsingh2002@gmail.com</a></li>
              <li>Phone: <a href="tel:+919057887244" className="hover:text-white">+91 9057887244</a></li>
              <li className="flex items-center space-x-4 mt-2">
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin /></a>
                <a href="https://www.linkedin.com/in/brijesh-pal-singh-152b88269/" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-purple-400 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-800">
          <span className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Scholastic. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7 7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
