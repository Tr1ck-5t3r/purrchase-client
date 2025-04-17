import { useEffect, useState, } from "react";
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
  const [filters, setFilters] = useState({
    species: "",
    breed: "",
    age: "",
    price: "",
  });
  const [distinct, setDistinct] = useState({
    species: new Set(),
    breed: new Set(),
    age: new Set(),
    prices: new Set(),
  });

  const cld = new Cloudinary({
    cloud: { cloudName: "dgz60odkx" },
  });

  // Fetch pet data from API
  useEffect(() => {
    async function fetchPets() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/find");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPets(data);
        setFilteredPets(data);

        // Extract unique attributes
        const attributes = {
          species: new Set(),
          breed: new Set(),
          age: new Set(),
          prices: new Set(),
        };
        data.forEach((pet) => {
          if (pet?.species) attributes.species.add(pet.species);
          if (pet?.breed) attributes.breed.add(pet.breed);
          if (pet?.age !== undefined) attributes.age.add(pet.age);
          if (pet?.price !== undefined) attributes.prices.add(pet.price);
        });
        setDistinct(attributes);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Could not load pets. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  // Filter function
  useEffect(() => {
    let filtered = pets;
    if (filters.species)
      filtered = filtered.filter((pet) => pet.species === filters.species);
    if (filters.breed)
      filtered = filtered.filter((pet) => pet.breed === filters.breed);
    if (filters.age)
      filtered = filtered.filter((pet) => pet.age?.toString() === filters.age);
    if (filters.price)
      filtered = filtered.filter((pet) => pet.price <= Number(filters.price));
    setFilteredPets(filtered);
  }, [filters, pets]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
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
    <div className="text-slate-300 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 px-4 sm:px-6 lg:px-10 py-10 flex flex-col justify-center items-center min-h-screen">
      {/* Filter Section */}
      <div className="my-8 p-7 w-full max-w-7xl rounded-xl bg-zinc-800 shadow-md">
        <h2 className="font-bold font-MavenPro text-3xl text-center mb-6 text-white">
          Find Your{" "}
          <span className="text-3xl font-bold font-Belanosima bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            Purrfect
          </span>{" "}
          Partner
        </h2>

        {/* Filter Form */}
        <form className="p-4 rounded-xl text-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* Species Filter */}
            <div className="relative">
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
                {[...distinct.species].map((species, index) => (
                  <option key={index} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>
            {/* Breed Filter */}
            <div className="relative">
              <label
                htmlFor="breed"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Breed
              </label>
              <select
                id="breed"
                name="breed"
                className="block w-full bg-zinc-700 border border-zinc-600 text-gray-200 rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                value={filters.breed}
                onChange={handleFilterChange}
              >
                <option value="">All Breeds</option>
                {[...distinct.breed].map((breed, index) => (
                  <option key={index} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
            {/* Age Filter */}
            <div className="relative">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Age
              </label>
              <select
                id="age"
                name="age"
                className="block w-full bg-zinc-700 border border-zinc-600 text-gray-200 rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                value={filters.age}
                onChange={handleFilterChange}
              >
                <option value="">Any Age</option>
                {[...distinct.age]
                  .sort((a, b) => a - b)
                  .map((age, index) => (
                    <option key={index} value={age}>
                      {age}
                    </option>
                  ))}
              </select>
            </div>
            {/* Price Filter */}
            <div className="relative">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Price Range (Max)
              </label>
              <select
                id="price"
                name="price"
                className="block w-full bg-zinc-700 border border-zinc-600 text-gray-200 rounded-md py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                value={filters.price}
                onChange={handleFilterChange}
              >
                <option value="">Any Price</option>
                {[...distinct.prices]
                  .sort((a, b) => a - b)
                  .map((price, index) => (
                    <option key={index} value={price}>
                      Up to ${price.toLocaleString()}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Pets Display Section */}
      <div className="my-10 w-full max-w-7xl">
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredPets.map((pet) => {
              // Skip rendering if essential data missing
              if (!pet || !pet._id || !pet.images || pet.images.length === 0) {
                console.warn("Skipping pet render due to missing data:", pet);
                return null;
              }

              const petImg = cld
                .image(pet.images[0])
                .resize(auto().gravity(autoGravity()).width(400).height(400))
                .format("auto")
                .quality("auto");

              return (
                // --- Use Link instead of div with onClick ---
                <Link
                  to={`/pet/${pet._id}`} // Link to the detail page
                  key={pet._id} // Key on the Link
                  className="group block bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]" // Apply styling to Link
                >
                  <div className="flex flex-col h-full">
                    {/* Image Container */}
                    <div className="w-full aspect-square overflow-hidden">
                      <AdvancedImage
                        cldImg={petImg}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        alt={pet.name}
                      />
                    </div>
                    {/* Pet Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-orange-400 transition-colors">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {pet.breed}
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
                // --- End Link ---
              );
            })}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-400 py-20">
            No pets found matching your criteria.
          </p>
        )}
      </div>

      {/* Modal is removed */}
    </div>
  );
}

export default Find;
