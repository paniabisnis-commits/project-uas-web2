import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const adminName = localStorage.getItem("name") || "Admin";

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (date) =>
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={title}>Dashboard Admin</h1>
          <p style={subtitle}>
            Selamat datang, <strong>{adminName}</strong> 👋
          </p>
        </div>

        <div style={timeBox}>
          <div style={dateText}>{formatDate(dateTime)}</div>
          <div style={timeText}>{formatTime(dateTime)}</div>
        </div>
      </div>

      {/* STATISTIK */}
      <div style={statsGrid}>
        <StatCard title="Total Layanan" value="12" />
        <StatCard title="Total Berita" value="28" />
        <StatCard title="Event Desa" value="5" />
        <StatCard title="Total Pengguna" value="134" />
      </div>

      {/* WIDGET */}
      <div style={widgetGrid}>
        <div style={widget}>
          <h3>Aktivitas Terakhir</h3>
          <ul>
            <li>Admin menambah layanan baru</li>
            <li>Berita desa diperbarui</li>
            <li>User baru melakukan registrasi</li>
          </ul>
        </div>

        <div style={widget}>
          <h3>Pengumuman</h3>
          <p>
            Pastikan data layanan dan berita selalu diperbarui agar masyarakat
            mendapatkan informasi terbaru.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

const StatCard = ({ title, value }) => (
  <div style={statCard}>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

/* ================= STYLE ================= */

const page = {
  padding: "30px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const title = {
  margin: 0,
  fontSize: "26px",
  color: "#064e3b",
};

const subtitle = {
  marginTop: "6px",
  color: "#374151",
};

const timeBox = {
  textAlign: "right",
  background: "#ecfdf5",
  padding: "12px 18px",
  borderRadius: "10px",
  border: "1px solid #bbf7d0",
};

const dateText = {
  fontSize: "14px",
  color: "#065f46",
};

const timeText = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#0f766e",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const statCard = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "22px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
};

const widgetGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const widget = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
};
