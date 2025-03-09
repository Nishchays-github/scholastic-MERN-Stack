import React, { useState } from "react";

const faqData = {
  parents: [
    { question: "Can I apply to schools directly through Scholastic?", answer: "Yes, Scholastic allows you to submit applications to multiple schools and track their status in one place." },
    { question: "Are the schools listed on Scholastic verified?", answer: "Yes, all schools undergo a verification process to ensure that the information provided is accurate and up-to-date." },
    { question: "How do I know if the school is within my budget?", answer: "You can use our budget filter to set your price range. Scholastic will display schools within your specified budget, along with detailed fee structures (if provided by the school)." },
    { question: "Does Scholastic provide reviews from other parents?", answer: "Yes! Our platform includes a reviews section where parents share their experiences with schools. This can help you make an informed decision by learning from the experiences of others." },
    { question: "Can I book a school tour through Scholastic?", answer: "Absolutely! Many schools on our platform offer the option to schedule tours. Look for the 'Book a Visit' button on a school's profile, and we'll help coordinate your visit." },
    { question: "What if I don't find schools in my area?", answer: "Scholastic is constantly expanding our database. If you don't see schools in your area, let us know via the 'Contact Us' page, and we'll prioritize adding schools from your region." }
  ],
  schools: [
    { question: "How can our school be listed on Scholastic?", answer: "You can register your school by clicking on the 'Register Your School' button on the homepage and filling out the required details. Our team will verify your information and approve your listing." },
    { question: "Can we update my school's profile after registration?", answer: "Yes, you can update your school's profile, including fee structure, facilities, and contact details, through your admin dashboard." },
    { question: "How much do we need to pay for your services?", answer: "Basic listing on Scholastic is completely free. However, if you opt for premium services like priority placement, customized marketing campaigns, or enhanced profiles with additional features, there may be associated charges. For detailed pricing, please feel free to contact our support team." },
    { question: "Why do we need another website when we already have a school website?", answer: "Scholastic complements your school website by increasing its visibility to a larger audience. Parents who are actively searching for schools on Scholastic may not visit individual school websites. Being listed on our platform ensures that your school is part of their search results, driving more inquiries and potential enrollments." },
    { question: "Can we showcase achievements or testimonials on our profile?", answer: "Yes, schools can highlight their achievements, awards, testimonials, and even upload photos or videos to create an appealing profile. This helps you stand out and attract more parents." }
  ]
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("parents");
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">Frequently Asked Questions</h1>

        {/* Tabs Section */}
        <div className="flex justify-center mb-6 border-b border-gray-300">
          <button
            className={`px-6 py-3 font-medium text-lg ${activeTab === "parents" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("parents")}
          >
            By Parents
          </button>
          <button
            className={`px-6 py-3 font-medium text-lg ${activeTab === "schools" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("schools")}
          >
            By Schools
          </button>
        </div>

        {/* FAQ Content */}
        <div className="space-y-4">
          {faqData[activeTab].map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                className={`w-full text-left p-4 font-medium text-lg bg-gray-100 ${openFAQ === index ? "text-purple-600" : "text-gray-700"}`}
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
              </button>
              {openFAQ === index && (
                <div className="p-4 bg-gray-50 border-t">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
