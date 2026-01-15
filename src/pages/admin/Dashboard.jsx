import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";


export default function AdminDashboard() {
  

  const adminName = localStorage.getItem("name") || "Admin";
  const [activities, setActivities] = useState([]);

  const [dateTime, setDateTime] = useState(new Date());

  const [stats, setStats] = useState({
    services: 0,
    news: 0,
    events: 0,
    complaints: 0,
    users: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  const fetchStats = async () => {
  try {
    const [layananRes, beritaRes, eventRes] = await Promise.all([
      apiClient.get("/layanan"),
      apiClient.get("/berita"),
      apiClient.get("/events"),
    ]);

    let complaintsCount = 0;
    let userCount = 0;

    // 🔐 ADMIN: PENGADUAN
    try {
      const pengaduanRes = await apiClient.get("/admin/pengaduan");
      complaintsCount = pengaduanRes.data?.data?.length || 0;
    } catch {
      console.warn("Gagal mengambil pengaduan admin");
    }

    // 🔐 ADMIN: USERS
    try {
      const userRes = await apiClient.get("/admin/users");
      userCount = userRes.data?.data?.length || 0;
    } catch {
      console.warn("Gagal mengambil data user");
    }

    setStats({
      services: layananRes.data?.data?.length || 0,
      news: beritaRes.data?.data?.length || 0,
      events: eventRes.data?.data?.length || 0,
      complaints: complaintsCount,
      users: userCount,
    });
  } catch (error) {
    console.error("Gagal mengambil data statistik:", error);
  }
};

const fetchActivities = async () => {
  try {
    const res = await apiClient.get("/api/admin/activities");

    console.log("RESPON ACTIVITIES:", res.data); // 🔍 DEBUG

    // 🔑 AMBIL data di .data
    setActivities(res.data.data);
  } catch (error) {
    console.error("Gagal mengambil aktivitas terbaru", error);
  }
};


useEffect(() => {
  fetchStats();
  fetchActivities();
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

    const screenWidth = window.innerWidth;

let statsColumns = "repeat(5, 1fr)";

if (screenWidth < 1280) statsColumns = "repeat(4, 1fr)";
if (screenWidth < 1024) statsColumns = "repeat(3, 1fr)";
if (screenWidth < 768) statsColumns = "repeat(2, 1fr)";
if (screenWidth < 480) statsColumns = "repeat(1, 1fr)";



  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={title}>Dashboard Admin</h1>
          <p style={subtitle}>
            Selamat datang, <strong>{adminName}</strong> 
          </p>
        </div>

        <div style={timeBox}>
          <div style={dateText}>{formatDate(dateTime)}</div>
          <div style={timeText}>{formatTime(dateTime)}</div>
        </div>
      </div>

      <div
  style={{
    ...statsGrid,
    gridTemplateColumns: statsColumns,
  }}
>
  <StatCard
  title="Total Layanan"
  value={stats.services}
  icon={
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 10l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  }
/>
  <StatCard
  title="Total Berita"
  value={stats.news}
  icon={
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 8h6M7 12h10M7 16h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  }
/>

  <StatCard
  title="Event Desa"
  value={stats.events}
  icon={
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 3v4M8 3v4M3 9h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14" r="2" fill="currentColor" />
    </svg>
  }
/>

<StatCard
  title="Total Pengaduan"
  value={stats.complaints}
  icon={
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v4M12 16h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  }
/>

  <StatCard
    title="Total Pengguna"
    value={stats.users}
    icon={
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    }
  />
</div>

      <div style={widget}>
  <h3>Aktivitas Terbaru</h3>

  {activities.length === 0 ? (
  <p>Belum ada aktivitas terbaru</p>
) : (
  <ul>
    {activities.map((item, index) => (
      <li key={index}>
        <strong>{item.type.toUpperCase()}</strong> — {item.title}
        <br />
        <small>{item.created_at}</small>
      </li>
    ))}
  </ul>
  )}
</div>

    </div>
  );
}
const StatCard = ({ title, value, icon }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...statCard,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? "0 14px 30px rgba(0,0,0,0.12)"
          : statCard.boxShadow,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          ...iconBox,
          transform: hover ? "scale(1.1)" : "scale(1)",
        }}
      >
        {icon}
      </div>

      <h4 style={statTitle}>{title}</h4>
      <p style={statValue}>{value}</p>
    </div>
  );
};


const page = {
  padding: "10px 20px 20px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const title = {
  marginLeft: "10px", 
  fontSize: "26px",
  color: "#064e3b",
};

const subtitle = {
  marginTop: "6px",
  marginLeft: "2px", 
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
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  gap: "14px",
  marginBottom: "30px",
  alignItems: "stretch",
};

const statCard = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "12px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  height: "140px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "all 0.25s ease",
};

const iconBox = {
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ecfdf5",
  borderRadius: "50%",
  color: "#0f766e",
  marginBottom: "6px",
  transition: "transform 0.25s ease",
};


const statTitle = {
  margin: 0,
  fontSize: "13px",
  color: "#6b7280",
};

const statValue = {
  marginTop: "6px",
  fontSize: "22px",
  fontWeight: "bold",
  color: "#064e3b",
};

const widget = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
};

statCard.transition = "all 0.2s ease";
statCard.cursor = "default";
