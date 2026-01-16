import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Berita from "./pages/berita/Berita";
import Pengaduan from "./pages/Pengaduan";
import Layanan from "./pages/layanan/Layanan";
import PermohonanSurat from "./pages/layanan/PermohonanSurat";
import DetailDataKeluarga from "./pages/layanan/DetailDataKeluarga";
import DetailBansos from "./pages/layanan/DetailBansos";
import DetailLowongan from "./pages/layanan/DetailLowongan";
import DetailAPBDes from "./pages/layanan/DetailAPBDes";
import BeritaDetail from "./pages/berita/BeritaDetail";
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
        <Route path="/berita/:slug" element={<BeritaDetail />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/layanan/permohonan-surat" element={<PermohonanSurat />}/>
        <Route path="/layanan/data-keluarga" element={<DetailDataKeluarga />} />
        <Route path="/layanan/bansos" element={<DetailBansos />} />
        <Route path="/layanan/lowongan-kerja" element={<DetailLowongan />} />
        <Route path="/layanan/apbdes" element={<DetailAPBDes />} />

        <Route path="/pengaduan" element={<Pengaduan />} />
        <Route path="/kalender-event" element={<KalenderEvent />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </BrowserRouter>

    
  );
}