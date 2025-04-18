// frontend/src/Components/PetDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios"; // Import Axios
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  selectIsPetInWishlist,
  fetchWishlist,
  selectIsWishlistUpdating, // Import loading selector for wishlist
  selectWishlistError, // Import error selector for wishlist
  clearWishlistError, // Import action to clear error
} from "../Redux/WishlistSlice"; // Adjust path if needed
import { selectAuthToken, selectAuthUser } from "../Redux/authSlice"; // Import auth selectors

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loadingPet, setLoadingPet] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false); // State for payment processing

  const dispatch = useDispatch();
  const authToken = useSelector(selectAuthToken);
  const user = useSelector(selectAuthUser); // Get user details for prefill
  const isWishlisted = useSelector((state) => selectIsPetInWishlist(state, id));
  const isUpdatingWishlist = useSelector((state) =>
    selectIsWishlistUpdating(state, id)
  );
  const wishlistError = useSelector(selectWishlistError);

  const cld = new Cloudinary({
    cloud: { cloudName: "dgz60odkx" },
  });

  // --- Fetch Pet Details ---
  useEffect(() => {
    async function fetchPet() {
      setLoadingPet(true);
      setFetchError(null);
      dispatch(clearWishlistError());
      try {
        // Use Axios for consistency if preferred, or keep fetch
        const response = await axios.get(
          `https://purrchase-server-production.up.railway.app/find/${id}`
        ); // Use relative path if baseURL is set
        // const response = await fetch(`http://localhost:5000/find/${id}`); // Or keep fetch
        // if (!response.ok && response.status !== 404) { // Check for fetch
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = response.ok ? await response.json() : null; // Check for fetch

        const data = response.data; // With Axios, data is directly available

        if (!data) {
          setPet(null);
          throw new Error("Pet not found");
        }
        setPet(data);
      } catch (err) {
        console.error(
          "Error fetching pet:",
          err.response?.data || err.message || err
        );
        if (err.response?.status === 404 || err.message === "Pet not found") {
          setFetchError("Pet not found.");
        } else {
          setFetchError("Failed to load pet details. Please try again later.");
        }
        setPet(null); // Ensure pet is null on error
      } finally {
        setLoadingPet(false);
      }
    }

    fetchPet();
  }, [id, dispatch]);

  // --- Fetch Initial Wishlist State ---
  useEffect(() => {
    if (authToken) {
      dispatch(fetchWishlist(authToken));
    }
  }, [dispatch, authToken]);

  // --- Toggle Wishlist Handler ---
  const handleWishlistToggle = useCallback(() => {
    if (!authToken) {
      alert("Please log in to manage your wishlist.");
      navigate("/login");
      return;
    }
    if (isUpdatingWishlist) return; // Prevent multiple clicks
    dispatch(clearWishlistError());
    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(id));
    }
  }, [dispatch, authToken, isWishlisted, id, navigate, isUpdatingWishlist]);

  // --- Helper to Load Razorpay Script ---
  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-checkout-script")) {
        resolve(true); // Already loaded
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-checkout-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Razorpay script failed to load.");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  // --- Adopt Now / Payment Handler ---
  const handleAdoptNow = useCallback(async () => {
    if (!pet || !authToken || !pet.available) {
      if (!authToken) alert("Please log in to adopt.");
      else if (!pet.available) alert("This pet has already been adopted.");
      return;
    }
    if (isProcessingPayment) return; // Prevent multiple clicks

    setIsProcessingPayment(true); // Set loading state

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert(
        "Could not load payment gateway. Please check your connection or try refreshing the page."
      );
      setIsProcessingPayment(false);
      return;
    }

    try {
      // 1. Call backend to create Razorpay Order & DB Order Record
      const orderResponse = await axios.post(
        `/orders/create/${id}`,
        {},
        {
          // Adjust prefix if needed
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      const { success, orderId, amount, currency, keyId, petName, prefill } =
        orderResponse.data;

      if (!success) {
        throw new Error(orderResponse.data.error || "Failed to create order");
      }

      // 2. Prepare Razorpay Checkout options
      const options = {
        key: keyId,
        amount: amount, // Amount in paise from backend
        currency: currency,
        name: "Purr-chase Adoption",
        description: `Adopt ${petName}`,
        image: pet?.images?.[0]
          ? cld
              .image(pet.images[0])
              .resize(auto().width(100).height(100))
              .toURL()
          : "",
        order_id: orderId, // The order_id obtained from backend
        handler: async function (response) {
          // 3. Payment Success: Send details to backend for verification
          setIsProcessingPayment(true); // Keep loading during verification
          try {
            console.log("Razorpay Success Response:", response);
            const verifyResponse = await axios.post(
              "/orders/validate",
              {
                // Adjust prefix if needed
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                // Sending petId back for potential cross-check, though backend uses orderId primarily
                petId: id,
              },
              {
                headers: { Authorization: `Bearer ${authToken}` },
              }
            );

            if (verifyResponse.data.success) {
              alert(`Adoption successful! Payment verified. Thank you!`);
              // --- Update UI or Redirect ---
              // Option 1: Refresh pet data to show 'Adopted'
              setPet((prevPet) => ({ ...prevPet, available: false })); // Optimistic UI update
              // Option 2: Fetch full pet details again
              // fetchPet(); // You'd need to modify fetchPet slightly or just rely on redirect
              // Option 3: Redirect
              navigate("/dashboard"); // Or navigate('/my-pets') etc.
            } else {
              // Verification failed on backend
              throw new Error(
                verifyResponse.data.error || "Payment verification failed."
              );
            }
          } catch (verifyError) {
            console.error(
              "Payment Verification Error:",
              verifyError.response?.data || verifyError.message || verifyError
            );
            alert(
              `Payment successful, but verification failed. Please contact support. Payment ID: ${response.razorpay_payment_id}`
            );
            // Maybe redirect to an error page or dashboard with a message
          } finally {
            setIsProcessingPayment(false); // Stop loading after verification attempt
          }
        },
        prefill: {
          name: prefill?.name || user?.username || "",
          email: prefill?.email || user?.email || "", // Use prefill data from backend or fallback to Redux user
          contact: prefill?.contact || user?.phone || "",
        },
        notes: {
          // You can add address or other notes if needed by Razorpay/your records
          // address: user?.address || ""
          dbPetId: id, // Send pet id in notes for potential webhook use
        },
        theme: {
          color: "#F37254", // Orange theme
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay checkout dismissed by user");
            setIsProcessingPayment(false); // Stop loading if user closes modal
          },
        },
      };

      // 4. Open Razorpay Checkout
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Razorpay Payment Failed:", response.error);
        alert(
          `Payment Failed: ${
            response.error.description || "Unknown Error"
          } (Code: ${response.error.code || "N/A"})`
        );
        setIsProcessingPayment(false); // Stop loading on failure
        // You could potentially update your DB order status to 'failed' via another API call here if needed
      });

      rzp.open();
      // Don't set loading to false here, handler/ondismiss/onfailed will handle it
    } catch (error) {
      console.error(
        "Error during adoption initiation:",
        error.response?.data || error.message || error
      );
      alert(
        `Error: ${
          error.response?.data?.error ||
          error.message ||
          "Could not initiate adoption process."
        }`
      );
      setIsProcessingPayment(false); // Stop loading on error during order creation
    }
    // Removed finally block here, loading is handled within try/catch/handler
  }, [
    pet,
    authToken,
    id,
    navigate,
    user,
    cld,
    loadRazorpayScript,
    dispatch,
    isProcessingPayment,
  ]); // Added dependencies

  // --- Loading State ---
  if (loadingPet) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // --- Error or Pet Not Found State ---
  if (fetchError || !pet) {
    return (
      <div className="text-center text-xl text-gray-400 py-20 bg-zinc-900 min-h-screen flex items-center justify-center">
        {fetchError || "Pet not found."}
      </div>
    );
  }

  // --- Image Rendering ---
  const petImg =
    pet.images && pet.images.length > 0
      ? cld
          .image(pet.images[0])
          .resize(auto().gravity(autoGravity()).width(600).height(600))
          .format("auto")
          .quality("auto")
      : null;

  // --- Render Pet Details ---
  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 sm:px-6 py-10 flex justify-center items-start pt-16">
      <div className="w-full max-w-5xl bg-zinc-800 p-6 md:p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left text-orange-500">
          {pet.name}
        </h1>

        {/* Display Wishlist Add/Remove Error */}
        {wishlistError && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded-md text-sm">
            Wishlist Error: {wishlistError}. Please Login again
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center items-start">
            {/* ... Image rendering ... */}
            {petImg ? (
              <AdvancedImage
                cldImg={petImg}
                className="rounded-xl object-cover w-full max-w-md aspect-square shadow-lg"
                alt={pet.name}
              />
            ) : (
              <div className="rounded-xl w-full max-w-md aspect-square bg-zinc-700 flex items-center justify-center shadow-lg">
                {" "}
                <span className="text-gray-400">No Image Available</span>{" "}
              </div>
            )}
          </div>

          {/* Details and Actions Section */}
          <div className="md:w-1/2 flex flex-col">
            {/* ... Description and Key Details sections ... */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-200 mb-2 border-b border-zinc-700 pb-1">
                About {pet.name}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {pet.description || "No description available."}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-200 mb-2 border-b border-zinc-700 pb-1">
                Details
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span className="font-medium text-gray-100">Species:</span>{" "}
                  {pet.species}
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-100">Breed:</span>{" "}
                  {pet.breed}
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-100">Age:</span>{" "}
                  {pet.age}{" "}
                  {typeof pet.age === "number"
                    ? pet.age > 1
                      ? "years"
                      : "year"
                    : ""}{" "}
                  old
                </li>
                <li className="flex justify-between border-t border-zinc-700 pt-2 mt-2">
                  <span className="font-semibold text-lg text-orange-400">
                    Adoption Fee:
                  </span>
                  <span className="font-semibold text-lg text-orange-400">
                    ${pet.price.toLocaleString()}
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-4">
              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                disabled={isUpdatingWishlist}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 ${
                  isWishlisted
                    ? "border-rose-500 bg-rose-500 text-white hover:bg-rose-600 hover:border-rose-600 focus:ring-rose-500"
                    : "border-gray-500 text-gray-300 hover:bg-zinc-700 hover:text-white focus:ring-gray-400"
                } ${isUpdatingWishlist ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {isUpdatingWishlist ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                ) : isWishlisted ? (
                  <HeartIconSolid className="h-5 w-5" />
                ) : (
                  <HeartIconOutline className="h-5 w-5" />
                )}
                <span>
                  {isUpdatingWishlist
                    ? "Updating..."
                    : isWishlisted
                    ? "Wishlisted"
                    : "Add to Wishlist"}
                </span>
              </button>

              {/* Adopt Now Button */}
              <button
                onClick={handleAdoptNow}
                disabled={isProcessingPayment || !pet?.available} // Disable if processing or not available
                className={`flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition text-white font-bold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-orange-500 ${
                  isProcessingPayment || !pet?.available
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } `}
              >
                {isProcessingPayment ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                ) : null}
                <span>
                  {isProcessingPayment
                    ? "Processing..."
                    : pet?.available
                    ? "Adopt Now"
                    : "Already Adopted"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
