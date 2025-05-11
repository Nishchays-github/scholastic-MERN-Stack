import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../useAuthstore.js";
import emailjs from "@emailjs/browser";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const features = [
  {
    title: "🏫 Wide School Network",
    desc: "Find schools across various locations and curriculums.",
  },
  {
    title: "💰 Budget-Friendly Options",
    desc: "Compare schools based on tuition fees and affordability.",
  },
  {
    title: "📊 Academic Insights",
    desc: "Check academic performance, faculty, and student success.",
  },
  {
    title: "🧪 Extra-Curricular Filters",
    desc: "Sort by sports, clubs, labs, and more.",
  },
  {
    title: "📍 Location-based Recommendations",
    desc: "Discover top-rated schools near your area.",
  },
  {
    title: "📝 Real Parent Reviews",
    desc: "Unbiased reviews from verified users.",
  },
];

const news = [
  {
    title: "National Science Olympiad Results Declared",
    desc: "Students from over 1200 schools participated.",
    url: "#",
  },
  {
    title: "CBSE Announces New Grading Guidelines",
    desc: "2025 board exam reforms aim to improve evaluation fairness.",
    url: "#",
  },
  {
    title: "ICSE to Introduce AI Curriculum",
    desc: "New modules on machine learning and robotics from next session.",
    url: "#",
  },
  {
    title: "Karnataka Schools Adopt Smart Attendance",
    desc: "Face recognition technology rolled out in 300+ schools.",
    url: "#",
  },
  {
    title: "Delhi Schools to Begin Evening Classes",
    desc: "Aiming to provide flexible education schedules.",
    url: "#",
  },
  {
    title: "EduTech Funding Surges in 2025",
    desc: "Startups focusing on school education raise over $500M.",
    url: "#",
  },
];

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { User } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_841366d162f6b814ef33f0efbf11caf757ec9&q=Schools,education,technology,sports,"
        );
        const data = await response.json();
        setNewsData(
          data.results?.map((item) => ({
            title: item.title,
            desc:
              item.description || "Read more about this school-related news",
            url: item.link || "#",
            image: item.image_url,
          })) || news
        );
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsData(news);
      } finally {
        setIsLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_57myzxh",
        "template_nqtzuii",
        form.current,
        "Yjkl8ImWD30CMk0qH"
      )
      .then(
        () => {
          setResult("Message sent successfully!");
          form.current.reset();
        },
        () => setResult("Something went wrong. Try again.")
      )
      .finally(() => setLoading(false));
  };


  return (
    <div className="w-full scroll-smooth font-sans">
      <RegistrationPopup />

      {/* Header */}
      <Header User={User} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 md:p-16 lg:p-24 bg-gradient-to-r from-purple-300 to-blue-300"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
          Find the Best School
        </h2>
        <p className="mt-2 text-base md:text-lg text-white max-w-md md:max-w-xl">
          Use our filters to search schools based on location, budget,
          academics, and extracurriculars.
        </p>
        <Link
          to="/schools"
          className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
        >
          Explore Now
        </Link>
      </motion.section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-gray-100 text-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Why Choose Scholastic?
        </h3>
        <p className="mt-2 text-gray-600 text-base md:text-lg">
          We make finding the perfect school easier than ever!
        </p>
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className="p-4 md:p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition-transform hover:scale-105"
            >
              <h4 className="text-lg md:text-xl font-semibold text-purple-600 mb-2">
                {feat.title}
              </h4>
              <p className="text-sm md:text-base text-gray-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* About Section */}
      <section className="py-12 md:py-16 bg-white text-center overflow-hidden">
  <h3 className="text-2xl md:text-3xl font-bold text-purple-700 mb-6">
    Latest School News
  </h3>
  {isLoadingNews ? (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  ) : (
   <div className="relative w-full max-w-6xl mx-auto overflow-x-auto px-4">


      <motion.div 
        className="flex space-x-6"
        animate={{ x: isHovered ? 0 : ["-100%", "0%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        {[...newsData, ...newsData].map((item, i) => {
          // Truncate description to 100 words max
          const words = item.desc.split(" ");
          const truncatedDesc = words.slice(0, 100).join(" ");
          const showEllipsis = words.length > 100;

          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-50 border border-purple-200 rounded-xl p-4 w-[300px] h-[400px] flex flex-col shadow-md hover:shadow-lg flex-shrink-0 transition-shadow duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {item.image && (
                <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <h4 className="text-lg font-bold text-purple-800 mb-3 line-clamp-2">
                {item.title}
              </h4>
              <div className="flex-grow overflow-hidden">
                <p className="text-purple-700 text-sm line-clamp-5">
                  {truncatedDesc}
                  {showEllipsis && "..."}
                </p>
              </div>
              {showEllipsis && (
                <span className="text-purple-600 text-xs mt-2 inline-block">
                  Read more →
                </span>
              )}
            </a>
          );
        })}
      </motion.div>
    </div>
  )}
</section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 px-4 bg-purple-50" id="contact">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
            Connect with Us
          </h3>
          <p className="text-purple-700 mb-6 md:mb-8">
            We'd love to hear from you — whether it's feedback, collaboration,
            or support queries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              {
                icon: "fas fa-envelope",
                title: "Email Us",
                content: "nishchayparashar2004@gmail.com",
                href: "mailto:nishchayparashar2004@gmail.com",
              },
              {
                icon: "fas fa-phone",
                title: "Call Us",
                content: "+91 8439132067",
                href: "tel:+918439132067",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md p-4 md:p-6 flex items-center space-x-3 md:space-x-4 hover:shadow-xl transition"
              >
                <i
                  className={`${item.icon} text-purple-600 text-2xl md:text-3xl`}
                ></i>
                <div className="text-left">
                  <h4 className="font-semibold text-base md:text-lg text-gray-800">
                    {item.title}
                  </h4>
                  <a
                    href={item.href}
                    className="text-purple-700 hover:underline text-sm md:text-base"
                  >
                    {item.content}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>


          {result && (
            <p className="mt-4 text-purple-700 font-medium">{result}</p>
          )}

          <div className="mt-8 md:mt-10 flex justify-center space-x-4 md:space-x-6 text-purple-700 text-xl md:text-2xl">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-purple-900 transition"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-purple-100 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-800 mb-4">
            Join Our Growing Community
          </h3>
          <p className="text-purple-700 text-base md:text-lg mb-8 md:mb-10">
            Over <strong>1,500+ parents</strong> trust Scholastic to guide their
            school choices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 text-purple-800">
            {[
              { value: "0.5K+", label: "Active Members" },
              { value: "1K+", label: "School Reviews" },
              { value: "500+", label: "Schools Rated" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h4 className="text-2xl md:text-3xl font-bold mb-1">
                  {stat.value}
                </h4>
                <p className="text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="https://chat.whatsapp.com/DXAFvpV7gKcIWv35SfVHaI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 md:px-8 py-2 md:py-3 bg-purple-600 text-black text-base md:text-lg rounded-lg shadow-lg hover:bg-purple-700 transition"
            >
              Join Our Whatsapp Community Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

const RegistrationPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("hasSeenPopup")) {
      setTimeout(() => {
        setShowPopup(true);
        document.body.style.overflow = "hidden";
      }, 1000);
    }
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      sessionStorage.setItem("hasSeenPopup", "true");
      document.body.style.overflow = "auto";
    }, 300);
  };

  const handleRemindLater = () => {
    handleClose();
    setTimeout(() => {
      setShowPopup(true);
      document.body.style.overflow = "hidden";
    }, 3000);
  };

  if (!showPopup) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isClosing ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-[100] bg-black/30"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={
          isClosing
            ? { scale: 0.95, y: 10, opacity: 0 }
            : { scale: 1, y: 0, opacity: 1 }
        }
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white/95 p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm max-w-xs sm:max-w-sm md:max-w-md w-full mx-4 text-center relative border border-gray-200/50"
      >
        <button
          className="absolute top-1 right-3 text-black hover:text-red-500 text-xl"
          onClick={handleClose}
          aria-label="Close popup"
        >
          &times;
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-purple-800">
          Join Scholastic Today!
        </h2>
        <p className="text-black mb-4 md:mb-6 text-sm md:text-base">
          Register to access school comparisons, news updates, and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition flex-1 text-center font-medium text-sm md:text-base"
          >
            Register Now
          </Link>
          <button
            onClick={handleRemindLater}
            className="border border-gray-300/70 text-gray-700 px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition flex-1 font-medium text-sm md:text-base"
          >
            Remind Me Later
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
