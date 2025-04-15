import { useState, useEffect } from "react";
import axios from "axios"; // Using axios for cleaner API calls

const API_BASE_URL = "http://localhost:5000"; // Your backend base URL

function EditProfile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
  });
  const [initialUserData, setInitialUserData] = useState({}); // To compare for changes
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true); // Loading state for initial fetch
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --- Fetch current user profile data on component mount ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      setFetchLoading(true);
      setError("");
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication token not found. Please log in.");
        setFetchLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the GET /profile returns { user: { ... } } like the PUT response
        const currentUserData = response.data.user || response.data; // Adjust based on your GET endpoint's response structure
        const profileData = {
          username: currentUserData.username || "",
          email: currentUserData.email || "",
          address: currentUserData.address || "",
          phone: currentUserData.phone || "",
        };
        setUserData(profileData);
        setInitialUserData(profileData); // Store initial data
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response) {
          // Handle specific backend errors (e.g., 401 Unauthorized, 404 Not Found)
          if (err.response.status === 401) {
            setError("Unauthorized. Please log in again.");
            // Optional: redirect to login page here
          } else {
            setError(
              err.response.data.error || "Failed to fetch profile data."
            );
          }
        } else {
          setError("Network error or server unavailable.");
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on mount

  // --- Handle input changes ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors/success when user starts typing
    setError("");
    setSuccessMessage("");
  };

  // --- Handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token not found. Please log in.");
      setLoading(false);
      return;
    }

    // Prepare data for PUT request - only send changed fields (optional but good practice)
    // Or just send all fields as the backend handles it
    const dataToUpdate = {
      username: userData.username,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
    };

    // Basic frontend validation (backend handles more robustly)
    if (!dataToUpdate.username || !dataToUpdate.email) {
      setError("Username and Email are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/profile`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage(
        response.data.message || "Profile updated successfully!"
      );
      // Update state with the confirmed data from the backend
      const updatedProfile = {
        username: response.data.user.username,
        email: response.data.user.email,
        address: response.data.user.address || "",
        phone: response.data.user.phone || "",
      };
      setUserData(updatedProfile);
      setInitialUserData(updatedProfile); // Update initial data to reflect the successful save

      // Optional: Clear success message after a few seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response && err.response.data) {
        // Display specific error from backend
        setError(err.response.data.error || "Failed to update profile.");
        if (err.response.data.details) {
          // Optionally display validation details
          console.error("Validation Details:", err.response.data.details);
          // You could format these details for the user if needed
        }
      } else {
        setError("Network error or server unavailable.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if data has changed from initial fetch
  const hasChanged =
    JSON.stringify(userData) !== JSON.stringify(initialUserData);

  // --- Render Logic ---
  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-zinc-300">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 flex items-center justify-center p-4">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Update Profile
        </h2>

        {/* Display Initial Fetch Error */}
        {error && !successMessage && !loading && !fetchLoading && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-zinc-400"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              required
              className="bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-zinc-500"
              placeholder="Your unique username"
              disabled={loading}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-zinc-400"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
              className="bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-zinc-500"
              placeholder="name@example.com"
              disabled={loading}
            />
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-zinc-400"
            >
              Address (Optional)
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={userData.address}
              onChange={handleInputChange}
              className="bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-zinc-500"
              placeholder="Your shipping or home address"
              disabled={loading}
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-zinc-400"
            >
              Phone (Optional)
            </label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="bg-zinc-700 border border-zinc-600 text-zinc-100 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-zinc-500"
              placeholder="Your contact number"
              disabled={loading}
            />
          </div>

          {/* Submit/Update Button */}
          <button
            type="submit"
            disabled={loading || !hasChanged} // Disable if loading or no changes made
            className={`w-full  font-medium rounded-md text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out 
                        ${
                          loading || !hasChanged
                            ? "text-white bg-zinc-600 cursor-not-allowed"
                            : "rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50"
                        }`}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

          {/* Display Update Error/Success Messages */}
          {!loading && error && (
            <div className="mt-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded-md text-sm">
              {error}
            </div>
          )}
          {!loading && successMessage && (
            <div className="mt-4 p-3 bg-green-900 border border-green-700 text-green-300 rounded-md text-sm">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
