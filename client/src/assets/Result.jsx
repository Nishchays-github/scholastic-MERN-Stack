import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Pic from "./Logo.svg";
import { FaSearch, FaFilter, FaSchool, FaUserGraduate, FaTrophy, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import useAuthStore from "../useAuthstore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("schools");
    const {User} =  useAuthStore();
  const [filters, setFilters] = useState({
    state: "",
    board: "",
    year: new Date().getFullYear().toString()
  });

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a nav link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fetch results from API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        let apiUrl = "https://newsdata.io/api/1/news?apikey=pub_841366d162f6b814ef33f0efbf11caf757ec9&q=Results&country=in&language=en&category=education";
        
        if (searchTerm) {
          apiUrl += `&q=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.results) {
          const formattedResults = data.results.map(item => ({
            id: item.article_id,
            title: item.title,
            description: item.description || "Education result information",
            type: item.keywords?.includes("student") ? "students" : "schools",
            state: item.country === "India" ? (item.keywords?.find(kw => kw.includes("State")) || "National") : "International",
            board: item.keywords?.find(kw => kw.includes("Board")) || "General",
            date: new Date(item.pubDate).toLocaleDateString(),
            link: item.link || "#",
            image: item.image_url
          }));
          
          setResults(formattedResults);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  // Filter results based on active tab and filters
  const filteredResults = results.filter(result => {
    return (
      result.type === activeTab &&
      (filters.state ? result.state.includes(filters.state) : true) &&
      (filters.board ? result.board.includes(filters.board) : true) &&
      (filters.year ? result.date.includes(filters.year) : true)
    );
  });

  // Available filters
  const availableFilters = {
    states: ["National", "Delhi", "Maharashtra", "Tamil Nadu", "Uttar Pradesh", "Karnataka"],
    boards: ["CBSE", "ICSE", "State Board", "IB", "International"],
    years: ["2023", "2022", "2021"]
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
        <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
          {activeTab === "schools" ? "School Results" : "Student Results"}
        </h2>
        <p className="mt-2 text-lg text-white max-w-xl">
          Discover the latest academic results and performance metrics from across India
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
                  placeholder={`Search ${activeTab} results...`}
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
                  <label className="block text-sm font-medium mb-1">State</label>
                  <select
                    className="w-full p-2 border border-purple-300 rounded"
                    value={filters.state}
                    onChange={(e) => setFilters({...filters, state: e.target.value})}
                  >
                    <option value="">All States</option>
                    {availableFilters.states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Board</label>
                  <select
                    className="w-full p-2 border border-purple-300 rounded"
                    value={filters.board}
                    onChange={(e) => setFilters({...filters, board: e.target.value})}
                  >
                    <option value="">All Boards</option>
                    {availableFilters.boards.map(board => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <select
                    className="w-full p-2 border border-purple-300 rounded"
                    value={filters.year}
                    onChange={(e) => setFilters({...filters, year: e.target.value})}
                  >
                    {availableFilters.years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === "schools" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("schools")}
            >
              <FaSchool /> Top Schools
            </button>
            <button
              className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === "students" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("students")}
            >
              <FaUserGraduate /> Top Students
            </button>
          </div>

          {/* Results Display */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No results found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  {result.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x200?text=Result";
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{result.title}</h3>
                      {result.type === "schools" ? (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {result.board}
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {result.state}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{result.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{result.date}</span>
                      <a
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline flex items-center gap-1"
                      >
                        View Details <FiExternalLink />
                      </a>
                    </div>
                    {result.type === "schools" && (
                      <div className="mt-3 flex items-center gap-2 text-yellow-500">
                        <FaTrophy />
                        <span className="text-sm font-medium">Rank: {index + 1}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Top Performers Section */}
          {activeTab === "students" && filteredResults.length > 0 && (
            <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                <FaTrophy /> Top 3 Performers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredResults.slice(0, 3).map((result, index) => (
                  <div key={`top-${result.id}`} className="bg-purple-50 rounded-lg p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-600">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-bold mb-2">{result.title}</h4>
                    <p className="text-gray-600 mb-3">{result.description}</p>
                    <div className="text-sm text-purple-600">{result.board}</div>
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

export default ResultsPage;