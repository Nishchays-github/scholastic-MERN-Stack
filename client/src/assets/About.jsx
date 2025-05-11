import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import useAuthStore from "../useAuthstore.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {User} = useAuthStore();
  return (
    <div className="w-full scroll-smooth font-sans">
          {/* Header */}
          <Header User={User} />

      {/* About Content */}

      <motion.header
  className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 bg-gradient-to-r from-purple-300 to-blue-300"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">About Scholastic</h1>
  <p className="text-lg text-white max-w-2xl">
    Scholastic empowers families with reliable school ratings, verified data, and real community insights—
    helping you make confident, informed educational decisions.
  </p>
</motion.header>


<div className="text-gray-800 dark:text-white min-h-screen px-4 py-10">
<div className="max-w-5xl mx-auto">
          <section className="mb-10">
  <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Story</h2>
  <p className="text-gray-600">
    Scholastic began as a simple idea in a college dorm room — a desire to simplify the school selection process
    for families across India. What started as a small side project has grown into a trusted platform visited by
    thousands of parents and students every month. With contributions from real people, verified data from education boards,
    and advanced search filters, Scholastic empowers families to make confident and informed decisions.
  </p>
</section>

<section className="mb-10">
  <h2 className="text-2xl font-bold text-purple-600 mb-2">What Makes Us Different</h2>
  <ul className="list-disc pl-6 space-y-2 text-black dark:text-black">
    <li><strong>User-Driven:</strong> Reviews and ratings come directly from verified users — no paid promotions.</li>
    <li><strong>City-Based Top Picks:</strong> We curate the top schools in major metro cities with real-time performance metrics.</li>
    <li><strong>Integrated Tools:</strong> From result tracking to school comparison charts, we offer interactive tools to enhance your decision-making.</li>
    <li><strong>Accessibility:</strong> A mobile-first design ensures that anyone, anywhere, can access quality school data.</li>
  </ul>
</section>


          <section className="mb-10">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              Scholastic is committed to helping students, parents, and educators make informed
              decisions by offering comprehensive school ratings, verified data, and genuine
              community reviews. Whether you're looking for the best schools in your city or
              want to contribute insights, Scholastic connects the education ecosystem in one place.
            </p>
          </section>

          <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-black dark:text-black">

              <li><strong>Transparency:</strong> Honest, open, and clear data and reviews.</li>
              <li><strong>Accuracy:</strong> Verified school statistics and reliable user content.</li>
              <li><strong>Community:</strong> Built by contributions from students and parents.</li>
              <li><strong>Education First:</strong> We believe informed choices shape better futures.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-purple-600 mb-2">Meet the Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-gray-600">
  
                <div className="text-center">
                  <img
                    src={'https://i.postimg.cc/FKmP8z5N/linkedin.jpg'}
                    alt='Nishchay Parashar'
                    className="w-28 h-28 mx-auto rounded-full mb-3 border-2 border-gray-300 dark:border-gray-600"
                  />
                  <p className="font-medium">Nishchay Parashar</p>
                  
                </div>
            </div>
          </section>
        </div>
      </div>
                {/* Footer Top Section */}
 
          <Footer/>
    </div>
  );
};

export default About;