// components/SchoolCard.jsx
import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

const SchoolCard = ({ school, bookmarked, toggleBookmark, setSelectedSchool }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 relative">

      {/* Top Rated Badge */}
      {school.rating >= 4.5 && (
        <span className="absolute top-2 right-10 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
          🌟 Top Rated
        </span>
      )}

      {/* School Info */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">🏫 {school.name}</h3>
      <p className="text-gray-600 text-sm mb-3">📍 {school.address}</p>

      <div className="flex justify-between items-center mt-4">
        <p className="flex items-center gap-1 text-yellow-500 font-medium text-sm">
          ⭐ {school.rating}<span className="text-gray-500">/5</span>
        </p>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => setSelectedSchool(school)}
        className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
      >
        View Details (or tap to bookmark)
      </button>
    </div>
  );
};

export default SchoolCard;
