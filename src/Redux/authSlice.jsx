// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --- Helper: Get initial state from localStorage ---
const storedToken = localStorage.getItem("authToken");
const storedUser = JSON.parse(localStorage.getItem("authUser")); // User data stored as JSON string

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: !!storedToken, // True if token exists
  isLoading: false,
  error: null,
};

// --- Async Thunk for Login ---
export const loginUser = createAsyncThunk(
  "auth/loginUser", // Action type prefix
  async (credentials, { rejectWithValue }) => {
    // credentials = { email, password }
    try {
      // V V V CHANGE THIS LINE V V V
      const response = await axios.post("/login", credentials); // REMOVED /api/auth prefix
      // ^ ^ ^ CHANGE THIS LINE ^ ^ ^

      const { token, user } = response.data;

      // --- Store in localStorage ---
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user)); // Store user data

      // --- Set Axios default header for subsequent requests ---
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { token, user }; // This will be the action.payload in the reducer
    } catch (error) {
      // Use rejectWithValue to send a custom error payload
      const errorMessage =
        error.response?.data?.error || error.message || "Login failed";
      localStorage.removeItem("authToken"); // Clear any potentially invalid token
      localStorage.removeItem("authUser");
      delete axios.defaults.headers.common["Authorization"];
      // Log the detailed error for debugging
      console.error("Login Axios Error:", error.response || error);
      return rejectWithValue(errorMessage);
    }
  }
);

// --- Async Thunk for Registration (Optional, but good practice) ---
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    // userData = { username, email, password, address, phone }
    try {
      // V V V CHANGE THIS LINE V V V
      const response = await axios.post("/register", userData); // REMOVED /api/auth prefix
      // ^ ^ ^ CHANGE THIS LINE ^ ^ ^

      // Registration successful
      return response.data.message; // e.g., "User registered successfully"
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Registration failed";
      // Log the detailed error for debugging
      console.error("Register Axios Error:", error.response || error);
      return rejectWithValue(errorMessage);
    }
  }
);

// --- Auth Slice Definition ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  // --- Standard Reducers (synchronous actions) ---
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      // --- Clear localStorage ---
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      // --- Remove Axios default header ---
      delete axios.defaults.headers.common["Authorization"];
    },
    // Optional: Clear error messages
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  // --- Extra Reducers (handles async actions from createAsyncThunk) ---
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors on new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload; // Error message from rejectWithValue
      })
      // Registration Cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Error message
      });
  },
});

// --- Export synchronous actions and the reducer ---
export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
