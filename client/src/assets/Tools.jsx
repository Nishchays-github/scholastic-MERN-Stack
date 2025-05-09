import React from "react";

const ToolsSection = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tools & Widgets</h2>
        </header>
        <div className="flex flex-wrap justify-around gap-4">
          {/* Notes App Button */}
          <a
            href="note.html"
            className="flex-1 min-w-[150px] text-center bg-blue-600 text-white py-3 rounded-md text-lg transition duration-300 hover:bg-blue-800"
            aria-label="Open Notes App"
          >
            Notes App
          </a>

          Comparison Tool Button
          <a
            href="compareschoolfilter.html"
            className="flex-1 min-w-[150px] text-center bg-blue-600 text-white py-3 rounded-md text-lg transition duration-300 hover:bg-blue-800"
            aria-label="Compare Schools"
          >
            Compare Schools
          </a>

          {/* Other Tool Button */}
          <a
            href="#other-widget"
            className="flex-1 min-w-[150px] text-center bg-blue-600 text-white py-3 rounded-md text-lg transition duration-300 hover:bg-blue-800"
            aria-label="Other Widget"
          >
            Other Tool
          </a>
        </div>
      </section>
    </div>
  );
};

export default ToolsSection;
