import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Berita from "./pages/Berita";
import Pengaduan from "./pages/Pengaduan";
import Profile from "./pages/Profile";
import Layanan from "./pages/Layanan";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/pengaduan" element={<Pengaduan />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>

      <Footer />
    </BrowserRouter>

    
  );
}