import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../useAuthstore.js";
import Header from "../components/Header.jsx";

const DiscussionForum = () => {
  const { User, addDiscussion, fetchDiscussion } = useAuthStore();
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch discussions when component mounts
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        setInitialLoading(true);
        const response = await fetchDiscussion();
        setDiscussions(response.data || []);
      } catch (error) {
        console.error("Failed to load discussions:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadDiscussions();
  }, [fetchDiscussion]);

  const handleAddDiscussion = async () => {
    if (!newDiscussion.trim()) {
      alert("Please write something before posting!");
      return;
    }

    try {
      setLoading(true);
      const data = {
        email: User.email,
        content: newDiscussion
      };
      
      const response = await addDiscussion(data);
      
      // Update local state with new discussion
      if (response.success) {
        setDiscussions(prev => {
          const existing = prev.find(d => d.userEmail === User.email);
          if (existing) {
            return prev.map(d => 
              d.userEmail === User.email 
                ? response.data 
                : d
            );
          }
          return [...prev, response.data];
        });
        setNewDiscussion("");
      }
    } catch (error) {
      console.error("Failed to add discussion:", error);
      alert("Failed to post discussion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Loading discussions...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header User={User} />

      <section className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Write a review</h2>
        <textarea
          rows="4"
          placeholder="Write your post here..."
          className="w-full p-3 mt-4 border rounded-lg focus:outline-purple-400"
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleAddDiscussion}
          disabled={loading || !User}
          className={`mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
        {!User && (
          <p className="text-red-500 mt-2">
            Please <Link to="/login" className="underline">login</Link> to post a discussion
          </p>
        )}
      </section>

      <section className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Discussions</h2>
        {discussions.length === 0 ? (
          <p className="text-gray-500">No discussions yet. Be the first to post!</p>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion._id} className="bg-white p-4 rounded-lg shadow-md mt-4">
              <h4 className="font-semibold">{discussion.userEmail}</h4>
              {discussion.reviews?.map((review, index) => (
                <div key={index} className="mt-2 border-t pt-2">
                  <p className="text-gray-700">{review.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Posted on: {new Date(review.timePosted).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default DiscussionForum;