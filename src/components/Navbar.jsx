import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: 15, borderBottom: "1px solid #ccc" }}>
      {/* BRAND */}
      <strong>Desa Sumbersari</strong>

      {" | "}
      <Link to="/">Beranda</Link>
      {" | "}
      <Link to="/profile">Profil</Link>
      {" | "}
      <Link to="/berita">Layanan</Link>
      {" | "}
      <Link to="/berita">Berita</Link>
      {" | "}
      <Link to="/berita">Kontak</Link>

      {!token ? (
        <>
          {" | "}
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/pengaduan">Pengaduan</Link>
          {" | "}
          <Link to="/layanan">Layanan</Link>

          {/* 🔐 MENU KHUSUS ADMIN */}
          {role === "admin" && (
            <>
              {" | "}
              <Link to="/admin/berita">Kelola Berita</Link>
              {" | "}
              <Link to="/admin/event">Kelola Event</Link>
              {" | "}
              <Link to="/admin/infografis">Kelola Infografis</Link>
              {" | "}
              <Link to="/admin/pengaduan">Kelola Pengaduan</Link>
              {" | "}
              <Link to="/admin/layanan">Kelola Layanan</Link>
            </>
          )}

          {" | "}
          <span>
            👤 <b>{name}</b> ({role})
          </span>

          {" | "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
