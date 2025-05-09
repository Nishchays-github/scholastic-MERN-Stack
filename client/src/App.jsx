import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/Home.jsx";
import Register from "./assets/Register.jsx";
import Login from "./assets/Login.jsx";
import Layout from "./components/Layout";
import Schools from "./assets/Schools.jsx";
import Scholarship from "./assets/Scholarship.jsx";
import Services from "./assets/Services.jsx";
import Contact from "./assets/Contact.jsx";
import FAQs from "./assets/FAQ.jsx";
import About from "./assets/About.jsx";
import Article from "./assets/Article.jsx";
import Result from "./assets/Result.jsx";
import Community from "./assets/Community.jsx";
import Quiz from "./assets/ItQuiz.jsx";
import Dashboard from "./assets/Dashboard.jsx";
import { useEffect } from "react";
import useAuthstore from "./useAuthstore.js"
import DiscussionForum from "./assets/DiscussionForum.jsx";
const App = () => {
  const {checkAuth} = useAuthstore();
  useEffect(() => {
    checkAuth(); // from useAuthStore
}, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Home Page ✅ */}
      <Route path="/layout" element={<Layout />} />  {/* Home Page ✅ */}
      <Route path="/register" element={<Register />} />  {/* Register Page ✅ */}
      <Route path="/login" element={<Login />} />  {/* Login Page ✅ */}
      <Route path="/schools" element={<Schools />} />  {/* Schools Page ✅ */}
      <Route path="/services" element={<Services />} />  {/* Services Page ✅ */}
      <Route path="/about" element={<About />} />  {/* About Page ✅ */}
      <Route path="/article" element={<Article />} />  {/* Article Page ✅ */}
      <Route path="/result" element={<Result />} />  {/* Result Page ✅ */}
      <Route path="/contact" element={<Contact />} />  {/* Contact Page ✅ */}
      <Route path="/faqs" element={<FAQs />} />  {/* FAQs Page ✅ */}
      <Route path="/scholarship" element={<Scholarship />} />  {/* FAQs Page ✅ */}
      <Route path="/community" element={<Community />} />  {/* Community Page ✅ */}
      <Route path="/quiz" element={<Quiz />} />  {/* Quiz Page ✅ */}
      <Route path="/dashboard" element={<Dashboard />} />  {/* Quiz Page ✅ */}
      <Route path="/discussion" element={<DiscussionForum />} />  {/* Quiz Page ✅ */}
      {/* <Route path="/tools" element={<ToolsSection />} /> */}
      {/* <Route path="/todo" element={<TodoApp />} /> ✅ To-Do App Route */}

    </Routes>
  );
};

export default App;