import React, { useState } from "react";
import axios from "axios";
import Pic from "./Logo.svg";
const Schools = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [customLocation, setCustomLocation] = useState("");
  const [schools, setSchools] = useState([]);

  // Function to generate a random rating between 3.0 and 5.0
  const getRandomRating = () => {
    return (Math.random() * (5.0 - 3.0) + 3.0).toFixed(1); // Generates a number between 3.0 and 5.0
  };

  // Function to get the user's current location from backend
  const fetchCurrentLocation = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/location");
      const data = response.data;
      console.log(data);
      setCurrentLocation(`Lat: ${data.latitude}, Lng: ${data.longitude}`);
      fetchSchools(data.latitude, data.longitude);
    } catch (error) {
      alert("Error fetching location from backend.");
    }
  };

  // Function to handle input change for search location
  const handleInputChange = (event) => {
    setCustomLocation(event.target.value);
  };

  // Function to search for a specific location (send input to backend)
  const searchLocation = async () => {
    if (customLocation.trim() === "") {
      alert("Please enter a location to search.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/search", {
        location: customLocation,
      });
      const firstLocation = response.data[0];
      if (firstLocation) {
        setCurrentLocation(`Lat: ${firstLocation.latitude}, Lng: ${firstLocation.longitude}`);
        fetchSchools(firstLocation.latitude, firstLocation.longitude);
      } else {
        alert("No results found for the given location.");
      }
    } catch (error) {
      alert("Error searching location from backend.");
    }
  };
  
  // Function to fetch schools based on latitude and longitude
  const fetchSchools = async (latitude, longitude) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/schools`, {
        params: { latitude, longitude },
      });

      // Extract school data and generate ratings
      const schoolList = response.data.predictions.map((school) => ({
        name: school.structured_formatting.main_text, // Extracting school name
        address: school.description, // Extracting full address
        rating: getRandomRating(), // Generating a random rating
        distance: school.distance_meters,
      }));

      setSchools(schoolList);
    } catch (error) {
      alert("Error fetching schools.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <img src={Pic} alt="Logo" className="h-16" />
          </div>
          <nav className="flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-purple-600">Home</a>
            <a href="/schools" className="text-gray-600 hover:text-purple-600">Schools</a>
            <a href="/services" className="text-gray-600 hover:text-purple-600">Services</a>
            <a href="/contact" className="text-gray-600 hover:text-purple-600">Contact</a>
            <a href="/faqs" className="text-gray-600 hover:text-purple-600">FAQs</a>
            <a href="/community" className="text-gray-600 hover:text-purple-600">Community</a>
            <a href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Register</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Location Search */}
      <section className="text-center py-16 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Discover Your Ideal School</h1>
        <p className="text-lg text-gray-600 mt-2">Helping Parents, Shaping Futures: Find the Best School for Your Child!</p>

        {/* Search Section */}
        <div className="mt-6 flex justify-center items-center gap-4">
          {/* Button to get current location */}
          <button
            onClick={fetchCurrentLocation}
            className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Use Current Location
          </button>

          {/* Input Field and Search Button */}
          <div className="flex bg-white shadow-md rounded-md overflow-hidden">
            <input
              type="text"
              value={customLocation}
              onChange={handleInputChange}
              placeholder="Enter a location"
              className="px-4 py-3 w-64 outline-none border border-gray-300"
            />
            <button
              onClick={searchLocation}
              className="bg-purple-600 text-white px-6 py-3 flex items-center hover:bg-purple-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Display Current Location (if available) */}
        {currentLocation && <p className="text-gray-700 mt-4 text-lg">📍 {currentLocation}</p>}
      </section>

      {/* Schools List */}
      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Schools</h2>
          {schools.length > 0 ? (
            <ul className="bg-white shadow-md rounded-md p-4">
              {schools.map((school, index) => (
                <li key={index} className="py-4 border-b border-gray-200">
                  <p className="text-lg font-semibold">🏫 {school.name}</p>
                  <p className="text-gray-600">📌 Address: {school.address}</p>
                  <p className="text-yellow-500">⭐ Rating: {school.rating}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No schools found.</p>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 Scholastic. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
          <a href="/help" className="hover:text-gray-300">Help Center</a>
        </div>
      </footer>
    </div>
  );
};

export default Schools;
