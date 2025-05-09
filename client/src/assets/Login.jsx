import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../useAuthstore.js";

const Login = () => {
  const navigate = useNavigate();
  const { login, User } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (User) {
      navigate("/");
    }
  }, [User, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
  
    try {
      const data = { email, password };
      const res = await login(data); // will throw if credentials are wrong
  
      if (res?.user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      if (error.message === "Invalid email or password") {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!isLoggingIn ? (
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-purple-600">Login</h2>
            <button
              onClick={() => navigate("/")}
              className="text-2xl text-gray-600 hover:text-red-500"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-purple-600 hover:underline ml-1"
            >
              Register here
            </button>
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center  bg-gray-50">
            {/* Double Ring Spinner */}
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-blue-500 border-transparent rounded-full animate-spin"></div>
            </div>

            {/* Animated Text */}
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              logging in user
              <span className="inline-block animate-bounce">...</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
