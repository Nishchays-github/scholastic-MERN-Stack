import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Pic from "../assets/Logo.svg";
import useAuthStore from "../useAuthstore.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { checkAuth, User } = useAuthStore();
  const location = useLocation();

  const toggleMoreMenu = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const leftNavItems = ["My Portfolio"]; // Items on the left
  const rightNavItems = ["Home", "Schools", "Contact", "discussion"]; // Items on the right

  return (
    <motion.header
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="bg-white shadow-md py-4 sticky top-0 z-50"
>

      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={Pic} alt="Logo" className="h-12 md:h-16" />
          </Link>
          
          {/* Left-aligned navigation items (desktop) */}
          <nav className="hidden md:flex md:space-x-6 md:items-center ml-6">
            {leftNavItems.map((item, index) => {
              const path = item === "My Portfolio" ? "/portfolio" : `/${item.toLowerCase().replace(/\s/g, "")}`;
              
              return (
                <Link
                  key={`left-${index}`}
                  to={path}
                  className={`relative group ${
                    location.pathname === path
                      ? "text-blue-500 font-bold text-2xl"
                      : "text-gray-700 hover:text-purple-600 text-2xl border-r-cyan-600"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                      location.pathname === path
                        ? "w-full bg-blue-300"
                        : "w-0 group-hover:w-full bg-purple-600"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Right-aligned navigation menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-2 md:p-0`}
        >
          {/* Mobile view shows all items together */}
          {isMenuOpen && leftNavItems.map((item, index) => {
            const path = item === "My Portfolio" ? "/portfolio" : `/${item.toLowerCase().replace(/\s/g, "")}`;
            
            return (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {item}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    location.pathname === path
                      ? "w-full bg-blue-300"
                      : "w-0 group-hover:w-full bg-purple-600"
                  }`}
                ></span>
              </motion.div>
            );
          })}

          {/* Right navigation items */}
          {rightNavItems.map((item, index) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s/g, "")}`;
            
            return (
              <Link
                key={`right-${index}`}
                to={path}
                className={`block md:inline-block relative group py-2 md:py-0 ${
                  location.pathname === path
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    location.pathname === path
                      ? "w-full bg-blue-300"
                      : "w-0 group-hover:w-full bg-purple-600"
                  }`}
                ></span>
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMoreMenu}
              className="block md:inline-block relative group text-gray-700 hover:text-purple-600 py-2 md:py-0 cursor-pointer w-full text-left md:w-auto"
            >
              More
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </button>

            <div
              className={`${
                isMoreOpen ? "block" : "hidden"
              } md:absolute md:left-1/2 md:top-full md:mt-2 transform md:-translate-x-1/2 bg-white text-black shadow-lg rounded-md transition-opacity duration-300 z-10`}
            >
              <ul className="py-2 w-48 md:w-56">
                {[
                  { label: "About Us", to: "/about" },
                  { label: "FAQs", to: "/faqs" },
                  { label: "Articles", to: "/article" },
                  { label: "Scholarships", to: "/scholarship" },
                  { label: "Results", to: "/result" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.to}
                      className={`block px-6 py-2 hover:bg-purple-100 ${
                        location.pathname === item.to ? "bg-blue-100 font-semibold text-blue-500" : ""
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMoreOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Auth Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-2 md:mt-0">
            {!User ? (
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Register/LogIn
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className={`block md:inline-block relative group py-2 md:py-0 ${
                  location.pathname === "/dashboard"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dashboard
                </div>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    location.pathname === "/dashboard"
                      ? "w-full bg-blue-300"
                      : "w-0 group-hover:w-full bg-purple-600"
                  }`}
                ></span>
              </Link>
            )}
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;