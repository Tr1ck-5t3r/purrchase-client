import articleimgfour from "../Assets/articleimgfour.png";
import pawpatterntwoc from "../Assets/pawpatterntwoc.png";
import pawpatterntwo from "../Assets/pawpatterntwo.png";
import { Link } from "react-router-dom";
import FeaturedPetsCarousel from "./FeaturedCarousel";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home() {
    let user = useSelector((state) => state.auth.user);
    useEffect(() => {
        console.log(user);
    },[user]);

  return (
    <div className="bg-zinc-900">
      {/* Hero Section */}
      <div className="relative px-10 py-8 h-screen flex items-center justify-center">
        <div className="relative flex justify-center">
          <img
            className="w-[30rem] opacity-70 absolute left-12 -top-20 -rotate-[40deg] hidden lg:block"
            src={pawpatterntwoc}
            alt="paw pattern"
          />
          <img
            className="w-[18rem] opacity-70 absolute -bottom-24 right-32 -rotate-[45deg] hidden lg:block"
            src={pawpatterntwo}
            alt="paw pattern"
          />
          <article className="hover:drop-shadow-xl px-12 py-10 w-8/12 backdrop-blur-sm bg-zinc-700 rounded-3xl bg-opacity-10 shadow-md">
            <div className="text-slate-300 flex flex-col md:flex-row justify-evenly px-12 py-10">
              <div className="pt-3">
                <h2 className="font-MavenPro text-3xl py-4">
                  Wanna become a
                  <Link to="/find">
                    <span className="ml-3 py-1 bg-gradient-to-r from-rose-500 to-orange-500 bg-no-repeat bg-bottom bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-all cursor-pointer">
                      Pet Parent?
                    </span>
                  </Link>
                </h2>
                <h4 className="font-MavenPro text-base">
                  Pets are the perfect foil to boredom! Wanna spend your time
                  with these best buddies? Find your purr-fect match now!
                </h4>
                <br />
                <Link to="/find">
                  <button className="py-2 px-4 rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50">
                    Find now
                  </button>
                </Link>
              </div>
              <div>
                <img src={articleimgfour} alt="articleimgfour" />
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-zinc-800 text-center py-16 text-white">
        <h2 className="text-4xl font-bold">Join Our Pet-Loving Community!</h2>
        <p className="text-lg mt-4">
          Adopt, Learn, and Connect with fellow pet enthusiasts.
        </p>
        <div className="mt-6">
          <Link to="/register">
            <button className="btn btn-primary px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Pets - Slider */}
      <FeaturedPetsCarousel/>

      {/* Testimonials */}
      <div className="bg-zinc-900 px-10 py-16">
        <h2 className="text-center text-slate-300 text-2xl font-MavenPro mb-6">
          Happy Pet Parents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-zinc-800 p-6 rounded-lg text-slate-300">
                <p className="italic">
                  Testimonial {i + 1} - This pet changed my life!
                </p>
                <span className="block mt-2 text-right font-bold">
                  - Pet Parent {i + 1}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
