import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../useAuthstore";
import Footer from "../components/Footer";

const Services = () => {
  const {User } = useAuthStore();
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-300">Scholastic</Link>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-purple-400">Home</Link>
            <Link to="/schools" className="hover:text-purple-400">Schools</Link>
            <Link to="/services" className="hover:text-purple-400">Services</Link>
            <Link to="/contact" className="hover:text-purple-400">Contact</Link>
            <Link to="/tools" className="hover:text-purple-400">Tools/Widgets</Link>
            <Link to="/faqs" className="hover:text-purple-400">FAQs</Link>
            <Link to="/community" className="hover:text-purple-400">Community</Link>
            {!User && <Link to="/register" className="bg-purple-400 text-white px-4 py-2 rounded-full hover:bg-purple-500">
              Register
            </Link>}
            {User && <Link to="/register" className="bg-purple-400 text-white px-4 py-2 rounded-full hover:bg-purple-500">
              Profile
            </Link>}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="bg-purple-700 text-white text-center py-20">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="text-lg mt-4">Helping You Make the Best Choice for Your Child's Education</p>
        </section>

        {/* Services Section */}
        <section className="container mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Comprehensive Listings",
                description: "Explore detailed profiles of schools, covering their academics, extracurricular activities, and facilities.",
              },
              {
                title: "Personalized Search Filters",
                description: "Use our advanced search filters to find schools that align with your needs, such as budget, location, and school type.",
              },
              {
                title: "Real-Time Updates",
                description: "Stay up-to-date with the latest rankings, school performance metrics, and admission information in real-time.",
              },
              {
                title: "Resources and Guides",
                description: "Access expert-written articles and guides to navigate the school admissions process with confidence.",
              },
              {
                title: "Parent Community Forum",
                description: "Engage with other parents to share experiences, reviews, and advice on making informed school choices.",
              },
              {
                title: "Expert Advice",
                description: "Get personalized recommendations and advice from educational experts to help you find the right school for your child.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default Services;
