import React from "react";
import { Link } from "react-router-dom";
import Pic from "./Logo.svg";

const flashcard = {
  title: "Find the Best School",
  text: "Use our filters to search schools based on location, budget, academics, and extracurriculars.",
  buttonText: "Start Now",
  buttonLink: "/schools",
  background: "bg-gradient-to-r from-purple-300 to-blue-300",
};

const Home = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <img src={Pic} alt="Logo" className="h-16" />
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
            <Link to="/schools" className="text-gray-700 hover:text-purple-600">Schools</Link>
            <Link to="/services" className="text-gray-700 hover:text-purple-600">Services</Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600">Contact</Link>
            <Link to="/faqs" className="text-gray-700 hover:text-purple-600">FAQs</Link>
            <Link to="/community" className="text-gray-700 hover:text-purple-600">Community</Link>
            <Link to="/register" className="px-4 py-2 bg-purple-600 text-white rounded-lg">Register</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`flex flex-col items-center justify-center text-center p-12 ${flashcard.background} animate-fade-in`}>
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">{flashcard.title}</h2>
        <p className="mt-4 text-lg text-gray-800">{flashcard.text}</p>
        <Link
          to="/schools"
          className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
        >
          {flashcard.buttonText}
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 text-center">
        <h3 className="text-3xl font-bold text-gray-800">Why Choose Scholastic?</h3>
        <p className="mt-2 text-gray-600">We make finding the perfect school easier than ever!</p>

        <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
            <h4 className="text-xl font-semibold text-purple-600">🏫 Wide School Network</h4>
            <p className="text-gray-600 mt-2">Find schools across various locations and curriculums.</p>
          </div>
          
          <div className="p-6 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
            <h4 className="text-xl font-semibold text-purple-600">💰 Budget-Friendly Options</h4>
            <p className="text-gray-600 mt-2">Compare schools based on tuition fees and affordability.</p>
          </div>
          
          <div className="p-6 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
            <h4 className="text-xl font-semibold text-purple-600">📊 Academic Insights</h4>
            <p className="text-gray-600 mt-2">Check academic performance, faculty, and student success.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
