import { useEffect, useState } from "react";
import ImageCloud from "./ImageCloud";

function Gallery() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/gallery")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, []);

  return (
    <div className="text-slate-300 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 px-10 py-8 flex justify-center align-middle">
      <div className="my-8 px-7 py-8 w-11/12">
        <h2 className="font-medium font-MavenPro text-3xl">
          Take a look at our
          <span className="mx-2 hover:cursor-pointer bg-gradient-to-r from-rose-500 to-orange-500 bg-no-repeat bg-bottom bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-[background-size]">
            Adorable
          </span>
          Pets
        </h2>
        <div className="my-10 px-6 py-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {pets.map((pet) => (
                <div className="group" key={pet._id}>
                  <div className="bg-zinc-800 bg-opacity-30 shadow-lg rounded-xl hover:bg-zinc-700 hover:bg-opacity-55">
                    <div className="h-40">
                      {pet.images.length > 0 && (
                        <ImageCloud src={pet.images[0]} />
                      )}
                    </div>
                    <div className="px-6 py-4">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {pet.name} ({pet.breed})
                      </h3>
                      <p className="text-gray-500 text-base">
                        {pet.description}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Age: {pet.age} years
                      </p>
                      <p className="text-gray-400 text-sm">
                        Price: ${pet.price}
                      </p>
                    </div>
                    <button className="block w-full py-2 px-4 bg-orange-600 text-white text-center hover:bg-rose-500 rounded-b-xl">
                      {pet.available ? "Buy" : "Sold Out"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
