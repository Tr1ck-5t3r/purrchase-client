// frontend/src/Components/Wishlist.jsx
import { useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  fetchWishlist,
  selectWishlistPets,
  selectWishlistLoading,
} from "../Redux/WishlistSlice";
import { selectAuthToken } from "../Redux/authSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistPets = useSelector(selectWishlistPets);
  const loadingWishlist = useSelector(selectWishlistLoading);
  const authToken = useSelector(selectAuthToken);
  const cld = new Cloudinary({ cloud: { cloudName: "dgz60odkx" } });

  useEffect(() => {
    if (authToken) {
      dispatch(fetchWishlist(authToken));
    }
  }, [dispatch, authToken]);

  const handleRemoveFromWishlist = (petId) => {
    if (!authToken) return;
    dispatch(removeFromWishlist(petId));
  };

  if (loadingWishlist) {
    return <div className="p-6 text-white">Loading Wishlist...</div>;
  }

  return (
    <div className="p-20 bg-zinc-900 min-h-screen mt-12">
      { 
        wishlistPets.length === 0?
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          No Pets added to Wishlist!
        </h2>
        :
      (<div>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          My Wishlist
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistPets.map((pet, index) => {
            if (!pet.images || pet.images.length === 0) return null;

            const petImg = cld
              .image(pet.images[0])
              .resize(auto().gravity(autoGravity()).width(300).height(300))
              .format("auto")
              .quality("auto");

            return (
              <div
                key={index}
                className="bg-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative flex flex-col"
              >
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromWishlist(pet._id);
                  }}
                  className="absolute top-3 right-3 z-10 bg-zinc-700 bg-opacity-75 rounded-full px-1.5 text-gray-300 hover:text-rose-500 transition"
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>

                {/* Image */}
                <div className="w-full h-48 overflow-hidden bg-black flex items-center justify-center">
                  <AdvancedImage
                    cldImg={petImg}
                    className="object-cover w-full h-full"
                    alt={pet.name}
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1 p-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 truncate">
                      {pet.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {pet.description}
                    </p>
                  </div>

                  {/* Adopt Button */}
                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(
                          "Adopt Now functionality needs implementation - initiateDirectPayment(pet)"
                        );
                      }}
                      className="w-full py-2 px-4 bg-white text-orange-500 font-semibold rounded-md shadow-sm hover:bg-gray-50 hover:text-pink-500 transition-colors duration-200"
                    >
                      Adopt Now for ${pet.price.toLocaleString()}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>)
    }
    </div>
  );
}

export default Wishlist;
