// frontend/src/Components/Footer.jsx
import { Link } from "react-router-dom"; // For internal navigation
// Import Heroicons (Outline version used here, choose solid if preferred)
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

/* const SocialLink = ({ href, ariaLabel, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="border-2 border-zinc-600 p-2 rounded-full text-slate-400 hover:text-white hover:border-orange-500 hover:bg-zinc-800 transition duration-200"
  >
    {children} 
  </a>
); */

function Footer() {
  return (
    // Added id="contact" correctly
    <footer
      id="contact"
      className="bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-950 via-[#0d0d0d] to-zinc-950 text-slate-400"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        {" "}
        {/* Added max-width and padding */}
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-2 lg:col-span-1 mb-6 md:mb-0">
            <Link to="/" className="inline-block mb-4">
              {" "}
              {/* Link the brand name */}
              <h1 className="w-max text-3xl font-Belanosima font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                Purr-chase
              </h1>
            </Link>
            <p className="text-sm text-justify">
              {" "}
              {/* Adjusted text size */}
              Be among the first to know about new pets, special offers,
              adoption events, and much more! Stay connected with our community.
            </p>
            {/* Optional: Newsletter Signup Form can go here */}
          </div>

          {/* Column 2: Navigation Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg text-orange-500 font-MavenPro font-semibold mb-3">
              {" "}
              {/* Adjusted color */}
              Navigation
            </h3>
            <ul className="space-y-2">
              {" "}
              {/* Added space-y */}
              <li>
                <Link
                  to="/"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/find"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  Find a Pet
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  About Us
                </Link>
              </li>
              {/* Add other relevant links */}
              <li>
                <Link
                  to="/gallery"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account Links (Conditional?) */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg text-orange-500 font-MavenPro font-semibold mb-3">
              {" "}
              {/* Adjusted color */}
              My Account
            </h3>
            {/* Consider conditionally showing these links based on auth status */}
            <ul className="space-y-2">
              <li>
                <Link
                  to="/edit_profile"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  Wishlist
                </Link>
              </li>
              {/* Add links to order history etc. if applicable */}
              <li>
                <Link
                  to="/dashboard"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="font-Quicksand text-sm hover:text-slate-200 transition"
                >
                  Login/Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="">
            <h3 className="text-lg text-orange-500 font-MavenPro font-semibold mb-3">
              {" "}
              {/* Adjusted color */}
              Contact Us
            </h3>
            <ul className="space-y-3">
              {" "}
              {/* Increased spacing */}
              <li className="flex items-center text-sm hover:text-slate-200 transition group">
                {" "}
                {/* Align items center */}
                <PhoneIcon
                  className="w-5 h-5 mr-3 text-orange-500 group-hover:text-orange-300"
                  aria-hidden="true"
                />{" "}
                {/* Use Icon */}
                <a href="tel:+91 8438976220">8438976220</a>{" "}
                {/* Make phone clickable */}
              </li>
              <li className="flex items-start text-sm hover:text-slate-200 transition group">
                {" "}
                {/* Align items start for multi-line */}
                <MapPinIcon
                  className="w-5 h-5 mr-3 mt-0.5 text-orange-500 flex-shrink-0 group-hover:text-orange-300"
                  aria-hidden="true"
                />{" "}
                {/* Use Icon */}
                <span>
                  {" "}
                  {/* Wrap text in span for alignment */}
                  12 Purrfect Street, <br />
                  Meowville, ST 12345
                </span>
              </li>
              <li className="flex items-center text-sm hover:text-slate-200 transition group">
                <EnvelopeIcon
                  className="w-5 h-5 mr-3 text-orange-500 group-hover:text-orange-300"
                  aria-hidden="true"
                />{" "}
                {/* Use Icon */}
                <a href="mailto:tarungovindharaj2003@gmail.com">
                  tarungovindharaj2003@gmail.com
                </a>{" "}
                {/* Make email clickable */}
              </li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <div className="mt-12 mb-8">
          {" "}
          {/* Adjusted margin */}
          {/* Fixed typo: from-transparent */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
        </div>
        {/* Bottom Section: Social Links & Copyright */}
        <div className="text-center">
          {/* Copyright */}
          <p className="text-xs">
            {" "}
            {/* Smaller text */}© {new Date().getFullYear()} Purr-chase. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
