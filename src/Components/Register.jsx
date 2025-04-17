// frontend/src/Components/Register.jsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"; // Import useEffect for error clearing
import { registerUser, clearAuthError } from "../Redux/authSlice"; // Import registerUser thunk and clearAuthError action

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth); // Get loading and error state from Redux

  // Clear error when component mounts or unmounts
  useEffect(() => {
    dispatch(clearAuthError()); // Clear error on mount
    return () => {
      dispatch(clearAuthError()); // Clear error on unmount
    };
  }, [dispatch]);

  const onSubmission = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError()); // Clear previous errors on new submission

    const formElement = e.target; // Get the form element
    const formData = new FormData(formElement); // Create FormData from the form
    const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

    try {
      // Dispatch the registerUser thunk and wait for its completion
      await dispatch(registerUser(data)).unwrap(); // .unwrap() throws error on rejection

      // If registration is successful (no error thrown by unwrap)
      console.log("Registration successful!");
      alert("Registration successful! Please login."); // Optional: Give user feedback
      navigate("/login"); // Navigate to login page on success
      formElement.reset(); // Reset the form fields
    } catch (rejectedValueOrSerializedError) {
      // Error is handled by the reducer and stored in the Redux state
      console.error("Registration failed:", rejectedValueOrSerializedError);
      // No need to set local error state, useSelector handles it
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 text-white pt-16 pb-10">
      {" "}
      {/* Added padding top/bottom */}
      <div className="w-full max-w-md backdrop-blur-md bg-slate-400 rounded-3xl bg-opacity-10 px-8 py-10 shadow-lg">
        {" "}
        {/* Adjusted max-width */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          Register
        </h1>
        <p className="text-center text-gray-300 mb-8">Create a new account.</p>
        {/* Display Redux error state */}
        {error && (
          <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-2 rounded-md mb-6 text-sm text-center">
            {error}
          </div>
        )}
        <form
          className="text-black flex flex-col items-center space-y-4" // Added space-y for vertical spacing
          onSubmit={onSubmission}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" // Improved input styling
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address (Optional)"
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          />
          <input
            type="text" // Use tel for better mobile experience
            name="phone"
            placeholder="Phone Number (Optional)"
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          />
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className={`rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50 p-2 w-full transition duration-200 ease-in-out ${
              isLoading ? "opacity-50 cursor-not-allowed" : "" // Style for disabled state
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-400 hover:text-orange-300 font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
