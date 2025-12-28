import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logoDesa from "../assets/logo-desa.png"; 

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const avatar = localStorage.getItem("avatar");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  /* ================= DARK MODE ================= */
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ================= BERANDA ACTIVE ================= */
  const isBerandaActive =
    location.pathname === "/" ||
    location.pathname === "/kalender-event";

  return (
    <>
      <nav className="navbar">
        {/* ================= KIRI (LOGO + NAMA DESA) ================= */}
        <div className="nav-left brand-wrapper">
          <img
            src={logoDesa}
            alt="Logo Desa Sumbersari"
            className="brand-logo"
          />
          <div className="brand-text">
            <strong>Desa Sumbersari</strong>
            <span>Kec. Sumbersuko</span>
          </div>
        </div>

        {/* ================= TENGAH ================= */}
        <div className={`nav-center ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={`nav-link ${isBerandaActive ? "active" : ""}`}
          >
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
        </div>

        {/* ================= KANAN ================= */}
        <div className="nav-right">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          {!token ? (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          ) : (
            <div className="user-area" ref={dropdownRef}>
              <div className="avatar-wrapper" onClick={() => setOpen(!open)}>
                {avatar ? (
                  <img src={avatar} className="avatar-img" />
                ) : (
                  <div className="user-avatar">{initials}</div>
                )}
                <div className="avatar-tooltip">{name}</div>
              </div>

              {open && (
                <div className="dropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowProfile(true);
                      setOpen(false);
                    }}
                  >
                    Profil Saya
                  </button>
                  <button className="dropdown-item logout" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ================= MODAL PROFILE ================= */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Profil Pengguna</h3>

            {avatar ? (
              <img src={avatar} className="modal-avatar" />
            ) : (
              <div className="modal-avatar fallback">{initials}</div>
            )}

            <div className="modal-content">
              <p><strong>Nama:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Role:</strong> {role}</p>

              <div className="theme-toggle">
                <span>Dark Mode</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>
            </div>

            <button className="close-btn" onClick={() => setShowProfile(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
