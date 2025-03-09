import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    setEmail(""); // Clear input field after submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-purple-600">Trouble logging in?</h2>
          <button
            className="text-2xl text-gray-600 hover:text-gray-800 transition duration-300"
            onClick={() => navigate(-1)}
          >
            ×
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">
              Enter your email and we'll send you a link to reset your password
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition duration-300"
            >
              Send reset link
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <div className="text-center text-sm text-gray-600 mt-6">
          <p>
            Remember your password?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in here
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
