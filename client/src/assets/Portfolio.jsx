import React from "react";
import { FaGithub, FaLinkedin, FaCode, FaDownload } from "react-icons/fa";
import Header from "../components/Header";
import resume from "./Nishchay_.pdf";
export default function Portfolio() {
  // Data for sections
  const stats = [
    { value: "350+", label: "DSA Questions Solved" },
    { value: "8+", label: "Technologies Mastered" },
    { value: "3+", label: "Projects Completed" },
    { value: "100", label: "LeetCode Days" },
  ];

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "C++",
    "MongoDB",
    "MySQL",
    "React JS",
    "Node JS",
    "Express JS",
    "Firebase",
    "Tailwind CSS",
    "Bootstrap",
    "Zustand",
    "Socket.IO",
  ];

  const projects = [
    {
      title: "School Finder App",
      tech: "MERN Stack",
      description:
        "A comprehensive platform to search schools by current location, pincode, or name. Users can bookmark schools and post reviews about their experiences.",
      features: [
        "Location-based school search using Google Maps API",
        "Advanced filtering by pincode, name, and ratings",
        "User authentication for reviews and bookmarks",
        "Interactive review system with ratings",
      ],
    },
    {
      title: "Real Time Chat App",
      tech: "MERN Stack",
      description:
        "Developed a real-time chat application using MERN stack with Cloudinary for media management and Socket.IO for real-time communication.",
      features: [
        "Real-time messaging with Socket.IO",
        "Media sharing via Cloudinary",
        "User presence indicators",
        "Responsive design with Tailwind CSS",
      ],
    },
    {
      title: "Netflix Clone",
      tech: "React, Firebase",
      description:
        "Built a Netflix clone with dynamic content fetching and Firebase for database management.",
      features: [
        "Movie/TV show browsing interface",
        "User authentication with Firebase",
        "Content categorization",
        "Responsive video player",
      ],
    },
    {
      title: "Sudoku Solver",
      tech: "HTML, CSS, JavaScript",
      description:
        "Created an interactive Sudoku solver implementing backtracking algorithms.",
      features: [
        "Interactive puzzle interface",
        "Multiple difficulty levels",
        "Step-by-step solution visualization",
        "Mobile-friendly design",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-sans">
      {/* Hero Section */}
      <Header />
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
        <div className="flex-1 space-y-5">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Nishchay Parashar
          </h1>
          <p className="text-lg text-gray-600">Full Stack Developer</p>
          <p className="text-gray-700">
            Passionate about building full-stack web apps using the MERN stack.
            Strong foundation in Data Structures, Algorithms, and modern web
            technologies.
          </p>

          <div className="flex items-center gap-6 mt-6">
            <a
              href={resume}
              download="Nishchay_Parashar_Resume.pdf"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-300 to-purple-300 text-white px-4 py-2 rounded-lg hover:opacity-90"
            >
              <FaDownload /> Download CV
            </a>
            <div className="flex gap-4 text-xl">
              <a
                href="https://github.com/Nishchays-github"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-purple-500"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/nishchay-parashar-b972a02a9"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-purple-500"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://leetcode.com/u/nischay_parashar/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-purple-500"
              >
                <FaCode />
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-64 h-64 rounded-full border-4 border-blue-300">
            <img
              src="https://i.postimg.cc/FKmP8z5N/linkedin.jpg"
              alt="Nishchay"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white bg-opacity-50 py-10 rounded-lg mx-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-70 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-white bg-opacity-50 rounded-lg  mb-12">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-500">
                {project.title}
              </h3>
              <p className="text-purple-500 text-sm mb-3">{project.tech}</p>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="mt-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  Key Features:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              {project.title === "School Finder App" && (
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-100">
                  <p className="text-blue-700 font-medium">
                    Special Highlight:
                  </p>
                  <p className="text-blue-600">
                    This project includes advanced geolocation features and a
                    comprehensive review system for educational institutions.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Education
        </h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-500">
              Swami Keshvanand Institute Of Technology
            </h3>
            <p className="text-gray-600">Bachelor Of Technology - CGPA: 7.45</p>
            <p className="text-gray-500 text-sm">2021 – 2025 | Jaipur, India</p>
          </div>
          <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-500">
              Kids Corner Happy Sr Sec School
            </h3>
            <p className="text-gray-600">Senior Secondary - 73.33%</p>
            <p className="text-gray-500 text-sm">2021 | Firozabad, India</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-white bg-opacity-50 rounded-lg mb-12">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Get In Touch
        </h2>
        <div className="text-center space-y-2">
          <p className="text-gray-700">+91–8439132067</p>
          <p className="text-gray-700">nishchayparashar2004@gmail.com</p>
          <div className="flex justify-center gap-4 text-xl mt-4">
            <a
              href="https://github.com/Nishchays-github"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-purple-500"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/nishchay-parashar-b972a02a9"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-purple-500"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://leetcode.com/u/nischay_parashar/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-purple-500"
            >
              <FaCode />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
