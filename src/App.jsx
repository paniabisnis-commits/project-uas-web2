import { BrowserRouter, Routes, Route } from "react-router-dom";

// PUBLIC
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Berita from "./pages/Berita";
import Pengaduan from "./pages/Pengaduan";
import Layanan from "./pages/layanan/Layanan";
import LayananDetail from "./pages/layanan/LayananDetail";
import KalenderEvent from "./pages/KalenderEvent";
import Kontak from "./pages/Kontak";
import Profile from "./pages/Profile";

// ADMIN
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayanan from "./pages/admin/Layanan";
import AdminBerita from "./pages/admin/Berita";
import AdminEvent from "./pages/admin/Event";
import AdminUsers from "./pages/admin/Users";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/*"
          element={
            <>
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
            </>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="layanan" element={<AdminLayanan />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="event" element={<AdminEvent />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
