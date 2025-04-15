import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice"; // Import the correct logout action
import { useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  // Select both isAuthenticated and user from the Redux store
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action from authSlice
    // The logout action handles clearing state, localStorage, and Axios headers
    setIsMenuOpen(false); // Close mobile menu if open
    navigate("/login"); // Redirect to login page after logout
    // Removed alert("Logged out successfully"); - redirect is better UX
  };

  // Define navigation items for consistency
  const navitems = {
    Home: "/",
    About: "/about",
    Find: "/find",
    Gallery: "/gallery",

  };

  return (
    <div className="fixed w-full z-10 top-0 bg-zinc-900 shadow-md text-slate-300">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {" "}
        {/* Added container & responsive padding */}
        {/* Logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <div className="text-3xl font-bold font-Belanosima bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            Purrchase
          </div>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {" "}
          {/* Reduced spacing slightly */}
          {Object.entries(navitems).map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="font-medium transition-colors hover:text-white" // Simpler hover
            >
              {name}
            </Link>
          ))}
        </div>
        {/* Authentication & User Info - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? ( // Check isAuthenticated first
            <>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 group"
              >
                {" "}
                {/* Link profile pic/name */}
                <img
                  src={
                    user.profilePicture ||
                    `https://eu.ui-avatars.com/api/?name=${user.username}&size=128&background=random`
                  } // Fallback avatar
                  alt={user.username}
                  className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-orange-500 transition"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="py-2 px-4 rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="py-2 px-4 rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50">
                Login
              </button>
            </Link>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none text-2xl" // Larger icon
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu" // Accessibility
        >
          {isMenuOpen ? "✕" : "☰"} {/* Change icon based on state */}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {/* Use transition for smoother open/close */}
      <div
        className={`md:hidden bg-zinc-800 text-center overflow-hidden transition-max-height duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 border-t border-zinc-700" : "max-h-0" // Animate max-height
        }`}
      >
        <div className="py-4 px-4">
          {" "}
          {/* Add padding inside */}
          {Object.entries(navitems).map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="block py-2 text-slate-300 hover:bg-zinc-700 rounded hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {name}
            </Link>
          ))}
          {/* Auth buttons - Mobile */}
          <div className="mt-4 pt-4 border-t border-zinc-700">
            {isAuthenticated && user ? (
              <div className="flex flex-col items-center space-y-4">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 group"
                >
                  <img
                    src={
                      user.profilePicture ||
                      `https://eu.ui-avatars.com/api/?name=${user.username}&size=128&background=random`
                    }
                    alt={user.username}
                    className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-orange-500 transition"
                  />
                </Link>
                <button
                  onClick={handleLogout} // handleLogout already closes menu
                  className="py-2 px-4 rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <button className="py-2 px-4 rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
