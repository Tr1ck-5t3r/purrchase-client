import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

function Find() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: { cloudName: "dgz60odkx" }, // Replace with your Cloudinary cloud name
  });

  // Fetch pet data from API
  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await fetch("http://localhost:5000/find"); // Adjust API route if needed
        const data = await response.json();
        setPets(data);
        setFilteredPets(data);

        // Extract unique attributes for filtering
        const attributes = {
          species: new Set(),
          breed: new Set(),
          age: new Set(),
          prices: new Set(),
        };

        data.forEach((pet) => {
          attributes.species.add(pet.species);
          attributes.breed.add(pet.breed);
          attributes.age.add(pet.age);
          attributes.prices.add(pet.price);
        });

        setDistinct(attributes);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    }

    fetchPets();
  }, []);

  // Filter function
  useEffect(() => {
    let filtered = pets;

    if (filters.species) {
      filtered = filtered.filter((pet) => pet.species === filters.species);
    }
    if (filters.breed) {
      filtered = filtered.filter((pet) => pet.breed === filters.breed);
    }
    if (filters.age) {
      filtered = filtered.filter((pet) => pet.age.toString() === filters.age);
    }
    if (filters.price) {
      filtered = filtered.filter((pet) => pet.price <= Number(filters.price));
    }

    setFilteredPets(filtered);
  }, [filters, pets]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="text-slate-300 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 px-6 py-10 sm:px-10 flex flex-col justify-center items-center min-h-screen">
      {/* Filter Section */}
      <div className="my-8 p-7 w-full max-w-7xl rounded-xl bg-zinc-800 shadow-md">
        <h2 className="font-bold font-MavenPro text-3xl text-center mb-6 text-white">
          Find Your{" "}
          <span className="text-3xl font-bold font-Belanosima bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            Purrfect
          </span>{" "}
          Partner
        </h2>

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
                {[...distinct.age].map((age, index) => (
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
      <div className="my-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet, index) => {
              if (!pet.images || pet.images.length === 0) return null;

              const petImg = cld
                .image(pet.images[0])
                .resize(auto().gravity(autoGravity()).width(200).height(200))
                .format("auto")
                .quality("auto");

              return (
                <div
                  className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                  key={index}
                  onClick={() => openModal(pet)}
                >
                  <div className="bg-zinc-800">
                    {/* Image Container */}
                    <div className="aspect-w-16 aspect-h-9">
                      {" "}
                      {/* Maintain aspect ratio */}
                      <AdvancedImage
                        cldImg={petImg}
                        className="object-cover w-full h-full rounded-t-xl"
                        alt={pet.name}
                      />
                    </div>
                    {/* Pet Info */}
                    <div className="px-4 py-3">
                      <h3 className="text-lg font-semibold text-white truncate group-hover:text-rose-400 transition-colors duration-200">
                        {pet.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {pet.description}
                      </p>
                    </div>
                    {/* Buy Button */}
                    <div className="px-4 pb-3">
                      <button className="block w-full py-2 px-4 bg-orange-600 hover:bg-rose-500 text-white text-center rounded-md transition-colors duration-200">
                        Adopt for ${pet.price.toLocaleString()}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400">
              No pets found matching your criteria.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPet && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center ">
          <div className="bg-zinc-900 h-3/4 text-white p-6 rounded-xl w-full max-w-lg shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-4 text-orange-500">
              {selectedPet.name}
            </h2>
            <div className="mb-4 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              {selectedPet.images?.length > 0 && (
                <AdvancedImage
                  cldImg={cld
                    .image(selectedPet.images[0])
                    .resize(
                      auto().gravity(autoGravity()).width(200).height(200)
                    )
                    .format("auto")
                    .quality("auto")}
                    className = "justify-self-center"
                  alt={selectedPet.name}
                />
              )}
            </div>
            <p className="text-gray-300 mb-4">{selectedPet.description}</p>
            <ul className="space-y-2">
              <li>
                <strong className="text-gray-100">Species:</strong>{" "}
                {selectedPet.species}
              </li>
              <li>
                <strong className="text-gray-100">Breed:</strong>{" "}
                {selectedPet.breed}
              </li>
              <li>
                <strong className="text-gray-100">Age:</strong>{" "}
                {selectedPet.age}
              </li>
              <li>
                <strong className="text-gray-100">Price:</strong> $
                {selectedPet.price.toLocaleString()}
              </li>
            </ul>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-orange-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                onClick={() => {
                  /* Handle adoption logic here */ alert(
                    `Adopt ${
                      selectedPet.name
                    } for $${selectedPet.price.toLocaleString()}? (Functionality not implemented)`
                  );
                  closeModal();
                }}
              >
                Adopt Me!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Find;
