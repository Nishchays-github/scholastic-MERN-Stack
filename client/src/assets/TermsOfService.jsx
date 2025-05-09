import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-3xl w-full p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">Terms of Service</h1>
        <p className="text-gray-700">
          Welcome to <strong>Scholastic</strong>. By accessing or using our platform, you agree to comply with and be bound by these Terms of Service. 
          Please read them carefully before using our services.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By using our website and services, you acknowledge that you have read, understood, and agree to these terms. If you do not agree, please do not use our platform.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">2. Changes to Terms</h2>
        <p className="text-gray-700">
          Scholastic reserves the right to update or modify these terms at any time. Changes will be posted on this page with an updated "Last Updated" date. 
          Continued use of the platform constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">3. Use of the Platform</h2>
        <p className="text-gray-700">Users agree to:</p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Provide accurate and up-to-date information during registration.</li>
          <li>Use the platform for lawful purposes only.</li>
          <li>Not attempt to disrupt or harm the website, its users, or its data.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">4. User Accounts</h2>
        <p className="text-gray-700">
          You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account.
          Notify us immediately if you suspect unauthorized use of your account.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">5. Intellectual Property</h2>
        <p className="text-gray-700">
          All content, including text, images, logos, and software on the Scholastic platform, is owned by Scholastic and protected by copyright and other intellectual property laws.
          Users may not copy, modify, or distribute any content without prior permission.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">6. Disclaimer of Warranties</h2>
        <p className="text-gray-700">
          Scholastic provides its services "as is" without warranties of any kind, either express or implied. We do not guarantee that the platform will be error-free, secure, or uninterrupted.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">7. Limitation of Liability</h2>
        <p className="text-gray-700">
          Scholastic is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our platform, even if we have been advised of the possibility of such damages.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">8. Termination</h2>
        <p className="text-gray-700">
          Scholastic reserves the right to terminate or suspend your access to the platform at our discretion, without notice, for any violation of these terms.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">9. Governing Law</h2>
        <p className="text-gray-700">
          These terms are governed by and construed in accordance with the laws of India. Any disputes will be resolved exclusively in the courts of India.
        </p>

        <h2 className="text-2xl font-semibold text-purple-600 mt-6">10. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about these Terms of Service, please contact us at 
          <a href="mailto:terms@scholastic.com" className="text-purple-600 hover:underline"> terms@scholastic.com</a>.
        </p>

        <p className="text-center text-gray-600 mt-6">Last Updated: January 24, 2025</p>
      </div>
    </div>
  );
};

export default TermsOfService;

