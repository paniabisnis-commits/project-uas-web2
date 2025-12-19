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
    <nav className="navbar">
      <strong>Desa Sumbersari</strong>

      {" | "}
      <Link to="/">Beranda</Link>
      {" | "}
      <Link to="/profile">Profil</Link>
      {" | "}
      <Link to="/layanan">Layanan Publik</Link>
      {" | "}
      <Link to="/berita">Berita</Link>
      {" | "}
      <Link to="/kontak">Kontak</Link>

      {!token ? (
        <>
          {" | "}
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/pengaduan">Pengaduan</Link>

          {role === "admin" && (
            <>
              {" | "}
              <Link to="/admin/berita">Kelola Berita</Link>
            </>
          )}

          {" | "}
          <span>👤 <b>{name}</b> ({role})</span>

          {" | "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
