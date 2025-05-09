import { create } from 'zustand';
import { instance } from './lib/axios.js';

const useAuthStore = create((set, get) => ({
    User: null,
    bookmarkedschool: [],
    discussions:[],
    signup: async (data) => {   
        try {
            const res = await instance.post('/auth/signup', data);
            console.log('hello',res.data);
            set({ User: res.data });
            return res.data;
        } catch (error) {
            set({ User: null });
            throw error;
        }
    },

    login: async (data) => {
        try {
            const res = await instance.post('/auth/login', data);
            set({ User: res.data });
            return res.data;
        } catch (error) {
            set({ User: null });
            throw error;
        }
    },

    logout: async () => {
        try {
            await instance.post('/auth/logout');
            set({ 
                User: null,
                bookmarkedschool: null 
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
    
    checkAuth: async () => {
        try {
            const res = await instance.get("/auth/check-auth");
           console.log('hello',res.data);
            set({ User: res.data });
        } catch (error) {
            set({ User: null });
            console.error("Auth check failed:", error);
        }
    },
    
    fetchbookmarks: async (email) => {
        try {
            const res = await instance.get('/auth/fetch-bookmark', {
                params: { email }  // Send email as query parameter
            });
            set({ 
                bookmarkedschool: res.data.bookmarks || res.data // Handle both response formats
            });
            return res.data;
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            set({ bookmarkedschool: [] }); // Set to empty array instead of null
            throw error;
        }
    },
    
    bookmarkschool: async (schoolData) => {
        try {
            const res = await instance.post('/auth/bookmark', schoolData);
            
            // Update local state immediately after successful bookmark
            const currentBookmarks = get().bookmarkedschool || [];
            set({ 
                bookmarkedschool: [...currentBookmarks, res.data.newBookmark]
            });
            
            return res.data;
        } catch (error) {
            console.error('Error bookmarking school:', error);
            
            // Check if it's a "already bookmarked" error
            if (error.response?.data?.message?.includes('already bookmarked')) {
                throw new Error('This school is already bookmarked');
            }
            
            throw error;
        }
    },
    // Add this to your useAuthStore actions
    deleteBookmark: async (bookmarkData) => {
        try {
            const res = await instance.delete('/auth/delete-bookmark', {
                data: bookmarkData  // For DELETE requests, axios expects the payload in a 'data' property
            });
            
            const data = res.data;  // Axios response data is in the 'data' property
            
            if (res.status !== 200) {
                throw new Error(data.message || 'Failed to delete bookmark');
            }
            
            return data;
        } catch (error) {
            console.error('Error deleting bookmark:', error);
            throw error;
        }
    },

    addDiscussion: async (reviewDetail) => {
        try {
          const res = await instance.post('/auth/add-discussion', reviewDetail);
          return res.data;
        } catch (error) {
          console.error('Error adding discussion:', error);
          throw error;
        }
      },
      fetchDiscussion: async () => {
        try {
          const res = await instance.get('/auth/fetch-discussion'); // Keep this
          return res.data;
        } catch (error) {
          console.error('Error fetching discussions:', error);
          throw error;
        }
      },
      deleteDiscussion: async ({ userEmail, reviewId }) => {
        try {
          
          const response = await instance.delete('/auth/delete-discussion', {
            data: { userEmail, reviewId } // Send data in request body
          });
      
          return response.data;
          
        } catch (error) {
          console.error("Error deleting discussion:", error);
          throw error; // Re-throw to handle in component
        }
      },
       getNearbySchools: async ({ latitude, longitude }) => {
        try {
            const res = await instance.get('/api/schools', {
                params: { latitude, longitude }
            });
            set({ nearbySchools: res.data });
            return res.data;
        } catch (error) {
            console.error('Error fetching nearby schools:', error);
            set({ nearbySchools: null });
            throw error;
        }
    },

    getCurrentLocation: async () => {
        try {
            const res = await instance.get('/api/location');
            set({ currentLocation: res.data });
            return res.data;
        } catch (error) {
            console.error('Error fetching current location:', error);
            set({ currentLocation: null });
            throw error;
        }
    },

    searchLocationCoordinates: async (location) => {
        try {
            const res = await instance.post('/api/search', { location });
            set({ locationCoordinates: res.data });
            return res.data;
        } catch (error) {
            console.error('Error searching location coordinates:', error);
            set({ locationCoordinates: null });
            throw error;
        }
    }
      
}));

export default useAuthStore;