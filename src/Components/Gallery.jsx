// frontend/src/Components/Gallery.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import ImageCloud from "./ImageCloud"; // Assuming this component correctly renders Cloudinary images

function Gallery() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    async function fetchGalleryData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://purrchase-server-production.up.railway.app/gallery"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setError("Could not load the gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchGalleryData();
  }, []); // Empty dependency array ensures this runs once on mount

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="text-center text-red-500 py-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 min-h-screen flex items-center justify-center">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-300 bg-zinc-900 px-4 sm:px-6 lg:px-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto mt-8">
        {" "}
        {/* Centered content */}
        <h2 className="text-3xl sm:text-4xl font-bold font-MavenPro text-center mb-12 md:mb-16">
          {" "}
          {/* Centered heading */}
          Take a look at our{" "}
          <span className="hover:cursor-pointer bg-gradient-to-r from-rose-500 to-orange-500 bg-no-repeat bg-bottom bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-[background-size] pb-1">
            Adorable
          </span>{" "}
          Pets
        </h2>
        {/* Pet Grid */}
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {pets.map((pet) => {
              // Ensure pet has necessary data before rendering card
              if (!pet || !pet._id || !pet.images || pet.images.length === 0) {
                console.warn("Skipping pet with missing data:", pet); // Log skipped pets
                return null; // Skip rendering this pet if essential data is missing
              }

              return (
                // Wrap the entire card content in a Link
                <Link
                  to={`/pet/${pet._id}`} // Link to the PetDetails page route
                  key={pet._id}
                  className="group block bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]" // Combined styling and hover effects
                >
                  <div className="flex flex-col h-full">
                    {" "}
                    {/* Ensure flex column layout */}
                    {/* Image Container with Aspect Ratio */}
                    <div className="w-full aspect-square overflow-hidden">
                      {" "}
                      {/* Use aspect-square for 1:1 */}
                      <ImageCloud
                        src={pet.images[0]}
                        alt={`Photo of ${pet.name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" // Added group-hover scale
                      />
                    </div>
                    {/* Text Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {" "}
                      {/* Padding and flex-grow */}
                      <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-orange-400 transition-colors">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {" "}
                        {/* Limit description */}
                        {pet.breed}
                      </p>
                      <div className="mt-auto pt-2 border-t border-zinc-700/50 flex justify-between items-center">
                        {" "}
                        {/* Pushes price/status down */}
                        <p className="text-base font-semibold text-orange-400">
                          ${pet.price.toLocaleString()}
                        </p>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            pet.available
                              ? "bg-green-800/50 text-green-300"
                              : "bg-red-800/50 text-red-300"
                          }`}
                        >
                          {pet.available ? "Available" : "Adopted"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          // --- Empty State ---
          <div className="text-center text-xl text-gray-400 py-20">
            No pets currently available in the gallery. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
