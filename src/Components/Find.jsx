
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

function Find() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPets, setFilteredPets] = useState([]);

  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(1000);
  const [maxAge, setMaxAge] = useState(15);
  const [selectedMaxAge, setSelectedMaxAge] = useState(15);

  const [filters, setFilters] = useState({
    species: "",
  });

  const [distinct, setDistinct] = useState({
    species: new Set(),
  });

  const cld = new Cloudinary({
    cloud: { cloudName: "dgz60odkx" },
  });

  // --- Fetch and Process Initial Data ---
  useEffect(() => {
    async function fetchPets() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://purrchase-server-production.up.railway.app/find"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPets(data);
        setFilteredPets(data.filter((p) => p.available));

        const attributes = { species: new Set() };
        let currentMaxPrice = 0;
        let currentMaxAge = 0;
        data.forEach((pet) => {
          if (pet?.species) attributes.species.add(pet.species);
          if (pet?.age !== undefined && pet.age > currentMaxAge) {
            currentMaxAge = pet.age;
          }
          if (pet?.price !== undefined && pet.price > currentMaxPrice) {
            currentMaxPrice = pet.price;
          }
        });

        const calculatedMaxPrice =
          currentMaxPrice > 0 ? Math.ceil(currentMaxPrice / 100) * 100 : 1000;
        const calculatedMaxAge = currentMaxAge > 0 ? currentMaxAge : 15;

        setMaxPrice(calculatedMaxPrice);
        setSelectedMaxPrice(calculatedMaxPrice);
        setMaxAge(calculatedMaxAge);
        setSelectedMaxAge(calculatedMaxAge);
        setDistinct(attributes);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Could not load pets. Please try again later.");
        setPets([]);
        setFilteredPets([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  // --- Filter Function ---
  useEffect(() => {
    let filtered = pets;
    if (showAvailableOnly) filtered = filtered.filter((pet) => pet.available);
    if (filters.species)
      filtered = filtered.filter((pet) => pet.species === filters.species);
    filtered = filtered.filter((pet) => pet.age <= Number(selectedMaxAge));
    filtered = filtered.filter((pet) => pet.price <= Number(selectedMaxPrice));
    setFilteredPets(filtered);
  }, [filters, pets, showAvailableOnly, selectedMaxPrice, selectedMaxAge]);

  // --- Event Handlers ---
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleAvailabilityToggle = (e) => {
    setShowAvailableOnly(e.target.checked);
  };
  const handlePriceChange = (e) => {
    setSelectedMaxPrice(Number(e.target.value));
  };
  const handleAgeChange = (e) => {
    setSelectedMaxAge(Number(e.target.value));
  };

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
    <div className="text-slate-300 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 px-4 sm:px-6 lg:px-10 py-10 flex flex-col items-center min-h-screen">
      {/* Filter Section */}
      <div className="my-8 p-7 w-full max-w-7xl rounded-xl bg-zinc-800 shadow-md">
        <h2 className="font-bold font-MavenPro text-3xl text-center mb-8 text-white">
          {" "}
          {/* Increased bottom margin */}
          Find Your{" "}
          <span className="text-3xl font-bold font-Belanosima bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            Purrfect
          </span>{" "}
          Partner
        </h2>

        {/* Filter Form - Single Row Grid */}
        <form className="rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 items-end">
            {" "}
            {/* items-end for alignment */}
            {/* 1. Species Filter */}
            <div className="w-full">
              {" "}
              {/* Each item takes full width of its cell */}
              <label
                htmlFor="species"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Species
              </label>
              <select
                id="species"
                name="species"
                className="block w-full bg-zinc-700 border border-zinc-600 text-gray-200 rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                value={filters.species}
                onChange={handleFilterChange}
              >
                <option value="">All Species</option>
                {[...distinct.species].sort().map((species, index) => (
                  <option key={index} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>
            {/* 2. Age Range Slider */}
            <div className="w-full">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Max Age:{" "}
                <span className="font-semibold text-orange-400">
                  {selectedMaxAge}
                  {selectedMaxAge === maxAge && maxAge > 0 ? "+" : ""} yrs
                </span>
              </label>
              <input
                type="range"
                id="age"
                name="age"
                min="0"
                max={maxAge}
                step="1"
                value={selectedMaxAge}
                onChange={handleAgeChange}
                className="w-full h-2 bg-zinc-600 rounded-lg appearance-none cursor-pointer range-lg dark:bg-zinc-700 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0 yrs</span>
                <span>
                  {maxAge}
                  {maxAge > 0 ? "+" : ""} yrs
                </span>
              </div>
            </div>
            {/* 3. Price Range Slider */}
            <div className="w-full">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Max Price:{" "}
                <span className="font-semibold text-orange-400">
                  ${selectedMaxPrice.toLocaleString()}
                </span>
              </label>
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max={maxPrice}
                step="10"
                value={selectedMaxPrice}
                onChange={handlePriceChange}
                className="w-full h-2 bg-zinc-600 rounded-lg appearance-none cursor-pointer range-lg dark:bg-zinc-700 accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span>
                <span>${maxPrice.toLocaleString()}</span>
              </div>
            </div>
            {/* 4. Availability Toggle */}
            {/* Use flex within the grid cell for alignment */}
            <div className="w-full flex justify-center sm:justify-start lg:justify-center items-center pb-1 h-full">
              {" "}
              {/* Align center on large screens */}
              <label
                htmlFor="available"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={showAvailableOnly}
                  onChange={handleAvailabilityToggle}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-zinc-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-orange-400 dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-300 dark:text-gray-300 whitespace-nowrap">
                  {" "}
                  {/* Prevent wrap */}
                  Available Only
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Pets Display Section (No changes needed here) */}
      <div className="my-10 w-full max-w-7xl">
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredPets.map((pet) => {
              if (!pet || !pet._id || !pet.images || pet.images.length === 0) {
                return null;
              }
              const petImg = cld
                .image(pet.images[0])
                .resize(auto().gravity(autoGravity()).width(400).height(400))
                .format("auto")
                .quality("auto");
              return (
                <Link
                  to={`/pet/${pet._id}`}
                  key={pet._id}
                  className="group block bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-full aspect-square overflow-hidden">
                      <AdvancedImage
                        cldImg={petImg}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        alt={pet.name}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-orange-400 transition-colors">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {pet.species}
                      </p>
                      <div className="mt-auto pt-2 border-t border-zinc-700/50 flex justify-between items-center">
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
          <p className="text-center text-xl text-gray-400 py-20">
            No pets found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default Find;
