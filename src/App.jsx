import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUT
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// PUBLIC PAGES
import Login from "./pages/Login";
import Home from "./pages/Home";
import Berita from "./pages/berita/Berita";
import BeritaDetail from "./pages/berita/BeritaDetail";
import Pengaduan from "./pages/Pengaduan";
import Layanan from "./pages/layanan/Layanan";
import PermohonanSurat from "./pages/layanan/PermohonanSurat";
import DetailDataKeluarga from "./pages/layanan/DetailDataKeluarga";
import DetailBansos from "./pages/layanan/DetailBansos";
import DetailLowongan from "./pages/layanan/DetailLowongan";
import DetailAPBDes from "./pages/layanan/DetailAPBDes";
import KalenderEvent from "./pages/KalenderEvent";
import Kontak from "./pages/Kontak";
import Profile from "./pages/Profile";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayanan from "./pages/admin/Layanan";
import AdminBerita from "./pages/admin/Berita";
import AdminEvent from "./pages/admin/Event";
import AdminPengaduan from "./pages/admin/Pengaduan";
import AdminUsers from "./pages/admin/Users";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= USER ROUTES ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:slug" element={<BeritaDetail />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/layanan/permohonan-surat" element={<PermohonanSurat />} />
          <Route path="/layanan/data-keluarga" element={<DetailDataKeluarga />} />
          <Route path="/layanan/bansos" element={<DetailBansos />} />
          <Route path="/layanan/lowongan-kerja" element={<DetailLowongan />} />
          <Route path="/layanan/apbdes" element={<DetailAPBDes />} />
          <Route path="/pengaduan" element={<Pengaduan />} />
          <Route path="/kalender-event" element={<KalenderEvent />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/layanan/:slug" element={<DetailBansos />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/layanan" element={<AdminLayanan />} />
            <Route path="/admin/berita" element={<AdminBerita />} />
            <Route path="/admin/event" element={<AdminEvent />} />
            <Route path="/admin/pengaduan" element={<AdminPengaduan />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
