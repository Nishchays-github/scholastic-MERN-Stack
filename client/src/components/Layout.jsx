// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Layout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Show popup after 1 second if not seen before
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        document.body.style.overflow = 'hidden';
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Close popup handler
  const handleClosePopup = (rememberChoice = true) => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      if (rememberChoice) {
        sessionStorage.setItem('hasSeenPopup', 'true');
      }
      document.body.style.overflow = 'auto';
    }, 300); // Match this with animation duration
  };

  // Remind later handler
  const handleRemindLater = () => {
    handleClosePopup(false);
    setTimeout(() => {
      setShowPopup(true);
      document.body.style.overflow = 'hidden';
    }, 15000); // 15 seconds for testing (change to 1 hour = 3600000)
  };

  return (
    <>
      {/* Your popup component */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isClosing ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-[100] bg-black/30"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={isClosing ? { scale: 0.95, y: 10, opacity: 0 } : { scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white/95 p-6 rounded-2xl max-w-md w-full mx-4 text-center relative border border-gray-200/50 shadow-lg"
          >
            <button
              onClick={() => handleClosePopup(true)}
              className="absolute top-2 right-4 text-xl hover:text-red-500"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-bold mb-3 text-purple-800">Join Scholastic Today!</h2>
            <p className="text-gray-700 mb-6">
              Register to access school comparisons, news updates, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition font-medium"
              >
                Register Now
              </Link>
              <button
                onClick={handleRemindLater}
                className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg transition font-medium"
              >
                Remind Me Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* This renders your page content */}
      <Outlet />
    </>
  );
};

export default Layout;