import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Berita from "./pages/Berita";
import Pengaduan from "./pages/Pengaduan";
import Layanan from "./pages/layanan/Layanan";
import LayananDetail from "./pages/layanan/LayananDetail";
import KalenderEvent from "./pages/KalenderEvent";
import Kontak from "./pages/Kontak";
import Profile from "./pages/Profile";
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
        <Route path="/layanan/:slug" element={<LayananDetail />} />
        <Route path="/pengaduan" element={<Pengaduan />} />
        <Route path="/kalender-event" element={<KalenderEvent />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </BrowserRouter>

    
  );
}