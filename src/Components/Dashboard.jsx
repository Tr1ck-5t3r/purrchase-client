import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import activity from "../Assets/activity.png";
import current from "../Assets/current.png";
import find from "../Assets/find.png";
import articleimgfour from "../Assets/articleimgfour.png";
import pawpatterntwoc from "../Assets/pawpatterntwoc.png";
import { useEffect, useState } from "react";

const petData = [
  {
    name: "Bella",
    src: "https://example.com/bella.jpg",
    description: "Friendly and playful Labrador Retriever.",
    type: "dog",
    breed: "Labrador Retriever",
    age: 3,
  },
  {
    name: "Max",
    src: "https://example.com/max.jpg",
    description: "Calm and gentle Domestic Shorthair cat.",
    type: "cat",
    breed: "Domestic Shorthair",
    age: 5,
  },
  {
    name: "Charlie",
    src: "https://example.com/charlie.jpg",
    description: "Energetic and affectionate Golden Retriever puppy.",
    type: "dog",
    breed: "Golden Retriever",
    age: 1,
  },
];

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const [userdetails, setter] = useState({});

  useEffect(()=>{
    setter(user);
    console.log(userdetails)

  },[user]);

  return (
    <div className="min-h-screen bg-zinc-900 text-slate-300 px-6 py-8 flex justify-center">
      <div className="w-10/12">
        {/* User Profile Section */}
        <div className="relative my-10 flex justify-center">
          <img
            className="absolute w-[25rem] opacity-50 -left-6 -top-20 -rotate-45"
            src={pawpatterntwoc}
            alt="background"
          />
          <div className="w-7/12 bg-opacity-10 backdrop-blur-sm bg-slate-400 rounded-3xl px-10 py-8 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">
                  Hello,{" "}
                  <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                    {userdetails?.username || "Guest"}!
                  </span>
                </h2>
                <p className="mt-3">Email: {userdetails?.email || "N/A"}</p>
                <p>Phone: {userdetails?.phone || "N/A"}</p>
                <p>Address: {userdetails?.address || "N/A"}</p>
              </div>
              <div className="text-center">
                <img
                  src={userdetails?.profilePicture || articleimgfour}
                  alt="profile"
                  className="w-32 rounded-full shadow-md"
                />
                <Link
                  to="/edit_profile"
                  className="mt-3 inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {[
            { name: "Find", link: "/find", image: find, text: "Find a pet" },
            {
              name: "Your Pets",
              link: "/current",
              image: current,
              text: "View your pets",
            },
            {
              name: "Activity",
              link: "/activity",
              image: activity,
              text: "Check activity",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-opacity-10 backdrop-blur-sm bg-slate-400 rounded-xl p-6 hover:bg-opacity-20 transition"
            >
              <div className="text-center">
                <Link
                  to={item.link}
                  className="text-xl font-semibold text-orange-400 hover:underline"
                >
                  {item.name}
                </Link>
                <p className="mt-2 text-sm">{item.text}</p>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-36 mx-auto mt-4"
                />
                <Link
                  to={item.link}
                  className="mt-4 block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
                >
                  Go
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Current Pets", pets: petData },
            { title: "Your Activity", pets: petData },
          ].map((section, idx) => (
            <div
              key={idx}
              className="bg-opacity-10 backdrop-blur-sm bg-slate-400 rounded-3xl p-6"
            >
              <h2 className="text-xl font-bold text-center bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                {section.title}
              </h2>
              <div className="mt-3 border-t border-gray-600"></div>
              {section.pets.map((pet, index) => (
                <div
                  key={index}
                  className="mt-4 flex items-center border border-gray-700 p-3 rounded-lg hover:bg-zinc-800 transition"
                >
                  <img
                    src={articleimgfour}
                    alt={pet.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{pet.name}</h3>
                    <p className="text-sm">
                      {pet.type} - {pet.breed}, {pet.age} yrs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
