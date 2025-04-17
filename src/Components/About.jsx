import articleimgthree from "../Assets/articleimgthree.png"; // Assuming the path is correct
import { Link } from "react-router-dom"; // For potential Call to Action button
// Example Icons (using Heroicons - install if needed: npm install @heroicons/react)
import {
  HeartIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function About() {
  return (
    <div className="min-h-screen bg-zinc-900 px-4 sm:px-6 lg:px-10 py-12 md:py-20 flex justify-center items-center text-slate-300">
      {/* Main Content Container */}
      <div className="w-full m-6 max-w-6xl backdrop-blur-sm bg-slate-400 bg-opacity-5 rounded-3xl p-6 sm:p-10 md:p-16 shadow-lg border border-zinc-700/50">
        {" "}
        {/* Reduced opacity, added border */}
        {/* Top Section: Image and Main Text */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="md:w-3/5 lg:w-7/12">
            {" "}
            {/* Adjusted width */}
            <h2 className="font-medium font-MavenPro text-3xl sm:text-4xl mb-6 text-center md:text-left">
              <span className="hover:cursor-pointer bg-gradient-to-r from-rose-500 to-orange-500 bg-no-repeat bg-bottom bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-[background-size] pb-1">
                {" "}
                {/* Added padding-bottom */}
                About Us
              </span>
            </h2>
            <div className="text-base sm:text-lg text-slate-300 leading-relaxed space-y-4 text-justify md:text-left">
              {" "}
              {/* Increased text size, line height, added spacing */}
              <p>
                Welcome to{" "}
                <strong className="font-semibold text-orange-400">
                  Purrchase
                </strong>
                , where we connect wonderful animals with loving forever homes.
                Our mission is to make the adoption journey simple, joyful, and
                fulfilling for both pets and adopters. We feature a diverse
                range of companions - from playful pups and cuddly kittens to
                other unique pets - ensuring you can find the perfect match for
                your lifestyle.
              </p>
              <p>
                We proudly collaborate with reputable shelters and dedicated
                rescue organizations. This partnership ensures every pet
                receives the care they deserve while we champion responsible pet
                ownership. Adopting through Purrchase isnt just about getting a
                pet; its about creating a special bond and transforming lives –
                yours and theirs.
              </p>
              <p>
                Thank you for considering adoption and for choosing Purrchase.
                Together, lets make a pawsitive difference, one adoption at a
                time.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-2/5 lg:w-5/12 flex justify-center items-center mt-6 md:mt-0">
            <img
              src={articleimgthree}
              className="rounded-xl shadow-lg object-cover w-full max-w-sm md:max-w-full" // Responsive max-width
              alt="Happy pets and owners" // More descriptive alt text
            />
          </div>
        </div>
        {/* Divider */}
        <hr className="my-10 md:my-16 border-zinc-700" />
        {/* Our Values/Mission Section */}
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
            Why Choose Purrchase?
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
          {/* Value 1 */}
          <div className="flex flex-col items-center p-4">
            <HomeIcon className="h-12 w-12 text-orange-500 mb-3" />
            <h4 className="text-xl font-semibold text-white mb-2">
              Loving Homes
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              We are dedicated to matching every pet with a safe, caring, and
              permanent family environment.
            </p>
          </div>
          {/* Value 2 */}
          <div className="flex flex-col items-center p-4">
            <ShieldCheckIcon className="h-12 w-12 text-rose-500 mb-3" />
            <h4 className="text-xl font-semibold text-white mb-2">
              Ethical Partnerships
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              We partner exclusively with verified shelters and rescues that
              uphold the highest standards of animal welfare.
            </p>
          </div>
          {/* Value 3 */}
          <div className="flex flex-col items-center p-4">
            <HeartIcon className="h-12 w-12 text-orange-500 mb-3" />
            <h4 className="text-xl font-semibold text-white mb-2">
              Supportive Journey
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              From browsing to post-adoption, we offer resources and support to
              ensure a smooth transition for everyone.
            </p>
          </div>
        </div>
        {/* Call to Action */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/find" // Link to your pet finding page
            className="inline-block bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Find Your Furry Friend
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
