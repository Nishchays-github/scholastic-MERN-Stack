import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Pic from "../assets/Logo.svg"; // Adjust the path based on your structure
import useAuthStore from "../useAuthstore.js";

const Header = ({User}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const {checkAuth} = useAuthStore();
  const toggleMoreMenu = () => {
    setIsMoreOpen(!isMoreOpen);
  };
  useEffect(()=>{
    checkAuth();
  },[])

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <img src={Pic} alt="Scholastic Logo" className="h-12 md:h-16" />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}
        >
          {["Home", "Schools", "About Us", "Contact", "FAQs", "discussion"].map(
            (item, index) => {
              let path;
              if (item === "Home") {
                path = "/";
              } else if (item === "About Us") {
                path = "/about";
              } else {
                path = `/${item.toLowerCase().replace(/\s/g, "")}`;
              }

              return (
                <Link
                  key={index}
                  to={path}
                  className="block md:inline-block relative group text-gray-700 hover:text-purple-600 py-2 md:py-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            }
          )}

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
  } md:absolute md:left-0 md:top-full md:mt-2 bg-white text-black shadow-lg rounded-md transition-opacity duration-300 z-10`}
>

              <ul className="py-2 w-40">
                <li>
                  <Link
                    to="/article"
                    className="block px-6 py-2 hover:bg-purple-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMoreOpen(false);
                    }}
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/scholarship"
                    className="block px-6 py-2 hover:bg-purple-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMoreOpen(false);
                    }}
                  >
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link
                    to="/result"
                    className="block px-6 py-2 hover:bg-purple-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMoreOpen(false);
                    }}
                  >
                    Results
                  </Link>
                </li>
                <li>
                  <a
                    href="https://brijesh-pal-singh.github.io/notes-app_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-2 hover:bg-purple-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMoreOpen(false);
                    }}
                  >
                    Tools/Widgets
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Auth Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 md:mt-0"
          >
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
                className="block md:inline-block relative group text-gray-700 hover:text-purple-600 py-2 md:py-0"
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
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </motion.div>
        </nav>
      </div>
    </header>
  );
};

export default Header;