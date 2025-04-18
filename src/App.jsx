import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Find from './Components/Find';
import NotFound from './Components/NotFound';
import Gallery from './Components/Gallery';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import Current from './Components/Current';
import Editprofile from './Components/Editprofile';
import Wishlist from './Components/Wishlist';
import PetDetails from './Components/PetDetails';

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/current" element={<Current />} />
        <Route path="/edit_profile" element={<Editprofile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
