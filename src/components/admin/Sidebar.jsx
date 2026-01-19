import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/logo-desa.png";

export default function Sidebar() {
    const navigate = useNavigate();
  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: dashboardIcon,
    },
    {
      name: "Layanan",
      path: "/admin/layanan",
      icon: layananIcon,
    },
    {
      name: "Berita",
      path: "/admin/berita",
      icon: beritaIcon,
    },
    {
      name: "Event",
      path: "/admin/event",
      icon: eventIcon,
    },
    {
      name: "Pengaduan",
      path: "/admin/pengaduan",
      icon: pengaduanIcon,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: usersIcon,
    },
  ];

  
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 🧹 Hapus semua data login
      localStorage.clear();
      sessionStorage.clear();

      // 🚪 Arahkan ke login
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside style={sidebar}>
      <div style={brand}>
        <img src={logo} alt="Logo Desa" style={logoStyle} />
        <h2 style={brandTitle}>ADMIN DESA</h2>
        <p style={brandSub}>Sumbersari</p>
      </div>

        <div>
      <nav style={menuWrapper}>
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              ...menuItem,
              backgroundColor: isActive ? "#d1fae5" : "transparent",
              color: isActive ? "#065f46" : "#064e3b",
              fontWeight: isActive ? "600" : "500",
            })}
          >
            <span style={icon}>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      </div>
      <button onClick={handleLogout} style={logoutItem}>
      <span style={icon}>{logoutIcon}</span>
      Logout
    </button>
    </aside>
  );
}

const dashboardIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const layananIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.3L4.74 7 12 3.7 19.26 7 12 9.3zM2 17l10 5 10-5v-6l-10 5-10-5v6z" />
  </svg>
);

const beritaIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h14v2H4V4zm0 4h14v2H4V8zm0 4h10v2H4v-2zm0 4h10v2H4v-2z" />
  </svg>
);

const eventIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
  </svg>
);

const pengaduanIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ marginTop: "5px" }} 
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v14l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const usersIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const logoutIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
    <path d="M20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

const sidebar = {
  width: "240px",
  minHeight: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",            
  background: "linear-gradient(180deg, #ecfdf5, #d1fae5)",
  borderRight: "1px solid #bbf7d0",
  display: "flex",
  flexDirection: "column",
};

const logoStyle = {
  width: "42px",        
  height: "42px",
  objectFit: "contain", 
  margin: "2px auto 4px", 
  display: "block",
};

const brand = {
  padding: "10px 20px 14px",
  borderBottom: "1px solid #bbf7d0",
  textAlign: "center",
};

const brandTitle = {
  margin: 0,
  fontSize: "18px",
  color: "#064e3b",
};

const brandSub = {
  margin: 0,
  fontSize: "13px",
  color: "#047857",
};

const menuWrapper = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  flex: 1,               
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 14px",
  borderRadius: "8px",
  textDecoration: "none",
  transition: "all 0.25s ease",
};

const icon = {
  display: "flex",
  alignItems: "center",
};

const logoutItem = {
  ...menuItem,               
  margin: "15px",
  border: "none",
  cursor: "pointer",
  background: "#3e7258ff", 
  color: "#ecfdf5",
  fontWeight: "600",
};