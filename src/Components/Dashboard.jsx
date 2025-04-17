// frontend/src/Components/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectAuthUser, selectAuthToken } from "../Redux/authSlice";
import articleimgfour from "../Assets/articleimgfour.png"; // Default profile pic
import { MagnifyingGlassIcon, HeartIcon } from "@heroicons/react/24/outline";
import ImageCloud from "./ImageCloud";

function Dashboard() {
  const user = useSelector(selectAuthUser);
  const authToken = useSelector(selectAuthToken);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [errorPets, setErrorPets] = useState(null);

  // Fetch Adopted Pets
  useEffect(() => {
    const fetchAdoptedPets = async () => {
      if (!authToken) return;
      setLoadingPets(true);
      setErrorPets(null);
      try {
        const response = await axios.get("/my-adopted-pets", {
          // Adjust prefix if needed
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setAdoptedPets(response.data);
      } catch (err) {
        console.error(
          "Error fetching adopted pets:",
          err.response?.data || err.message
        );
        setErrorPets("Could not load your adopted pets.");
      } finally {
        setLoadingPets(false);
      }
    };
    fetchAdoptedPets();
  }, [authToken]);

  return (
    <div className="min-h-screen bg-zinc-900 text-slate-300 px-4 sm:px-6 lg:px-10 py-12 md:py-16 flex justify-center">
      <div className="mt-8 w-full max-w-5xl space-y-12 md:space-y-16">
        {" "}
        {/* Added space-y for vertical spacing */}
        {/* User Profile Section */}
        <div className="relative p-6 sm:p-8 bg-zinc-800 rounded-2xl shadow-lg overflow-hidden border border-zinc-700/50">
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {" "}
                {/* Slightly smaller h2 */}
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  {user?.username || "Guest"}!
                </span>
              </h2>
              <div className="space-y-1 text-sm text-slate-400">
                <p>
                  <strong className="text-slate-200 font-medium">Email:</strong>{" "}
                  {user?.email || "N/A"}
                </p>
                <p>
                  <strong className="text-slate-200 font-medium">Phone:</strong>{" "}
                  {user?.phone || "Not Provided"}
                </p>
                <p>
                  <strong className="text-slate-200 font-medium">
                    Address:
                  </strong>{" "}
                  {user?.address || "Not Provided"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <img
                src={user?.profilePicture || articleimgfour}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = articleimgfour;
                }}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-md border-2 border-zinc-700 object-cover" // Slightly smaller image
              />
              <Link
                to="/edit_profile"
                className="text-xs bg-gradient-to-r from-orange-600 to-rose-600 text-white px-3 py-1 rounded-md hover:opacity-90 transition duration-200" // Smaller padding/text
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        {/* --- Navigation Cards - Adjusted Size & Layout --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {" "}
          {/* Max 2 columns */}
          {[
            {
              name: "Find a Pet",
              link: "/find",
              Icon: MagnifyingGlassIcon,
              text: "Search for your new best friend.",
            },
            {
              name: "Wishlist",
              link: "/wishlist",
              Icon: HeartIcon,
              text: "See your saved favorites.",
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              // Reduced padding, adjusted hover bg, maybe slightly smaller overall width implicitly
              className="block group bg-zinc-800 bg-opacity-70 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4 hover:bg-zinc-700/50 transition duration-200 text-center"
            >
              {/* Smaller Icon */}
              <item.Icon className="h-8 w-8 text-orange-500 mx-auto mb-2 transition-transform group-hover:scale-110" />
              {/* Slightly smaller heading */}
              <h3 className="text-base font-semibold text-slate-200 group-hover:text-white mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-slate-400">{item.text}</p>
            </Link>
          ))}
        </div>
        {/* --- Data Section - Adopted Pets --- */}
        <div className="bg-zinc-800 bg-opacity-70 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-orange-400 border-b border-zinc-700 pb-2">
            Your Adopted Companions
          </h2>
          {loadingPets ? (
            <div className="text-center py-10">Loading pets...</div>
          ) : errorPets ? (
            <div className="text-center py-10 text-red-400">{errorPets}</div>
          ) : adoptedPets.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              You havent adopted any pets yet.
            </div>
          ) : (
            // Using a list view - generally better for variable number of items
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {adoptedPets.map((pet) => (
                <Link
                  to={`/pet/${pet._id}`}
                  key={pet._id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-700/50 transition duration-200"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-zinc-700">
                    {pet.images && pet.images.length > 0 ? (
                      <ImageCloud
                        src={pet.images[0]}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-md font-semibold text-slate-100">
                      {pet.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {pet.breed} ({pet.species})
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* Activity Section Removed */}
      </div>
    </div>
  );
}

export default Dashboard;
