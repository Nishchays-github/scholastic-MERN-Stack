import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Pic from "./Logo.svg";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaBars, FaTimes } from 'react-icons/fa';
import useAuthStore from "../useAuthstore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const faqContent = {
  parents: [
    {
      question: "How do I find the best schools in my city using Scholastic?",
      answer: "Use our smart filters to compare schools based on location, fees, ratings, board affiliation, and more—all in one place."
    },
    {
      question: "Can I track my application status after submitting?",
      answer: "Yes, Scholastic offers a dashboard where you can view the real-time status of every application you submit."
    },
    {
      question: "Do schools listed provide virtual tours?",
      answer: "Many schools offer 360° virtual tours or video walkthroughs—just look for the 'Virtual Tour' tag on their profile."
    },
    {
      question: "How trustworthy is the information provided on Scholastic?",
      answer: "All listings are verified manually by our team, and updates are frequently reviewed for accuracy and relevance."
    },
    {
      question: "Can I read parent reviews before applying?",
      answer: "Yes, every school profile includes parent reviews and ratings to help you make an informed decision."
    },
    {
      question: "What if I need help shortlisting schools?",
      answer: "Our expert counsellors are available to guide you—just request a callback through the support section."
    },
    {
      question: "Are scholarships listed for all schools?",
      answer: "We highlight available scholarships wherever applicable. You can also filter by 'Scholarship Offered' to find them easily."
    }
  ],  
  schools: [
    {
      question: "How can I register my school on Scholastic?",
      answer: "Click on 'List Your School' on the homepage, submit the required details, and our team will guide you through verification."
    },
    {
      question: "What benefits does Scholastic offer to schools?",
      answer: "We offer increased digital visibility, lead generation, analytics, and promotional tools to help you reach more parents."
    },
    {
      question: "How often can we update our school information?",
      answer: "You can update your profile anytime through your school dashboard—keep details fresh to stay competitive."
    },
    {
      question: "Do we get access to applicant insights and analytics?",
      answer: "Yes, premium school accounts receive access to applicant trends, demographics, and traffic sources."
    },
    {
      question: "Can we highlight specific programs or facilities?",
      answer: "Absolutely! Showcase extracurriculars, special programs, infrastructure, and more using photos, badges, and video embeds."
    },
    {
      question: "Is Scholastic suitable for newly established schools?",
      answer: "Yes, we help new schools build their online presence and attract their first batches through digital outreach."
    },
    {
      question: "What kind of marketing support is available?",
      answer: "Our team can assist with targeted campaigns, banners, and featured placements to drive more visibility and applications."
    }
  ]  
};

const FAQ = () => {
  const {User} = useAuthStore();
  const [activeTab, setActiveTab] = useState("parents");
  const [openIndex, setOpenIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Responsive Header */}
      <Header User={User} />


      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16 xl:p-24 bg-gradient-to-r from-purple-300 to-blue-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-3 md:mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white max-w-md md:max-w-xl">
          Get answers to common queries about schools, admissions, reviews, and more.
        </p>
      </motion.section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="inline-flex bg-purple-50 p-1 rounded-full shadow-md">
            {["parents", "schools"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenIndex(null);
                }}
                className={`px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-medium rounded-full transition-colors ${
                  activeTab === tab
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-purple-700 hover:bg-purple-100"
                }`}
              >
                For {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqContent[activeTab].map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                aria-expanded={openIndex === index}
              >
                <span className="text-left font-medium text-gray-800 text-sm sm:text-base mr-4">
                  <span className="text-purple-600 font-bold">{index + 1}.</span> {item.question}
                </span>
                {openIndex === index ? (
                  <IoIosArrowUp className="flex-shrink-0 text-purple-600 text-lg sm:text-xl" />
                ) : (
                  <IoIosArrowDown className="flex-shrink-0 text-purple-600 text-lg sm:text-xl" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 text-sm sm:text-base">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>

      {/* Responsive Footer */}
      <Footer/>
    </div>
  );
};

export default FAQ;