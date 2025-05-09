import React from "react";

const EmptySidebar = ({ showOnlineOnly }) => {
  return (
    <div className="text-center text-zinc-500 py-4">
      {showOnlineOnly ? "No online users" : "No contacts available"}
    </div>
  );
};

export default EmptySidebar;
