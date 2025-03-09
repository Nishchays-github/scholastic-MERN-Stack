import React from "react";
import App from '../App.jsx'
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="index.html" className="text-2xl font-bold text-purple-300">About Us</a>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="App" className="hover:text-purple-400"/>Home</li>
              <li><a href="services.html" className="hover:text-purple-400">Services</a></li>
              <li><a href="contact.html" className="hover:text-purple-400">Contact</a></li>
              <li><a href="login.html" className="hover:text-purple-400">Login</a></li>
              <li>
                <a href="register.html" className="bg-purple-400 text-white px-4 py-2 rounded-full hover:bg-purple-500">
                  Register
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-700 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Scholastic</h1>
        <p className="text-lg mt-4">Empowering Parents and Students with Smart School Choices</p>
      </section>

      {/* About Us Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Who We Are?</h2>
        <p className="text-lg text-gray-700 mt-4 text-center">
          Scholastic is a dedicated platform that helps parents and students navigate the complex school selection process.
          Our goal is to provide comprehensive, accurate, and up-to-date information about schools to assist in making informed decisions.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-700 mt-4 text-center">
          We aim to simplify the school search process by centralizing all critical data and creating an intuitive user experience.
        </p>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-800">What We Offer</h2>
        <div className="flex flex-wrap justify-center mt-8 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-semibold">Comprehensive School Listings</h3>
            <p className="text-gray-600 mt-2">Detailed profiles on schools including academics, infrastructure, extracurriculars, and more.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-semibold">Personalized Search Filters</h3>
            <p className="text-gray-600 mt-2">Advanced filters to find schools based on budget, location, and preferences.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-semibold">Real-Time Updates</h3>
            <p className="text-gray-600 mt-2">Stay updated with school rankings, performance, and admission processes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-semibold">Resources and Guides</h3>
            <p className="text-gray-600 mt-2">Expert articles on school admissions, application tips, and rankings.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2024 Scholastic. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>
          <a href="#" className="text-purple-400 hover:underline">Terms of Service</a>
          <a href="#" className="text-purple-400 hover:underline">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default About;
