import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ToolsSection = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState("");

  const handleToolSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedTool(selectedValue);

    // Redirect when an option is selected
    if (selectedValue === "todo") {
      navigate("/todo");
    }
  };

  return (
    <section className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <header className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Tools & Widgets</h2>
      </header>

      {/* Dropdown for Tools */}
      <div className="flex justify-center">
        <select
          value={selectedTool}
          onChange={handleToolSelect}
          className="w-60 px-4 py-3 border rounded-md text-lg font-medium bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>Select a Tool</option>
          <option value="todo">To-Do App</option>
        </select>
      </div>
    </section>
  );
};

export default ToolsSection;
