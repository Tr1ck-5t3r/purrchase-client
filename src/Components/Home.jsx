import  { useEffect, useState } from "react"; // Added useEffect, useState
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
import FeaturedPetsCarousel from "./FeaturedCarousel";
import articleimgfour from "../Assets/articleimgfour.png";
import pawpatterntwoc from "../Assets/pawpatterntwoc.png";
import pawpatterntwo from "../Assets/pawpatterntwo.png";

function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  // Fetch featured pets (e.g., recent pets from gallery)
  useEffect(() => {
    const fetchFeatured = async () => {
      setLoadingFeatured(true);
      setErrorFeatured(null);
      try {
        // Fetch from your /gallery endpoint or a dedicated /featured endpoint
        const response = await axios.get("/gallery"); // Adjust endpoint if needed
        setFeaturedPets(response.data || []); // Ensure it's an array
      } catch (err) {
        console.error(
          "Error fetching featured pets:",
          err.response?.data || err.message
        );
        setErrorFeatured("Could not load featured pets.");
      } finally {
        setLoadingFeatured(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-zinc-900">
      {/* Hero Section */}
      <div className="relative sm:px-10 p-8 min-h-screen flex items-center justify-center">
        {" "}
        {/* Adjusted padding, min-h-screen */}
        <div className="relative flex justify-center w-full max-w-8xl mx-auto">
          {" "}
          {/* Added max-width */}
          {/* Decorative Paw Patterns */}
          <img
            className="w-48 md:w-72 lg:w-[30rem] opacity-30 md:opacity-50 absolute -left-4 md:left-12 -top-10 md:-top-20 -rotate-[40deg] hidden lg:block pointer-events-none"
            src={pawpatterntwoc}
            alt=""
          />
          <img
            className="w-48 md:w-60 lg:w-[18rem] opacity-30 md:opacity-50 absolute -bottom-16 md:-bottom-24 right-4 md:right-32 -rotate-[45deg] hidden lg:block pointer-events-none"
            src={pawpatterntwo}
            alt=""
          />
          {/* Article Content */}
          <article className="relative z-10 hover:drop-shadow-xl px-6 py-8 sm:px-12 sm:py-10 w-full md:w-10/12 lg:w-8/12 backdrop-blur-sm bg-zinc-700 rounded-3xl bg-opacity-20 shadow-md border border-zinc-600/50">
            {" "}
            {/* Responsive width, added border */}
            <div className="text-slate-200 flex flex-col md:flex-row items-center gap-8 md:justify-between">
              {" "}
              {/* Adjusted layout and gap */}
              {/* Text Side */}
              <div className="md:w-1/2 lg:w-3/5 text-center md:text-left">
                <h2 className="font-MavenPro text-3xl lg:text-4xl font-semibold py-4">
                  {" "}
                  {/* Adjusted font */}
                  Ready to become a 
                  <Link to="/find" className="inline-block">
                    <span className="py-1 bg-gradient-to-r from-rose-500 to-orange-500 bg-no-repeat bg-bottom bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-all cursor-pointer">
                      Pet Parent?
                    </span>
                  </Link>
                </h2>
                <h4 className="font-MavenPro text-base lg:text-lg text-slate-300 mt-2 mb-6 leading-relaxed">
                  {" "}
                  {/* Adjusted size/line height */}
                  Brighten your days and find endless joy. Discover your perfect
                  furry, scaled, or feathered companion today!
                </h4>
                <Link to="/find">
                  <button className="py-2 px-6 rounded-lg bg-white text-orange-600 font-semibold shadow-sm hover:text-pink-500 hover:bg-gray-100 transition duration-200">
                    Find Now
                  </button>
                </Link>
              </div>
              {/* Image Side */}
              <div className="md:w-1/2 lg:w-2/5 flex justify-center md:justify-end">
                <img
                  src={articleimgfour}
                  alt="Happy person with multiple pets"
                  className="w-full max-w-xs md:max-w-sm rounded-lg shadow-lg" // Responsive image size
                />
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Featured Pets - Pass fetched data */}
      {loadingFeatured ? (
        <div className="text-center py-16 text-slate-400">
          Loading featured pets...
        </div>
      ) : errorFeatured ? (
        <div className="text-center py-16 text-red-500">{errorFeatured}</div>
      ) : featuredPets.length > 0 ? (
        <FeaturedPetsCarousel pets={featuredPets} />
      ) : (
        <div className="text-center py-16 text-slate-400">
          No featured pets to show right now.
        </div>
      )}

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-rose-600 text-center py-16 px-6 text-white shadow-inner">
        {" "}
        {/* Gradient BG */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Join Our Pet-Loving Community!
        </h2>
        <p className="text-lg text-orange-100 mb-6 max-w-2xl mx-auto">
          {" "}
          {/* Constrained width */}
          Sign up to save your favorites, get notified about new arrivals, and
          connect with fellow pet enthusiasts.
        </p>
        <div>
          <Link to="/register">
            <button className="btn btn-primary px-8 py-3 bg-white text-orange-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition duration-200">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-zinc-900 px-6 sm:px-10 py-16">
        <h2 className="text-center text-slate-300 text-3xl font-bold font-MavenPro mb-10 md:mb-12">
          Happy Pet Parents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {" "}
          {/* Centered grid */}
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-zinc-800 p-6 rounded-lg text-slate-300 border border-zinc-700/50 shadow-md"
              >
                <p className="italic text-slate-400 text-sm mb-3">
                  {" "}
                  {/* Adjusted text size/color */}
                  "Finding {i % 2 === 0 ? "Luna" : "Rocky"} on Purrchase was the
                  best decision! The process was so smooth, and now our home is
                  filled with so much more joy. Highly recommend!"
                </p>
                <span className="block text-right font-semibold text-orange-400">
                  - {i % 2 === 0 ? "Sarah K." : "Mike P."} {/* Example names */}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
