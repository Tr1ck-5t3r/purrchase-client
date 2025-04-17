import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ImageCloud from "./ImageCloud";

function FeaturedPetsCarousel() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch data from localhost API
    fetch("http://localhost:5000/gallery")
      .then((response) => response.json())
      .then((data) => setPets(data.slice(0, 10))) // Take only first 10 pets
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);
  return (
    <div className="bg-zinc-900 py-16">
      <h2 className="text-center text-slate-300 text-2xl font-MavenPro mb-6">
        Featured Pets
      </h2>
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-4xl mx-auto"
      >
        {pets.length > 0 ? (
          pets.map((pet, i) => (
            <SwiperSlide key={pet.id || i} className="p-8"> 
              <div className="bg-zinc-800 w-full h-64 rounded-lg p-4 text-slate-300 flex flex-col items-center justify-center">
                <ImageCloud src={pet.images[0]} className="h-40 w-full rounded-lg" />
                <p className="font-bold">{pet.name}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-slate-400">Loading pets...</p>
        )}
      </Swiper>
    </div>
  );
}

export default FeaturedPetsCarousel;
