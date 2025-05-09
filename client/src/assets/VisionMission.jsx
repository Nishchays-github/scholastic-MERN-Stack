import React from "react";

const VisionMission = () => {
  return (
    <div className="container mx-auto py-16 px-6">
      {/* Vision Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Vision</h2>
        <p className="text-lg text-gray-700 mt-4">
          We aim to simplify the school search process by centralizing all critical data and creating an intuitive user experience. 
          By offering personalized search filters and interactive tools, our mission is to empower parents to make timely and well-informed decisions about school admissions.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Mission</h2>
        <p className="text-lg text-gray-700 mt-4">
          We aim to simplify the school search process by centralizing all critical data and creating an intuitive user experience. 
          By offering personalized search filters and interactive tools, our mission is to empower parents to make timely and well-informed decisions about school admissions.
        </p>
      </div>
    </div>
  );
};

export default VisionMission;
