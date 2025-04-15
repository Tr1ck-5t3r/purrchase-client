// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import axios from "axios"; // Import axios here too

// --- Configure Axios Base URL (Optional but Recommended) ---
 axios.defaults.baseURL = 'http://localhost:5000'; // Or your backend URL

// --- Set Initial Axios Header if Token Exists (Handles Refresh) ---
const token = localStorage.getItem("authToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if you have more slices
    // e.g., posts: postsReducer,
  },
  // Middleware is automatically included by configureStore (includes thunk)
  // DevTools Extension is also automatically enabled in development
});

export default store;

