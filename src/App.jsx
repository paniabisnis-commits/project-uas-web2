import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Berita from "./pages/Berita";
import Pengaduan from "./pages/Pengaduan";
import Layanan from "./pages/Layanan";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/pengaduan" element={<Pengaduan />} />
      </Routes>
    </BrowserRouter>

    
  );
}