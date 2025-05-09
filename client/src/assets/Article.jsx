import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Pic from "./Logo.svg";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaBars, FaTimes } from 'react-icons/fa';
import useAuthStore from "../useAuthstore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const ArticlesPage = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {User} =  useAuthStore();
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://newsdata.io/api/1/news?apikey=pub_841366d162f6b814ef33f0efbf11caf757ec9&q=Article&country=in&language=en&category=education,science,technology'
        );
        const data = await response.json();
        
        if (data.results) {
          const formattedArticles = data.results.map(item => ({
            title: item.title,
            summary: item.description || "Click to read more about this education-related article",
            author: item.creator ? item.creator[0] : "Unknown Author",
            date: new Date(item.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) || "Recent",
            tags: item.keywords ? item.keywords.slice(0, 2) : ["Education"],
            url: item.link || "#",
            image: item.image_url
          }));
          setArticlesData(formattedArticles);
        } else {
          setArticlesData(staticArticles);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load latest articles");
        setArticlesData(staticArticles);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Header Component */}
      <Header User={User} />


      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center p-8 md:p-24 bg-gradient-to-r from-purple-300 to-blue-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Insights That Matter
        </h2>
        <p className="mt-2 text-base sm:text-lg text-white max-w-xl px-4">
          Timely, reliable, and research-backed articles to help parents and students make smarter school choices.
        </p>
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
        >
          Read Articles
        </Link>
      </motion.section>

      {/* Articles Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-14 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 text-center mb-8 sm:mb-10">
            Educational & School Articles
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 mb-8">{error}</div>
          ) : (
            <div id="articles" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articlesData.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-md p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 group"
                >
                  {article.image && (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-3 gap-2">
                    <span>✍️ {article.author}</span>
                    <span>📅 {article.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 text-xs font-medium px-2 sm:px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 sm:mt-5 block w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 rounded-lg text-center transition-all duration-300"
                  >
                    Read More
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

const staticArticles = [
  {
    title: "How to Choose the Right School for Your Child",
    summary: "Explore key factors to consider when selecting a school including academics, extracurriculars, and values.",
    author: "Dr. Aditi Sharma",
    date: "April 30, 2025",
    tags: ["School Selection", "Parent Guide"],
    url: "#",
    image: ""
  },
  {
    title: "Top 10 Education Trends in 2025",
    summary: "Discover the latest innovations transforming education across the world, from AI tutors to hybrid classrooms.",
    author: "Anil Mehta",
    date: "April 28, 2025",
    tags: ["EdTech", "Trends"],
    url: "#",
    image: ""
  },
  {
    title: "Understanding CBSE vs ICSE vs State Boards",
    summary: "A deep dive into the differences, pros, and cons of India's major school boards to help you make informed decisions.",
    author: "Priya Desai",
    date: "April 25, 2025",
    tags: ["Board Comparison", "Education System"],
    url: "#",
    image: ""
  },
  {
    title: "Best Private Schools in Major Cities",
    summary: "A list of top-rated private schools across metro cities, including facilities, academics, and extracurriculars.",
    author: "Ravi Kumar",
    date: "April 20, 2025",
    tags: ["Private Schools", "Top Schools"],
    url: "#",
    image: ""
  },
  {
    title: "How to Evaluate School Facilities for Your Child",
    summary: "Factors to consider when assessing school facilities, including sports, labs, and extracurricular activities.",
    author: "Sushmita Gupta",
    date: "April 18, 2025",
    tags: ["School Facilities", "Parent Guide"],
    url: "#",
    image: ""
  },
  {
    title: "The Role of Technology in Modern Schools",
    summary: "How schools are integrating technology into their curriculums and classrooms to enhance learning experiences.",
    author: "Alok Sharma",
    date: "April 15, 2025",
    tags: ["Tech in Education", "Modern Schools"],
    url: "#",
    image: ""
  }
];

export default ArticlesPage;