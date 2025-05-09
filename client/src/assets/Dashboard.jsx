import React, { useEffect, useState } from "react";
import {
  LogOut,
  Bookmark,
  School,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Heart } from "lucide-react";
import useAuthStore from "../useAuthstore.js";
import { useNavigate } from "react-router-dom";

const ProfileDashboard = () => {
  const {
    User,
    logout,
    bookmarkedschool,
    fetchbookmarks,
    deleteBookmark,
    checkAuth,
    fetchDiscussion,
    deleteDiscussion,
  } = useAuthStore();
   useEffect(() => {
    checkAuth();
    fetchUserData();
  }, []);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setLoading(true);
    try {
      await fetchbookmarks(User.email);
      const res = await fetchDiscussion();
      const userReviews =
        res.data?.filter((discussion) => discussion.userEmail === User.email) ||
        [];
      setReviews(userReviews);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const unbookmark = async (schoolName, schoolAddress) => {
    const bookmarkData = {
      email: User.email,
      schoolName,
      schoolAddress,
    };
    await deleteBookmark(bookmarkData);
    await fetchbookmarks(User.email);
  };
  const handleRemoveReview = async (userEmail, reviewId, discussionId) => {
    try {
      setLoading(true);
      const data = { userEmail, reviewId, discussionId };
      await deleteDiscussion(data); // Await the deletion
  
      // Now remove the deleted review from local state
      setReviews((prevReviews) =>
        prevReviews
          .map((discussion) => {
            if (discussion._id !== discussionId) return discussion;
  
            const updatedReviews = discussion.reviews.filter(
              (review) => review._id !== reviewId
            );
  
            return { ...discussion, reviews: updatedReviews };
          })
          .filter((discussion) => discussion.reviews.length > 0) // remove discussion with no reviews
      );
    } catch (error) {
      console.error("Failed to delete review:", error);
      alert(error.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };
  

  // In your render method, call it like this

  const logoutuser = async () => {
    await logout();
    navigate("/");
  };

  if (!User) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-md max-w-md mx-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Session Expired
          </h2>
          <p className="text-gray-600 mb-4">
            Please login to view your profile
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate("/")} 
            className="text-xl font-bold text-gray-900 hover:text-purple-600 transition border-amber-100 hover:cursor-pointer"
          >
            Home Page
          </button>
          <button
            onClick={logoutuser}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5 hover:w-7 hover:h-7" />
            <span className="hidden sm:inline hover:cursor-pointer hover:text-red-950">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card (Left Column) - Kept original styling */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={User.photo || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 mb-4"
                  />
                  <h2 className="text-xl font-bold text-gray-900">
                    {User.name}
                  </h2>
                  <p className="text-gray-600">{User.email}</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                      <UserIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="text-sm text-gray-900">{User.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{User.email}</p>
                    </div>
                  </div>

                  {User.phone && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">
                          Phone
                        </p>
                        <p className="text-sm text-gray-900">{User.phone}</p>
                      </div>
                    </div>
                  )}

                  {User.gender && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                        <Heart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">
                          Gender
                        </p>
                        <p className="text-sm text-gray-900">{User.gender}</p>
                      </div>
                    </div>
                  )}

                  {User.age && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p className="text-sm text-gray-900">{User.age}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Schools and Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bookmarked Schools Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Bookmark className="h-5 w-5 text-blue-600 mr-2" />
                  My Saved Schools
                </h3>
              </div>

              {loading ? (
                <div className="p-6 text-center">Loading...</div>
              ) : bookmarkedschool?.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {bookmarkedschool.map((school, index) => (
                    <li key={index} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                          <School className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-base font-medium text-gray-900">
                            {school.schoolName}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {school.schoolAddress}
                          </p>
                          <div className="mt-2 flex space-x-3">
                            <button
                              className="text-sm text-red-600 hover:text-red-800 "
                              onClick={() =>
                                unbookmark(
                                  school.schoolName,
                                  school.schoolAddress
                                )
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center">
                  <div className="text-gray-400 mb-2">
                    <Bookmark className="h-12 w-12 mx-auto" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">
                    No saved schools yet
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Bookmark schools to see them listed here
                  </p>
                </div>
              )}
            </div>

            {/* My Reviews Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                  My Reviews
                </h3>
              </div>

              {loading ? (
                <div className="p-6 text-center">Loading...</div>
              ) : reviews.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {reviews.flatMap((discussion) =>
                    discussion.reviews?.map((review, index) => (
                      <li
                        key={`${discussion._id}-${index}`}
                        className="p-6 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {new Date(review.timePosted).toLocaleString()}
                                </p>
                                <p className="mt-1 text-gray-900">
                                  {review.content}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  handleRemoveReview(
                                    discussion.userEmail,
                                    review._id,
                                    discussion._id
                                  )
                                }
                                className="text-sm text-red-600 hover:text-red-800 hover:cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              ) : (
                <div className="p-6 text-center">
                  <div className="text-gray-400 mb-2">
                    <MessageSquare className="h-12 w-12 mx-auto" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">
                    No reviews yet
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Your reviews will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDashboard;
