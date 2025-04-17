// frontend/src/redux/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Assuming fetchWishlist is defined in this file as well

const initialState = {
  pets: [],
  loading: false, // General loading for fetch
  addRemoveLoading: {}, // Track loading state per pet ID for add/remove
  error: null,
};

// --- Async Thunk for Fetching Wishlist ---
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (authToken, { rejectWithValue }) => {
    try {
      const response = await axios.get("/wishlist", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data.pets;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch wishlist";
      console.error("Fetch Wishlist Axios Error:", error.response || error);
      return rejectWithValue(errorMessage);
    }
  }
);

// --- Async Thunk for Adding to Wishlist ---
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (petId, { rejectWithValue, getState, dispatch }) => {
    // Add dispatch here
    const { auth } = getState();
    const authToken = auth.token;

    if (!authToken) {
      return rejectWithValue("Authentication token not found.");
    }

    try {
      // Make the POST request to add the item
      await axios.post(
        `/wishlist/items/${petId}`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      // **After successful add, dispatch fetchWishlist to get the updated list**
      await dispatch(fetchWishlist(authToken)); // Wait for fetch to potentially complete
      return { petId }; // Still return petId for potential optimistic updates or tracking
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to add to wishlist";
      console.error("Add to Wishlist Axios Error:", error.response || error);
      return rejectWithValue(errorMessage);
    }
  }
);

// --- Async Thunk for Removing from Wishlist ---
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (petId, { rejectWithValue, getState, dispatch }) => {
    // Add dispatch here
    const { auth } = getState();
    const authToken = auth.token;
    if (!authToken) {
      return rejectWithValue("Authentication token not found.");
    }
    try {
      // Make the DELETE request to remove the item
      await axios.delete(`/wishlist/items/${petId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      // **After successful remove, dispatch fetchWishlist to get the updated list**
      await dispatch(fetchWishlist(authToken)); // Wait for fetch to potentially complete
      return { petId }; // Still return petId for tracking
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to remove from wishlist";
      console.error(
        "Remove from Wishlist Axios Error:",
        error.response || error
      );
      return rejectWithValue(errorMessage);
    }
  }
);

// --- Wishlist Slice Definition ---
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
    // Optional: You could add reducers here for purely optimistic UI updates
    // if you wanted instant feedback before the call finishes,
    // but the refetch strategy avoids potential inconsistencies.
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Wishlist Cases ---
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true; // Loading for the whole list fetch
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload; // Update pets with the fetched list
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pets = []; // Clear pets on error
      })
      // --- Add to Wishlist Cases ---
      .addCase(addToWishlist.pending, (state, action) => {
        // Track loading specifically for the pet being added
        state.addRemoveLoading[action.meta.arg] = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.addRemoveLoading[action.meta.arg] = false;
        // The main state update now happens via fetchWishlist.fulfilled
        // We *could* still optimistically add here if desired, but refetch handles consistency.
        // Example optimistic add (use with caution if refetch is primary):
        // if (!state.pets.some(p => p._id === action.payload.petId)) {
        //   state.pets.push({ _id: action.payload.petId }); // Add basic structure
        // }
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.addRemoveLoading[action.meta.arg] = false;
        state.error = action.payload; // Set error specific to this action
      })
      // --- Remove from Wishlist Cases ---
      .addCase(removeFromWishlist.pending, (state, action) => {
        // Track loading specifically for the pet being removed
        state.addRemoveLoading[action.meta.arg] = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.addRemoveLoading[action.meta.arg] = false;
        // The main state update now happens via fetchWishlist.fulfilled
        // Example optimistic remove (use with caution if refetch is primary):
        // state.pets = state.pets.filter(pet => pet._id !== action.payload.petId);
        state.error = null;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.addRemoveLoading[action.meta.arg] = false;
        state.error = action.payload; // Set error specific to this action
      });
  },
});

// --- Export Actions and Reducer ---
export const { clearWishlistError } = wishlistSlice.actions;
export default wishlistSlice.reducer;

// --- Selectors ---
export const selectWishlistPets = (state) => state.wishlist.pets;
export const selectWishlistLoading = (state) => state.wishlist.loading; // General fetch loading
export const selectWishlistError = (state) => state.wishlist.error;
export const selectIsPetInWishlist = (state, petId) =>
  state.wishlist.pets.some((pet) => pet._id === petId);
// Selector for specific add/remove loading state
export const selectIsWishlistUpdating = (state, petId) =>
  !!state.wishlist.addRemoveLoading[petId];
