import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Pic from "./Logo.svg";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import useAuthStore from "../useAuthstore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {User} = useAuthStore();
  return (
    <div className="w-full scroll-smooth font-sans">
          {/* Header */}
          <Header User={User} />

      {/* About Content */}

      <motion.header
  className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 bg-gradient-to-r from-purple-300 to-blue-300"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">About Scholastic</h1>
  <p className="text-lg text-white max-w-2xl">
    Scholastic empowers families with reliable school ratings, verified data, and real community insights—
    helping you make confident, informed educational decisions.
  </p>
</motion.header>


<div className="text-gray-800 dark:text-white min-h-screen px-4 py-10">
<div className="max-w-5xl mx-auto">
          <section className="mb-10">
  <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Story</h2>
  <p className="text-gray-600">
    Scholastic began as a simple idea in a college dorm room — a desire to simplify the school selection process
    for families across India. What started as a small side project has grown into a trusted platform visited by
    thousands of parents and students every month. With contributions from real people, verified data from education boards,
    and advanced search filters, Scholastic empowers families to make confident and informed decisions.
  </p>
</section>

<section className="mb-10">
  <h2 className="text-2xl font-bold text-purple-600 mb-2">What Makes Us Different</h2>
  <ul className="list-disc pl-6 space-y-2 text-black dark:text-black">
    <li><strong>User-Driven:</strong> Reviews and ratings come directly from verified users — no paid promotions.</li>
    <li><strong>City-Based Top Picks:</strong> We curate the top schools in major metro cities with real-time performance metrics.</li>
    <li><strong>Integrated Tools:</strong> From result tracking to school comparison charts, we offer interactive tools to enhance your decision-making.</li>
    <li><strong>Accessibility:</strong> A mobile-first design ensures that anyone, anywhere, can access quality school data.</li>
  </ul>
</section>


          <section className="mb-10">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              Scholastic is committed to helping students, parents, and educators make informed
              decisions by offering comprehensive school ratings, verified data, and genuine
              community reviews. Whether you're looking for the best schools in your city or
              want to contribute insights, Scholastic connects the education ecosystem in one place.
            </p>
          </section>

          <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-black dark:text-black">

              <li><strong>Transparency:</strong> Honest, open, and clear data and reviews.</li>
              <li><strong>Accuracy:</strong> Verified school statistics and reliable user content.</li>
              <li><strong>Community:</strong> Built by contributions from students and parents.</li>
              <li><strong>Education First:</strong> We believe informed choices shape better futures.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">Meet the Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-gray-600">
              {[
                  { name: "Brijesh Pal Singh", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746040322/brijesh_og2sky.jpg" },
                  { name: "Arpit Gupta", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746041718/arpit_fs5t1y.jpg" },
                  { name: "Bhumika Chaudhary", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746040334/bhumika_tghabp.jpg" },
                  { name: "Anushka Sonwal", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746040321/anushka_rlrzlw.jpg" },
              ].map((member, i) => (
                <div className="text-center" key={i}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 mx-auto rounded-full mb-3 border-2 border-gray-300 dark:border-gray-600"
                  />
                  <p className="font-medium">{member.name}</p>
                  
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
                {/* Footer Top Section */}
 
          <Footer/>
    </div>
  );
};

export default About;


















// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import Pic from "./Logo.svg";
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

// const About = () => {
//   return (
//     <div className="w-full scroll-smooth font-sans">
//           {/* Header */}
//           <header className="bg-white shadow-md py-4 sticky top-0 z-50">
//             <div className="container mx-auto flex justify-between items-center px-4">
//                   <Link to="/">
//                    <img src={Pic} alt="Scholastic Logo" className="h-16" />
//                    </Link>
//               <nav className="hidden md:flex space-x-6 items-center">
//                 <Link to="/" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                   Home
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link to="/schools" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                   Schools
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link to="/about" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                   About Us
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link to="/contact" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                   Contact
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link to="/faqs" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                   FAQ
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
                
//                 <Link to="" className="relative group text-gray-700 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none">
//                   More
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
      
//                   {/* Hoverable Options */}
//                   <div className="absolute left-0 top-full mt-2 bg-white text-black dark:text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                   <ul className="py-2 w-40">
//   <li>
//     <Link
//       to="/articles"
//       className="block px-6 py-2 hover:bg-purple-100 dark:hover:bg-purple-600"
//     >
//       Articles
//     </Link>
//   </li>
//   <li>
//     <Link
//       to="/schoolarship"
//       className="block px-6 py-2 hover:bg-purple-100 dark:hover:bg-purple-600"
//     >
//       Schoolarships
//     </Link>
//   </li>
//   <li>
//     <Link
//       to="/tools"
//       className="block px-6 py-2 hover:bg-purple-100 dark:hover:bg-purple-600"
//     >
//       Tools/Widgets
//     </Link>
//   </li>
// </ul>
//               </div>

//                 </Link>
    
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md">
//                     Register/LogIn
//                   </Link>
//                 </motion.div>
//               </nav>
//             </div>
//           </header>

//       {/* About Content */}

//       <motion.header
//   className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 bg-gradient-to-r from-purple-300 to-blue-300"
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ duration: 1 }}
// >
//   <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">About Scholastic</h1>
//   <p className="text-lg text-white max-w-2xl">
//     Scholastic empowers families with reliable school ratings, verified data, and real community insights—
//     helping you make confident, informed educational decisions.
//   </p>
// </motion.header>


// <div className="text-gray-800 dark:text-white min-h-screen px-4 py-10">
// <div className="max-w-5xl mx-auto">
//           <section className="mb-10">
//   <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Story</h2>
//   <p className="text-gray-600">
//     Scholastic began as a simple idea in a college dorm room — a desire to simplify the school selection process
//     for families across India. What started as a small side project has grown into a trusted platform visited by
//     thousands of parents and students every month. With contributions from real people, verified data from education boards,
//     and advanced search filters, Scholastic empowers families to make confident and informed decisions.
//   </p>
// </section>

// <section className="mb-10">
//   <h2 className="text-2xl font-bold text-purple-600 mb-2">What Makes Us Different</h2>
//   <ul className="list-disc pl-6 space-y-2 text-black dark:text-black">
//     <li><strong>User-Driven:</strong> Reviews and ratings come directly from verified users — no paid promotions.</li>
//     <li><strong>City-Based Top Picks:</strong> We curate the top schools in major metro cities with real-time performance metrics.</li>
//     <li><strong>Integrated Tools:</strong> From result tracking to school comparison charts, we offer interactive tools to enhance your decision-making.</li>
//     <li><strong>Accessibility:</strong> A mobile-first design ensures that anyone, anywhere, can access quality school data.</li>
//   </ul>
// </section>


//           <section className="mb-10">
//             <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Mission</h2>
//             <p className="text-gray-600">
//               Scholastic is committed to helping students, parents, and educators make informed
//               decisions by offering comprehensive school ratings, verified data, and genuine
//               community reviews. Whether you're looking for the best schools in your city or
//               want to contribute insights, Scholastic connects the education ecosystem in one place.
//             </p>
//           </section>

//           <section className="mb-10">
//           <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Values</h2>
//             <ul className="list-disc pl-6 space-y-2 text-black dark:text-black">

//               <li><strong>Transparency:</strong> Honest, open, and clear data and reviews.</li>
//               <li><strong>Accuracy:</strong> Verified school statistics and reliable user content.</li>
//               <li><strong>Community:</strong> Built by contributions from students and parents.</li>
//               <li><strong>Education First:</strong> We believe informed choices shape better futures.</li>
//             </ul>
//           </section>

//           <section className="mb-12">
//             <h2 className="text-2xl font-bold text-purple-600 mb-2">Meet the Team</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-gray-600">
//               {[
//                   { name: "Brijesh Pal Singh", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746040322/brijesh_og2sky.jpg" },
//                   { name: "Arpit Gupta", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746041718/arpit_fs5t1y.jpg" },
//                   { name: "Bhumika Chaudhary", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746040334/bhumika_tghabp.jpg" },
//                   { name: "Anushka Sonwal", image: "https://res.cloudinary.com/drphfynao/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746040321/anushka_rlrzlw.jpg" },
//               ].map((member, i) => (
//                 <div className="text-center" key={i}>
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="w-28 h-28 mx-auto rounded-full mb-3 border-2 border-gray-300 dark:border-gray-600"
//                   />
//                   <p className="font-medium">{member.name}</p>
                  
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//                 {/* Footer Top Section */}
//                 <footer className="bg-gradient-to-r from-purple-300 to-blue-300 text-white pt-16 pb-8">
//             <div className="container mx-auto px-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//                 {/* Brand Info */}
//                 <div>
//                   <div className="flex items-center mb-4">
//                   <Link to="/">
//                    <img src={Pic} alt="Scholastic Logo" className="h-16" />
//                    </Link>
//                     <span className="text-2xl font-semibold">Scholastic</span>
//                   </div>
//                   <p className="text-gray-800 max-w-md">
//                     Empowering parents with data-driven school choices since 2020.
//                   </p>
//                 </div>
      
//                 {/* Contact Info */}
//                 <div>
//                   <h4 className="text-lg font-medium mb-3">Contact Us</h4>
//                   <ul className="text-gray-800 space-y-2 text-sm">
//                     <li>Email: <a href="mailto:support@scholastic.com" className="hover:text-white">support@scholastic.com</a></li>
//                     <li>Phone: <a href="tel:+911234567890" className="hover:text-white">+91 12345 67890</a></li>
//                     <li className="flex items-center space-x-4 mt-2">
//   <a href="#" aria-label="Facebook" className="hover:text-white">
//     <FaFacebookF />
//   </a>
//   <a href="#" aria-label="Instagram" className="hover:text-white">
//     <FaInstagram />
//   </a>
//   <a href="#" aria-label="LinkedIn" className="hover:text-white">
//     <FaLinkedinIn />
//   </a>
//   <a href="#" aria-label="Twitter" className="hover:text-white">
//     <FaTwitter />
//   </a>
// </li>
//                   </ul>
//                 </div>
//               </div>
      
//               {/* Bottom Row */}
//               <div className="border-t border-purple-400 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-800">
//                 <span className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Scholastic. All rights reserved.</span>
//                 <div className="flex space-x-6">
//                   <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
//                   <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
//                   <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
//                 </div>
//               </div>
//             </div>
      
//             {/* Back to Top */}
//             <motion.button
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               aria-label="Back to top">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7 7 7m-7-7v18" />
//               </svg>
//             </motion.button>
//           </footer>
//     </div>
//   );
// };

// export default About;