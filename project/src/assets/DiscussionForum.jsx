import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [userId, setUserId] = useState("Anonymous");

  useEffect(() => {
    axios.get("http://localhost:5000/api/discussions").then((response) => {
      setDiscussions(response.data);
    });
  }, []);

  const addDiscussion = async () => {
    if (newDiscussion.trim() === "") {
      alert("Please write something before posting!");
      return;
    }

    const discussionData = { userId, question: newDiscussion.trim() };
    await axios.post("http://localhost:5000/api/discussions", discussionData);

    setDiscussions([...discussions, discussionData]);
    setNewDiscussion("");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="bg-white shadow-md p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Scholastic
          </Link>
        </div>
      </header>

      <section className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Start a Discussion</h2>
        <textarea
          rows="4"
          placeholder="Write your post here..."
          className="w-full p-3 mt-4 border rounded-lg focus:outline-purple-400"
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
        />
        <button
          onClick={addDiscussion}
          className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
        >
          Post
        </button>
      </section>

      <section className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Discussions</h2>
        {discussions.map((discussion) => (
          <div key={discussion._id} className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h4 className="font-semibold">{discussion.userId}</h4>
            <p className="text-gray-700">{discussion.question}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DiscussionForum;
