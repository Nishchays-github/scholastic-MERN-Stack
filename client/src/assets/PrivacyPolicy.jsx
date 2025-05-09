const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Privacy Policy
          </h1>
  
          <p className="text-gray-700">
            At <strong>Scholastic</strong>, we prioritize your privacy. This Privacy Policy explains how we collect, use, and protect
            your information when you use our website and services.
          </p>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">1. Information We Collect</h2>
          <p className="text-gray-700">We may collect the following types of information:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and other registration details.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and interactions.</li>
            <li><strong>Cookies:</strong> Data stored on your device to improve user experience.</li>
          </ul>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">2. How We Use Your Information</h2>
          <p className="text-gray-700">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Provide and improve our services.</li>
            <li>Personalize user experiences.</li>
            <li>Send updates, notifications, and promotional materials.</li>
            <li>Ensure security and prevent fraudulent activity.</li>
          </ul>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">3. Sharing Your Information</h2>
          <p className="text-gray-700">We do not sell or rent your personal information. However, we may share your information with:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Service providers assisting us in running the platform.</li>
            <li>Authorities if required by law.</li>
          </ul>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">4. Data Security</h2>
          <p className="text-gray-700">We implement advanced security measures to protect your data. However, no system is completely secure.</p>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">5. Cookies</h2>
          <p className="text-gray-700">
            We use cookies to improve your browsing experience. You can manage or disable cookies in your browser settings.
          </p>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">6. Your Rights</h2>
          <p className="text-gray-700">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Access your personal data.</li>
            <li>Request corrections to inaccurate information.</li>
            <li>Request deletion of your data.</li>
            <li>Opt-out of receiving marketing communications.</li>
          </ul>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">7. Updates to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date.
          </p>
  
          <h2 className="text-2xl text-purple-600 font-semibold mt-6">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at
            <a href="mailto:privacy@scholastic.com" className="text-blue-600 hover:underline ml-1">privacy@scholastic.com</a>.
          </p>
  
          <p className="text-gray-600 text-center mt-6">Last Updated: January 24, 2025</p>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;
  