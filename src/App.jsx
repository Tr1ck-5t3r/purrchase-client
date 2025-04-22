// App.js

import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

// Public Components
import Home from "./Components/Home";
import About from "./Components/About";
import Find from "./Components/Find";
import Gallery from "./Components/Gallery";
import PetDetails from "./Components/PetDetails";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Components/NotFound";

// Protected Components
import Dashboard from "./Components/Dashboard";
import Current from "./Components/Current"; // Assuming requires login
import Editprofile from "./Components/Editprofile"; // Assuming requires login
import Wishlist from "./Components/Wishlist"; // Assuming requires login


import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoutes"; // Adjust path if necessary

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/find" element={<Find />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pet/:id" element={<PetDetails />} />{" "}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/current" element={<Current />} />
          <Route path="/edit_profile" element={<Editprofile />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
