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
