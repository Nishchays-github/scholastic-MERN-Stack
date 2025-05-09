import React, { useEffect, useState } from "react";
import Pic from "./Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../useAuthstore.js";
import SchoolCard from "../components/SchoolCard.jsx";
import SchoolDetailPage from '../components/SchoolDetailPage.jsx'
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Schools = () => {
  const { 
    User,
    getNearbySchools,
    getCurrentLocation,
    searchLocationCoordinates
  } = useAuthStore();
  
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [customLocation, setCustomLocation] = useState("");
  const [schools, setSchools] = useState([]);
  const [bookmarked, setBookmarked] = useState({});
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);


  // Helper functions
  const getRandomRating = () => (Math.random() * (5.0 - 3.0) + 3.0).toFixed(1);
  const getRandomReviews = () => Math.floor(Math.random() * 100) + 10;
  const getRandomFacilities = () => [
    "Library", "Computer Lab", "Science Lab", "Playground", 
    "Cafeteria", "Auditorium", "Sports Facilities", "Smart Classes"
  ].sort(() => 0.5 - Math.random()).slice(0, 4);

  const fetchCurrentLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      const locationString = `Lat: ${locationData.latitude}, Lng: ${locationData.longitude}`;
      setCurrentLocation(locationString);
      fetchSchools(locationData.latitude, locationData.longitude);
    } catch (error) {
      alert("Error fetching location: " + (error.message || "Please try again"));
    }
  };

  const searchLocation = async () => {
    const locationQuery = customLocation.trim();
    if (!locationQuery) return alert("Please enter a location to search.");

    try {
      const coordinates = await searchLocationCoordinates(locationQuery);
      if (!coordinates?.x || !coordinates?.y) {
        return alert("No valid coordinates found for this location.");
      }
      
      const locationString = `Lat: ${coordinates.x}, Lng: ${coordinates.y}`;
      setCurrentLocation(locationString);
      fetchSchools(coordinates.x, coordinates.y);
    } catch (error) {
      alert(error.response?.data?.error || "Error searching location.");
    }
  };

  const fetchSchools = async (latitude, longitude) => {
    try {
      const schoolsData = await getNearbySchools({ latitude, longitude });
      
      const schoolList = schoolsData.predictions.map((school, i) => ({
        id: i,
        name: school.structured_formatting.main_text,
        address: school.description,
        rating: getRandomRating(),
        distance: school.distance_meters,
        reviews: getRandomReviews(),
        facilities: getRandomFacilities(),
        description: "This school provides quality education with experienced faculty and good infrastructure."
      }));

      setSchools(schoolList);
    } catch (error) {
      alert("Error fetching schools: " + (error.message || "Please try again"));
    }
  };

  const toggleBookmark = (schoolId) => {
    if (!User) return setShowRegisterPopup(true);
    setBookmarked(prev => ({ ...prev, [schoolId]: !prev[schoolId] }));
  };

  // Navigation items
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/schools", label: "Schools" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
    { path: "/faqs", label: "FAQ" },
  ];

  const moreLinks = [
    { path: "/article", label: "Articles" },
    { path: "/scholarship", label: "Scholarships" },
    { path: "/result", label: "Results" },
    { path: "https://brijesh-pal-singh.github.io/notes-app_/", label: "Tools/Widgets", external: true }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header User={User} />

      {/* Hero & Search */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1}} transition={{ duration: 1 }} 
        className="flex flex-col items-center justify-center text-center p-8 md:p-16 bg-gradient-to-r from-purple-300 to-blue-300">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">Discover Your Ideal School</h1>
        <p className="text-white max-w-xl">Helping Parents, Shaping Futures: Find the Best School for Your Child!</p>

        <motion.div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <motion.button onClick={fetchCurrentLocation} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition">
            Use Current Location
          </motion.button>

          <motion.div className="flex w-full bg-white shadow-md rounded-md overflow-hidden" whileHover={{ scale: 1.02 }}>
            <input type="text" value={customLocation} onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="Enter a location / pincode" className="px-4 py-3 w-full outline-none border border-gray-300"/>
            <motion.button onClick={searchLocation} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-3 hover:bg-purple-700">
              Search
            </motion.button>
          </motion.div>
        </motion.div>

        {currentLocation && <p className="text-gray-700 mt-4">📍 {currentLocation}</p>}
      </motion.section>

      {/* Schools List */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">Nearby Schools</h2>

          {schools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  bookmarked={bookmarked}
                  toggleBookmark={toggleBookmark}
                  setSelectedSchool={setSelectedSchool}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No schools found near you.</p>
          )}
        </div>
      </section>

      {/* School Details Popup */}
      {selectedSchool && (
        <SchoolDetailPage
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
          bookmarked={bookmarked}
          toggleBookmark={toggleBookmark}
        />
      )}

      {/* Register Popup */}
      {showRegisterPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">Please Register</h2>
            <p className="text-gray-600 mb-4">You must be registered to bookmark schools.</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-xl" onClick={() => navigate('/register')}>
              Go to Register
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Schools;