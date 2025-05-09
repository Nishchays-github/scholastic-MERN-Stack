import React, { useEffect } from "react";
import { motion } from "framer-motion";
//import Pic from "./Logo.svg"; // Import your logo

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Hide splash after 2.5 sec
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src={Pic} alt="Scholastic Logo" className="h-32 w-32" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-white text-3xl font-bold mt-4"
      >
        Scholastic
      </motion.h1>
    </div>
  );
};

export default SplashScreen;










// // src/components/SplashScreen.jsx
// import React, { useEffect } from "react";
// import { motion } from "framer-motion";

// const SplashScreen = ({ onComplete }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onComplete(); // Hide splash after 2.5 sec
//     }, 2500);
//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
//       <motion.h1
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="text-white text-5xl font-bold"
//       >
//         Scholastic
//       </motion.h1>
//     </div>
//   );
// };

// export default SplashScreen;
