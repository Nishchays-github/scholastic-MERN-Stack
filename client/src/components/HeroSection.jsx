import React from "react";
import "../index.css"; // for pulse-button & animate-fade-in classes

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-4 animate-fade-in">
        Find the Best School
      </h1>

      <p className="text-gray-600 max-w-md">
        Search schools by location, budget, academics and more — easily.
      </p>

      <button className="pulse-button bg-purple-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-purple-700">
        Start Now
      </button>
    </section>
  );
};

export default HeroSection;
