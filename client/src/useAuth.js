// import { create } from 'zustand';
// import { instance } from './lib/axios.js';

// const useAuthStore = create((set, get) => ({
//   User: null,

//   // Backend signup (email/password)
//   signup: async (data) => {
//     try {
//       const res = await instance.post('/auth/signup', data);
//       set({ User: res.data });
//       return res.data;
//     } catch (error) {
//       set({ User: null });
//       throw error;
//     }
//   },

//   // Used for Google/Phone auth (Firebase), set directly
//   setFirebaseUser: (userData) => {
//     set({ User: userData });
//   },

//   login: async (data) => {
//     try {
//       const res = await instance.post('/auth/login', data);
//       set({ User: res.data });
//       return res.data;
//     } catch (error) {
//       set({ User: null });
//       throw error;
//     }
//   },

//   logout: async () => {
//     try {
//       await instance.post('/auth/logout');
//       set({ User: null });
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   },

//   checkAuth: async () => {
//     try {
//       const res = await instance.get("/auth/check-auth");
//       set({ User: res.data });
//     } catch (error) {
//       set({ User: null });
//       console.error("Auth check failed:", error);
//     }
//   }
// }));

// export default useAuthStore;