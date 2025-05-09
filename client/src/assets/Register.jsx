import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../useAuthstore.js";

const Register = () => {
  const { signup, User } = useAuthStore();
  const navigate = useNavigate();

  const [photo, setphoto] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (User) {
      navigate("/");
    }
  }, [User, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setphoto(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImg(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dob<3 || dob>18){
      return alert("Date should be between 3 to 18");
    } 
    if(!dob) return alert("Date of birth is required");

    const data = {
      name,
      phone,
      email,
      selectedImg,
      password,
      age: dob,
      gender,
    };

    // Basic validation
    if (!name || !email || !password || !dob) {
      alert("All fields are required");
      return;
    }

    setIsRegistering(true);
    try {
      const res = await signup(data);
      if (res?.success || res?.user) {
        navigate("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong during registration.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!isRegistering ? (
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-purple-600">Register</h2>
            <button
              onClick={() => navigate("/")}
              className="text-2xl text-gray-600 hover:text-red-500"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Name */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Enter your phone"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* DOB */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Age</label>
              <input
                type="text"
                value={dob || ""}
                onChange={(e) => setdob(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Photo */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
                required
              />
              {selectedImg && (
                <img
                  src={selectedImg}
                  alt="Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-full"
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-600 hover:underline ml-1"
            >
              Login here
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
              Registering user.....
              <span className="inline-block animate-bounce">...</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
