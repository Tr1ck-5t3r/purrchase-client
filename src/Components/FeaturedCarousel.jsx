// frontend/src/Components/FeaturedPetsCarousel.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Icons for Navigation
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const cld = new Cloudinary({
  cloud: { cloudName: "dgz60odkx" },
});

function FeaturedPetsCarousel() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using relative path assuming baseURL is set or adjust prefix if needed
        const response = await axios.get("/gallery?limit=10");
        if (response.data && Array.isArray(response.data)) {
          setPets(response.data);
        } else {
          console.warn("Received non-array or empty data for featured pets");
          setPets([]);
        }
      } catch (err) {
        console.error(
          "Error fetching featured pets:",
          err.response?.data || err.message || err
        );
        setError("Could not load featured pets at the moment.");
        setPets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedPets();
  }, []);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="bg-zinc-900 py-16 text-center text-slate-400">
        Loading featured pets...
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="bg-zinc-900 py-16 text-center text-red-500 px-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">
          Featured Companions
        </h2>
        <p>{error}</p>
      </div>
    );
  }

  // --- Empty State ---
  if (!pets || pets.length === 0) {
    return (
      <div className="bg-zinc-900 py-16 text-center text-slate-400 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-200">
          Featured Companions
        </h2>
        <p>No featured pets to show right now. Check back soon!</p>
      </div>
    );
  }

  // --- Carousel Render ---
  return (
    // Outer container for background and vertical padding
    <div className="bg-zinc-900 py-16">
      {/* Centered container with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-12 text-slate-200">
          Featured Companions
        </h2>
        {/* Container for Swiper and Nav Buttons - Allows relative positioning */}
        <div className="relative group/nav">
          {/* Custom Navigation Buttons - Positioned INSIDE relative parent */}
          {/* Appear on hover over the relative container */}
          <button className="swiper-button-prev-custom absolute top-1/2 left-1 sm:left-2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover/nav:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button className="swiper-button-next-custom absolute top-1/2 right-1 sm:right-2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover/nav:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed">
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={pets.length >= 5} // Loop if 5 or more pets (adjust as needed)
            centeredSlides={false}
            autoplay={{
              delay: 4500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              // Use the classes defined on the buttons
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="pb-14" // Padding for pagination dots
          >
            {pets.map((pet) => {
              if (!pet || !pet._id || !pet.images || pet.images.length === 0) {
                return null; // Skip rendering invalid pet data
              }

              const petImg = cld
                .image(pet.images[0])
                .resize(auto().gravity(autoGravity()).width(400).height(400))
                .format("auto")
                .quality("auto");

              return (
                <SwiperSlide key={pet._id} className="h-auto pb-2">
                  {" "}
                  {/* Ensure full height slides */}
                  <Link
                    to={`/pet/${pet._id}`}
                    className="group block bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col border border-transparent hover:border-orange-600/30"
                  >
                    {/* Image Container */}
                    <div className="w-full aspect-square overflow-hidden">
                      <AdvancedImage
                        cldImg={petImg}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={pet.name || "Featured Pet"}
                      />
                    </div>
                    {/* Pet Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-orange-400 transition-colors">
                        {pet.name || "Unnamed Pet"}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                        {pet.breed || pet.species || "Unknown"}
                      </p>
                      <div className="mt-auto pt-2 border-t border-zinc-700/50 flex justify-between items-center">
                        <p className="text-base font-semibold text-orange-400">
                          ${(pet.price || 0).toLocaleString()}
                        </p>
                        {/* Use optional chaining for safety */}
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            pet?.available
                              ? "bg-green-800/50 text-green-300"
                              : "bg-red-800/50 text-red-300"
                          }`}
                        >
                          {pet?.available ? "Available" : "Adopted"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>{" "}
        {/* End relative container for Swiper + Nav */}
      </div>{" "}
      {/* End max-w-7xl container */}
    </div> // End outer container
  );
}

export default FeaturedPetsCarousel;
