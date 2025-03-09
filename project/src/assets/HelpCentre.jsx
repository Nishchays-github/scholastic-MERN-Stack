import React from "react";

const HelpCentre = () => {
  return (
    <div className="max-w-3xl mx-auto my-12 bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-center text-3xl font-bold text-purple-600 mb-4">Help Centre</h1>
      <p className="text-gray-700 text-lg text-center">
        Welcome to the Scholastic Help Centre! Here you'll find answers to common questions, helpful resources, and ways to get in touch with us for further assistance.
      </p>

      {/* FAQ Section */}
      <h2 className="text-2xl font-semibold text-purple-600 mt-8">Frequently Asked Questions (FAQs)</h2>
      
      <div className="mt-4 space-y-6">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-800">1. How do I register for an account?</h3>
          <p className="text-gray-600">
            You can register for an account by visiting our <a href="/register" className="text-purple-600 underline">Registration Page</a>.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-800">2. I forgot my password. How do I reset it?</h3>
          <p className="text-gray-600">
            Reset your password on the <a href="/forgot-password" className="text-purple-600 underline">Forgot Password Page</a>.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-800">3. How do I search for schools?</h3>
          <p className="text-gray-600">
            Use our <a href="/schools" className="text-purple-600 underline">Schools Page</a> with advanced filters to find the right school.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-800">4. How do I contact support?</h3>
          <p className="text-gray-600">
            Reach out via <a href="/contact" className="text-purple-600 underline">Contact Us</a> or email us at 
            <a href="mailto:support@scholastic.com" className="text-purple-600 underline"> support@scholastic.com</a>.
          </p>
        </div>
      </div>

      {/* Contact Us Section */}
      <h2 className="text-2xl font-semibold text-purple-600 mt-8">Contact Us</h2>
      <div className="p-4 bg-gray-100 rounded-lg mt-4">
        <p className="text-gray-700">For further assistance, contact us:</p>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          <li>Email: <a href="mailto:support@scholastic.com" className="text-purple-600 underline">support@scholastic.com</a></li>
          <li>Call Us: <a href="tel:+919057887244" className="text-purple-600 underline">+91 9057887244</a></li>
          <li>Office Hours: Monday to Friday, 9:00 AM - 5:00 PM</li>
        </ul>
      </div>

      {/* Additional Resources */}
      <h2 className="text-2xl font-semibold text-purple-600 mt-8">Additional Resources</h2>
      <ul className="list-disc ml-6 mt-2 text-gray-700">
        <li><a href="/privacy-policy" className="text-purple-600 underline">Privacy Policy</a></li>
        <li><a href="/terms" className="text-purple-600 underline">Terms of Service</a></li>
        <li><a href="/about" className="text-purple-600 underline">About Us</a></li>
      </ul>
    </div>
  );
};

export default HelpCentre;
