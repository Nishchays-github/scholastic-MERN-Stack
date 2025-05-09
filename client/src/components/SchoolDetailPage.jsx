import React, { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, X } from "lucide-react";
import useAuthStore from "../useAuthstore.js";

const SchoolDetailPage = ({ selectedSchool, setSelectedSchool }) => {
    const { bookmarkedschool, bookmarkschool, User, fetchbookmarks, deleteBookmark } = useAuthStore();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loadingBookmarks, setLoadingBookmarks] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false); // New state for bookmark operation

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            if (!selectedSchool || !User?.email) {
                setLoadingBookmarks(false);
                return;
            }
    
            try {
                // Fetch the latest bookmarks
                await fetchbookmarks(User.email);
                
                // Ensure bookmarkedschool is treated as an array and check bookmark status
                const bookmarked = Array.isArray(bookmarkedschool) && 
                    bookmarkedschool.some(
                        school => school && 
                                 school.schoolName === selectedSchool.name && 
                                 school.schoolAddress === selectedSchool.address
                    );
                
                setIsBookmarked(bookmarked);
            } catch (error) {
                console.error('Error checking bookmark status:', error);
            } finally {
                setLoadingBookmarks(false);
            }
        };
    
        checkBookmarkStatus();
    }, [selectedSchool, User, bookmarkedschool, fetchbookmarks]);

    const bookmark = async () => {
        if (isProcessing) return; // Prevent multiple clicks
        
        setIsProcessing(true); // Start processing
        
        try {
            if (!User?.email) {
                alert('Please login to bookmark schools');
                return;
            }
    
            const bookmarkData = {
                email: User.email,
                schoolName: selectedSchool.name,
                schoolAddress: selectedSchool.address
            };
    
            if (isBookmarked) {
                await deleteBookmark(bookmarkData);
                setIsBookmarked(false);
                await fetchbookmarks(User.email);
                alert('Bookmark removed successfully!');
            } else {
                await bookmarkschool(bookmarkData);
                setIsBookmarked(true);
                await fetchbookmarks(User.email);
                alert('School bookmarked successfully!');
            }
        } catch (error) {
            console.error('Bookmark error:', error);
            alert(error.message || 'Failed to update bookmark');
        } finally {
            setIsProcessing(false); // End processing
        }
    };

    if (!selectedSchool) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-6">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={() => setSelectedSchool(null)}
                >
                    <X />
                </button>

                {/* Main Content */}
                <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-xl flex items-center justify-center">
                    <span className="text-5xl">🏫</span>
                </div>

                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{selectedSchool.name}</h2>
                            <p className="text-gray-600 text-sm">📍 {selectedSchool.address}</p>
                        </div>
                        {/* Only show bookmark button if user is logged in */}
                        {User?.email && (
                            <button 
                                onClick={bookmark}
                                className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center min-w-[40px]"
                                disabled={loadingBookmarks || isProcessing}
                            >
                                {loadingBookmarks ? (
                                    <span className="loading-spinner"></span>
                                ) : isProcessing ? (
                                    <span className="text-sm">Waiting...</span>
                                ) : isBookmarked ? (
                                    <BookmarkCheck className="text-blue-600" size={24} />
                                ) : (
                                    <Bookmark className="text-gray-400 hover:text-blue-500" size={24} />
                                )}
                            </button>
                        )}
                    </div>

                    {/* Rest of your component remains the same */}
                    {/* Rating & Distance */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                            <span className="text-yellow-500 font-bold">⭐ {selectedSchool.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">({selectedSchool.reviews} reviews)</span>
                        </div>
                    </div>

                    {/* About & Facilities */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">About the School</h3>
                        <p className="text-gray-600 text-sm">{selectedSchool.description}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Facilities</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {selectedSchool.facilities.map((facility, index) => (
                                <div key={index} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                                    <span className="text-purple-500 mr-2">✓</span>
                                    <span className="text-gray-700 text-sm">{facility}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolDetailPage;