import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Pic from "./Logo.svg";
import { FaSearch, FaFilter, FaSchool, FaUserGraduate, FaTrophy, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaExternalLinkAlt } from "react-icons/fa";
import useAuthStore from "../useAuthstore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const ScholarshipPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    deadline: "",
    amount: ""
  });
  const {User} =  useAuthStore();
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a nav link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fetch scholarships from API
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        let apiUrl = "https://newsdata.io/api/1/news?apikey=pub_841366d162f6b814ef33f0efbf11caf757ec9&q=Scholarship&country=in&language=en&category=education";
        
        if (searchTerm) {
          apiUrl += `&q=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.results) {
          const formattedScholarships = data.results.map(item => ({
            id: item.article_id,
            title: item.title,
            description: item.description || "Scholarship information",
            provider: item.source_id || "Government/Private",
            amount: item.keywords?.find(kw => kw.includes("₹")) || "Varies",
            deadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            category: item.keywords?.find(kw => kw.includes("Category")) || "General",
            link: item.link || "#",
            eligibility: item.content?.slice(0, 150) || "Open to all eligible candidates"
          }));
          
          setScholarships(formattedScholarships);
        } else {
          setScholarships([]);
        }
      } catch (err) {
        console.error("Error fetching scholarships:", err);
        setError("Failed to load scholarships. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [searchTerm]);

  // Filter scholarships based on filters
  const filteredScholarships = scholarships.filter(scholarship => {
    return (
      (filters.category ? scholarship.category.includes(filters.category) : true) &&
      (filters.amount ? scholarship.amount.includes(filters.amount) : true)
    );
  });

  // Available filters
  const availableFilters = {
    categories: ["General", "Merit-based", "Need-based", "Sports", "STEM", "Arts"],
    amounts: ["Varies", "₹10,000+", "₹50,000+", "₹1,00,000+", "Full Tuition"]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header User={User} />

      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center p-16 md:p-24 bg-gradient-to-r from-purple-300 to-blue-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Scholarship Opportunities
        </h2>
        <p className="mt-2 text-lg text-white max-w-xl">
          Discover financial aid options to support your educational journey
        </p>
      </motion.section>

      {/* Main Content */}
      <main className="px-4 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-3.5 text-purple-500" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                <FaFilter /> Filters
              </button>
            </div>

            {/* Filter Panel */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full p-2 border border-purple-300 rounded"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="">All Categories</option>
                    {availableFilters.categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <select
                    className="w-full p-2 border border-purple-300 rounded"
                    value={filters.amount}
                    onChange={(e) => setFilters({...filters, amount: e.target.value})}
                  >
                    <option value="">Any Amount</option>
                    {availableFilters.amounts.map(amount => (
                      <option key={amount} value={amount}>{amount}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deadline</label>
                  <select
                    className="w-full p-2 border border-purple-300 rounded"
                    value={filters.deadline}
                    onChange={(e) => setFilters({...filters, deadline: e.target.value})}
                  >
                    <option value="">Any Time</option>
                    <option value="soon">Within 1 Month</option>
                    <option value="upcoming">Within 3 Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships Display */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : filteredScholarships.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No scholarships found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredScholarships.map((scholarship, index) => (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{scholarship.title}</h3>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {scholarship.category}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 my-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Amount:</span> {scholarship.amount}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Deadline:</span> {scholarship.deadline}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Provider:</span> {scholarship.provider}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{scholarship.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Eligibility:</h4>
                      <p className="text-sm text-gray-600">{scholarship.eligibility}...</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <a
                        href={scholarship.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline flex items-center gap-1 text-sm font-medium"
                      >
                        View Details <FaExternalLinkAlt className="text-xs" />
                      </a>
                      <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Featured Scholarships Section */}
          {filteredScholarships.length > 0 && (
            <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                <FaTrophy /> Featured Scholarships
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredScholarships.slice(0, 3).map((scholarship) => (
                  <div key={`featured-${scholarship.id}`} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
                    <h4 className="text-lg font-bold mb-2 text-purple-800">{scholarship.title}</h4>
                    <div className="flex items-center text-sm text-purple-600 mb-3">
                      <span className="font-medium">Up to {scholarship.amount}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{scholarship.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-purple-500">Deadline: {scholarship.deadline}</span>
                      <a
                        href={scholarship.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline text-xs flex items-center gap-1"
                      >
                        Details <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ScholarshipPage;

















// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import Pic from "./Logo.svg";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

// // src/data/scholarshipsData.js
// export const scholarshipsData = [
//     {
//       title: "Merit-Based Excellence Scholarship",
//       description: "Awarded to students with outstanding academic performance.",
//       eligibility: "Open to all students",
//       link: "#",
//     },
//     {
//       title: "Women in STEM Grant",
//       description: "Supporting female students pursuing science and tech fields.",
//       eligibility: "Must be enrolled in a university",
//       link: "#",
//     },
//     {
//       title: "Need-Based Student Aid",
//       description: "Financial support for students from underprivileged backgrounds.",
//       eligibility: "For underprivileged students",
//       link: "#",
//     },
//     {
//       title: "Rural Talent Hunt Scholarship",
//       description: "Encouraging students from rural areas to pursue education.",
//       eligibility: "Open to all students",
//       link: "#",
//     },
//     {
//       title: "International Achievers Grant",
//       description: "For students looking to study abroad with exceptional achievements.",
//       eligibility: "Must be enrolled in a university",
//       link: "#",
//     },
//     {
//       title: "First-Gen Scholars Program",
//       description: "Supporting students who are the first in their family to attend college.",
//       eligibility: "For underprivileged students",
//       link: "#",
//     },
//   ];
  

//   const ScholarshipsPage = () => {
//     const [filteredScholarships, setFilteredScholarships] = useState(scholarshipsData);
//     const [filter, setFilter] = useState("all");
//     const [scholarshipNews, setScholarshipNews] = useState([]);
//     const [isLoadingNews, setIsLoadingNews] = useState(true);
//     const [newsError, setNewsError] = useState(null);



//       // Fetch scholarship news from API
//   useEffect(() => {
//     const fetchScholarshipNews = async () => {
//       try {
//         const response = await fetch(
//           'https://newsdata.io/api/1/news?apikey=pub_841366d162f6b814ef33f0efbf11caf757ec9&q=scholarships&country=in&language=en&category=education,science,technology'
//         );
//         const data = await response.json();
        
//         if (data.results) {
//           const formattedNews = data.results.map(item => ({
//             title: item.title,
//             description: item.description || "Click to read more about this scholarship opportunity",
//             date: new Date(item.pubDate).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             }) || "Recent",
//             url: item.link || "#",
//             source: item.source_id || "News Source"
//           }));
//           setScholarshipNews(formattedNews.slice(0, 3));
//         }
//       } catch (err) {
//         console.error("Error fetching scholarship news:", err);
//         setNewsError("Failed to load latest scholarship news");
//       } finally {
//         setIsLoadingNews(false);
//       }
//     };

//     fetchScholarshipNews();
//   }, []);


//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     setFilter(value);
//     if (value === "all") {
//       setFilteredScholarships(scholarshipsData);
//     } else {
//       setFilteredScholarships(
//         scholarshipsData.filter((scholarship) =>
//           scholarship.eligibility.toLowerCase().includes(value.toLowerCase())
//         )
//       );
//     }
//   };

//   return (
//     <div className="w-full scroll-smooth font-sans">
//         <header className="bg-white shadow-md py-4 sticky top-0 z-50">
//                  <div className="container mx-auto flex justify-between items-center px-4">
//                   <Link to="/">
//                    <img src={Pic} alt="Scholastic Logo" className="h-16" />
//                    </Link>
//                    <nav className="hidden md:flex space-x-6 items-center">
//                      <Link to="/" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                        Home
//                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                      </Link>
//                      <Link to="/schools" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                        Schools
//                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                      </Link>
//                      <Link to="/about" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                        About Us
//                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                      </Link>
//                      <Link to="/contact" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                        Contact
//                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                      </Link>
//                      <Link to="/faqs" className="relative group text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
//                        FAQ
//                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
//                      </Link>
                     
//                      <Link to="" className="relative group text-gray-700 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none">
//                        More
//                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
           
//                        {/* Hoverable Options */}
//                        <div className="absolute left-0 top-full mt-2 bg-white text-black dark:text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                        <ul className="py-2 w-40">
//         <li>
//         <Link
//          to="/article"
//          className="block px-6 py-2 hover:bg-purple-100 dark:hover:bg-purple-600">
//         Articles
//         </Link>
//         </li>
//         <li>
//        <Link to="/scholarship" className="block px-6 py-2 hover:bg-purple-100 dark:hover:bg-purple-600">Scholarships</Link>
//         </li>
//         <li>
//        <Link to="/result" className="block px-6 py-2 hover:bg-purple-100 dark:hover:bg-purple-600">Results</Link>
//         </li>
//         <li
//   onClick={() =>
//     window.open('https://brijesh-pal-singh.github.io/notes-app_/', '_blank')
//   }
//   className="block px-6 py-2 text-gray-700 hover:bg-purple-100 dark:hover:bg-purple-600"
// >
//   Tools/Widgets
// </li>

//        </ul>
//               </div>
     
//                      </Link>
         
//                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                        <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md">
//                          Register/LogIn
//                        </Link>
//                      </motion.div>
//                    </nav>
//                  </div>
//                </header>

//                   <motion.section
//                        className="flex flex-col items-center justify-center text-center p-16 md:p-24 bg-gradient-to-r from-purple-300 to-blue-300"
//                        initial={{ opacity: 0 }}
//                        animate={{ opacity: 1 }}
//                        transition={{ duration: 1 }}>
//                       <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">School Scholarships Guide</h2>
// <p className="mt-2 text-lg text-white max-w-xl">Discover scholarships specifically designed to support school students across different backgrounds and needs.</p>
//                 <Link
//                  to=""
//                  onClick={() =>
//                    document.getElementById("scholarship")?.scrollIntoView({ behavior: "smooth" })
//                  }
//                  className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300">
//                  Explore Now
//                </Link>
//                      </motion.section>

//                      <main className="flex-grow px-4 py-12 bg-muted">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-purple-600 dark:text-purple-400 mb-8">
//             Explore Scholarships
//           </h2>

//           {/* Scholarship News Section */}
//           <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
//             <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
//               Latest Scholarship News & Updates
//             </h3>
            
//             {isLoadingNews ? (
//               <div className="flex justify-center items-center h-32">
//                 <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
//               </div>
//             ) : newsError ? (
//               <div className="text-center text-red-500">{newsError}</div>
//             ) : (
//               <div className="grid md:grid-cols-3 gap-4">
//                 {scholarshipNews.map((newsItem, index) => (
//                   <motion.div 
//                     key={index}
//                     whileHover={{ y: -5 }}
//                     className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 hover:shadow-md transition"
//                   >
//                     <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
//                       {newsItem.title}
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                       {newsItem.description}
//                     </p>
//                     <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
//                       <span>{newsItem.source}</span>
//                       <span>{newsItem.date}</span>
//                     </div>
//                     <a 
//                       href={newsItem.url} 
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-3 inline-block text-sm text-purple-600 dark:text-purple-400 hover:underline"
//                     >
//                       Read more →
//                     </a>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Filter */}
//           <div className="mb-8 flex justify-center">
//             <div className="relative">
//               <select
//                 value={filter}
//                 onChange={handleFilterChange}
//                 className="appearance-none px-4 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="all">All Scholarships</option>
//                 <option value="underprivileged">For Underprivileged Students</option>
//                 <option value="open">Open to All Students</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" size={18} />
//             </div>
//           </div>

//           {/* Scholarships List */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredScholarships.length > 0 ? (
//               filteredScholarships.map((scholarship, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ scale: 1.05, rotate: 1 }}
//                   className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-purple-400 transition-all duration-300 border border-purple-200 dark:border-purple-700"
//                 >
//                   <h2 className="text-lg font-bold text-purple-700 dark:text-purple-300">
//                     {scholarship.title}
//                   </h2>
//                   <p className="mt-2 text-sm text-black dark:text-gray-300">{scholarship.description}</p>
//                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                     <strong>Eligibility:</strong> {scholarship.eligibility}
//                   </p>
//                   <a
//                     href={scholarship.link}
//                     className="mt-4 inline-block text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
//                   >
//                     Apply Now →
//                   </a>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="text-center col-span-full text-gray-500 dark:text-gray-400">
//                 No scholarships match the selected filter.
//               </div>
//             )}
//           </div>

//           {/* Pagination Stub */}
//           {/* <div className="mt-10 text-center">
//             <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition dark:bg-purple-500 dark:hover:bg-purple-600">
//               Load More
//             </button>
//           </div> */}


//         </div>
//       </main>







//        {/* Footer Top Section */}
//        <footer className="bg-gradient-to-r from-purple-300 to-blue-300 text-white pt-16 pb-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//           {/* Brand Info */}
//           <div>
//             <div className="flex items-center mb-4">
//             <Link to="/">
//                    <img src={Pic} alt="Scholastic Logo" className="h-16" />
//                    </Link>
//               <span className="text-2xl font-semibold">Scholastic</span>
//             </div>
//             <p className="text-gray-800 max-w-md">
//               Empowering parents with data-driven school choices since 2020.
//             </p>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-medium mb-3">Contact Us</h4>
//             <ul className="text-gray-800 space-y-2 text-sm">
//               <li>Email: <a href="mailto:support@scholastic.com" className="hover:text-white">support@scholastic.com</a></li>
//               <li>Phone: <a href="tel:+911234567890" className="hover:text-white">+91 12345 67890</a></li>
//               <li className="flex items-center space-x-4 mt-2">
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
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Row */}
//         <div className="border-t border-purple-400 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-800">
//           <span className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Scholastic. All rights reserved.</span>
//           <div className="flex space-x-6">
//             <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
//             <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
//             <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
//           </div>
//         </div>
//       </div>

//       {/* Back to Top */}
//       <motion.button
//         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         aria-label="Back to top">
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7 7 7m-7-7v18" />
//         </svg>
//       </motion.button>
//     </footer>
//     </div>
//   );
// };

// export default ScholarshipsPage;