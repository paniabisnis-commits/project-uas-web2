import { NavLink, useNavigate } from "react-router-dom";

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
      <strong className="brand">Desa Sumbersari</strong>

      <NavLink to="/" className="nav-link">
        Beranda
      </NavLink>

      <NavLink to="/profile" className="nav-link">
        Profil
      </NavLink>

      <NavLink to="/layanan" className="nav-link">
        Layanan Publik
      </NavLink>

      <NavLink to="/berita" className="nav-link">
        Berita
      </NavLink>

      <NavLink to="/kontak" className="nav-link">
        Kontak
      </NavLink>

      {!token ? (
        <NavLink to="/login" className="nav-link login">
          Login
        </NavLink>
      ) : (
        <>
          

          <span className="user">👤 {name}</span>

          <button className="logout" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
