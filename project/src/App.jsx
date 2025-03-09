import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/Home.jsx";
import Register from "./assets/Register.jsx";
import Login from "./assets/Login.jsx";
import Schools from "./assets/Schools.jsx";
import Services from "./assets/Services.jsx";
import Contact from "./assets/Contact.jsx";
import FAQs from "./assets/FAQ.jsx";
import Community from "./assets/DiscussionForum.jsx";
import Quiz from "./assets/ItQuiz.jsx";

// import TodoApp from "./assets/todoapp/TodoApp.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Home Page ✅ */}
      <Route path="/register" element={<Register />} />  {/* Register Page ✅ */}
      <Route path="/login" element={<Login />} />  {/* Login Page ✅ */}
      <Route path="/schools" element={<Schools />} />  {/* Schools Page ✅ */}
      <Route path="/services" element={<Services />} />  {/* Services Page ✅ */}
      <Route path="/contact" element={<Contact />} />  {/* Contact Page ✅ */}
      <Route path="/faqs" element={<FAQs />} />  {/* FAQs Page ✅ */}
      <Route path="/community" element={<Community />} />  {/* Community Page ✅ */}
      <Route path="/quiz" element={<Quiz />} />  {/* Quiz Page ✅ */}
      {/* <Route path="/tools" element={<ToolsSection />} /> */}
      {/* <Route path="/todo" element={<TodoApp />} /> ✅ To-Do App Route */}
    </Routes>
  );
};

export default App;