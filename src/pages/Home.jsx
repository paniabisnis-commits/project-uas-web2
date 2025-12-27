import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PengaduanSection from "../components/PengaduanSection";
import CountUpNumber from "../components/CountUpNumber";

export default function Home() {
    const location = useLocation();

  useEffect(() => {
  if (location.hash === "#pengaduan") {
    const element = document.getElementById("pengaduan");
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }
}, [location]);

const [isLayananVisible, setIsLayananVisible] = useState(false);

useEffect(() => {
  const section = document.getElementById("layanan-publik");

  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsLayananVisible(true);
        observer.disconnect(); // animasi hanya sekali
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(section);

  return () => observer.disconnect();
}, []);

const [isBeritaVisible, setIsBeritaVisible] = useState(false);

useEffect(() => {
  const section = document.getElementById("berita-section");
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsBeritaVisible(true);
        observer.disconnect(); // jalan sekali
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
  return () => observer.disconnect();
}, []);

  const sideNews = [
  {
    title: "Musyawarah Desa Tahun 2025",
    date: "14 Januari 2025",
    excerpt: "Pembahasan rencana pembangunan dan anggaran desa."
  },
  {
    title: "Pembangunan Infrastruktur Desa",
    date: "13 Januari 2025",
    excerpt: "Peningkatan akses jalan dan fasilitas umum."
  },
  {
    title: "Pelayanan Administrasi Online",
    date: "12 Januari 2025",
    excerpt: "Kini masyarakat dapat mengurus administrasi secara digital."
  }
];

const heroImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];

const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % heroImages.length);
  }, 5000); 

  return () => clearInterval(interval);
}, []);

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section style={heroSection}>
  {heroImages.map((img, index) => (
    <div
      key={index}
      style={{
        ...heroSlide,
        backgroundImage: `url(${img})`,
        opacity: index === activeIndex ? 1 : 0,
      }}
    />
  ))}

  {/* Overlay gelap */}
  <div style={heroOverlay} />

  {/* Konten */}
  <div style={heroContent}>
    <h1 style={heroTitle}>Website Resmi Desa Sumbersari</h1>
    <p style={heroSubtitle}>
      Portal informasi dan layanan publik Pemerintah Desa Sumbersari untuk
      masyarakat yang transparan, cepat, dan terpercaya.
    </p>
  </div>
</section>


      {/* ================= LAYANAN PUBLIK SECTION ================= */}
      <section
  id="layanan-publik"
  style={{ padding: "60px 20px" }}>
        <h2 style={titleWrapper}>
  {"Layanan Publik".split("").map((char, index) => (
    <span
      key={index}
      className={`title-char ${isLayananVisible ? "show" : ""}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))}
</h2>
<p style={{ color: "#6b7280", marginTop: "4px", marginBottom: "24px" }}>
      Pelayanan terbaik untuk masyarakat Desa Sumbersari
    </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Item layanan */}
<div style={layananCard} className="layanan-card">
  <div style={layananIcon}>📝</div>
  <h4 style={layananTitle}>Pengaduan Masyarakat</h4>
  <p style={layananDesc}>
    Sampaikan keluhan dan aspirasi Anda secara online dengan cepat dan transparan.
  </p>
</div>

<div style={layananCard} className="layanan-card">
  <div style={layananIcon}>📄</div>
  <h4 style={layananTitle}>Layanan Administrasi</h4>
  <p style={layananDesc}>
    Pengurusan surat dan administrasi desa secara mudah dan terintegrasi.
  </p>
</div>

<div style={layananCard} className="layanan-card">
  <div style={layananIcon}>📊</div>
  <h4 style={layananTitle}>Informasi Publik</h4>
  <p style={layananDesc}>
    Akses data dan informasi resmi desa secara terbuka dan terpercaya.
  </p>
</div>

        </div>

        {/* BUTTON LIHAT SELENGKAPNYA */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/layanan" className="btn-layanan">
            Lihat Selengkapnya →
          </Link>
        </div>
      </section>

      {/* ================= BERITA TERKINI SECTION ================= */}
<section
  id="berita-section"
  style={{ padding: "60px 20px", background: "#f9fafb" }}>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

    {/* ===== JUDUL BERITA (ANIMASI) ===== */}
    <h2 style={titleWrapper}>
      {"Berita".split("").map((char, index) => (
        <span
          key={index}
          className={`berita-char ${isBeritaVisible ? "show" : ""}`}
          style={{ transitionDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </h2>

    <p style={{ color: "#6b7280", marginBottom: "30px" }}>
      Update informasi seputar Desa Sumbersari
    </p>


    <div style={newsLayout}>
      {/* ===== BERITA TERBARU (KIRI) ===== */}
      <div
  style={mainNewsCard}
  className={`fade-card ${isBeritaVisible ? "show" : ""}`}>
        <div style={mainNewsImage}>📰</div>
        <small style={newsDate}>15 Januari 2025</small>
        <h3>Peningkatan Pelayanan Publik Desa</h3>
        <p style={{ textAlign: "justify" }}>
          Pemerintah Desa Sumbersari terus berkomitmen meningkatkan kualitas
          pelayanan publik demi kesejahteraan masyarakat.
        </p>
      </div>

      {/* ===== BERITA LAINNYA (KANAN) ===== */}
      <div>
        <div style={sideNewsList}>
          {sideNews.map((item, index) => (
            <div
  style={sideNewsCard}
  className={`fade-card ${isBeritaVisible ? "show" : ""}`}>
              <div style={sideNewsImage}>📰</div>
              <div style={{ textAlign: "justify" }}>
              <small style={newsDate}>{item.date}</small>
              <h4 style={{ margin: "6px 0" }}>{item.title}</h4>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {item.excerpt}
              </p>
            </div>

            </div>
          ))}
        </div>

        {/* 🔗 BUTTON BERITA LAINNYA */}
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Link to="/berita" style={btnOutline}>
            Berita Lainnya →
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= EVENT & INFOGRAFIS SECTION ================= */}
<section style={{ padding: "60px 20px" }}>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    <div style={eventInfoLayout}>

      {/* ===== EVENT PUBLIK ===== */}
      <div>
        <h2>Event Publik</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Kegiatan dan agenda desa terbaru
        </p>

        <div style={eventCard}>
          <div style={eventImage}>📅</div>
          <small style={newsDate}>20 Januari 2025</small>
          <h4>Festival Budaya Desa</h4>
          <p style={{ textAlign: "justify" }}>
            Festival budaya tahunan Desa Sumbersari yang menampilkan
            kesenian lokal dan UMKM masyarakat.
          </p>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/event" style={btnOutline}>
            Lihat Kalender Event →
          </Link>
        </div>
      </div>

      {/* ===== INFOGRAFIS ===== */}
      <div>
        <h2>Infografis</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Data dan statistik Desa Sumbersari
        </p>

        <div style={infografisList}>
          <div style={infografisCard}>
            <div style={infografisImage}>📊</div>
            <h4>Data Penduduk 2025</h4>
          </div>
          
          <div style={infografisCard}>
            <div style={infografisImage}>🏗️</div>
            <h4>Data Infrastruktur Desa</h4>
          </div>

          <div style={infografisCard}>
            <div style={infografisImage}>📈</div>
            <h4>APBDes Desa</h4>
          </div>

          <div style={infografisCard}>
            <div style={infografisImage}>🫂</div>
            <h4>Data Sosial & Kesehatan</h4>
          </div>

          <div style={infografisCard}>
            <div style={infografisImage}>🌾</div>
            <h4>Data Produk Unggulan</h4>
          </div>

          <div style={infografisCard}>
            <div style={infografisImage}>🏥</div>
            <h4>Fasilitas Umum</h4>
          </div>
        </div>

      </div>

    </div>
  </div>
</section>

{/* ================= STATISTIK DESA SECTION ================= */}
<section style={{ padding: "60px 20px", background: "#ffffff" }}>
  <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
    <div style={statWrapper}>
    <h2>Statistik Desa Sumbersari</h2>
    <p style={{ color: "#6b7280", marginBottom: "40px" }}>
      Jelajahi statistik resmi desa Sumbersari untuk memahami perkembangan dan perencanaan pembangunan
    </p>

    <div style={statGrid}>
      <div style={statCard}>
        <div style={statIcon}>👥</div>
        <CountUpNumber target={3250} />
        <p>Jumlah Penduduk</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}>🏠</div>
        <CountUpNumber target={1020} />
        <p>Kepala Keluarga</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}>📝</div>
        <CountUpNumber target={7} />
        <p>Layanan Publik</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}>🏫</div>
        <CountUpNumber target={18} />
        <p>Fasilitas Umum</p>
      </div>
    </div>
  </div>
  </div>
</section>

{/* ================= PENGADUAN MASYARAKAT ================= */}
<section id="pengaduan">
  <div style={{ margin: "0 auto" }}>
    <PengaduanSection /> 

  </div>
</section>

    </div>
  );
}


const heroSection = {
  position: "relative",
  width: "100%",
  height: "90vh",
  overflow: "hidden",
};

const heroSlide = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "opacity 1.5s ease-in-out",
};

const heroOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.45)",
  zIndex: 1,
};

const heroContent = {
  position: "relative",
  zIndex: 2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  padding: "0 20px",
};

const heroTitle = {
  fontSize: "42px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const heroSubtitle = {
  fontSize: "18px",
  maxWidth: "700px",
  lineHeight: "1.6",
};

/* ================= STYLE HELPER ================= */
/* ================= STYLE LAYANAN PUBLIK ================= */
const layananCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "30px 20px",
  textAlign: "center",
  transition: "all 0.35s ease",
  cursor: "default",
};

const layananIcon = {
  fontSize: "42px",
  marginBottom: "14px",
};

const layananTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const layananDesc = {
  fontSize: "14px",
  color: "#6b7280",
  lineHeight: "1.6",
};

const titleWrapper = {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "32px",
  fontWeight: "bold",
};

/* ================= STYLE BERITA ================= */
const newsLayout = {
  display: "grid",
  gridTemplateColumns: "2fr 1.2fr",
  gap: "30px",
};

const mainNewsCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const mainNewsImage = {
  width: "100%",
  height: "260px",
  background: "#0f766e",
  color: "#fff",
  fontSize: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  marginBottom: "15px",
};

const sideNewsList = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const sideNewsCard = {
  display: "flex",
  gap: "18px",
  background: "#fff",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  alignItems: "flex-start", 
};

const sideNewsImage = {
  width: "120px",
  height: "80px",
  background: "#0f766e",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  fontSize: "24px",
  flexShrink: 0, // 🔑 agar ukuran tidak mengecil
};

const newsDate = {
  color: "#6b7280",
  fontSize: "12px",
};

const btnOutline = {
  display: "inline-block",
  padding: "10px 20px",
  border: "2px solid #0f766e",
  color: "#0f766e",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};


/* ================= EVENT & INFOGRAFIS STYLE ================= */

const eventInfoLayout = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
};

const eventCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const eventImage = {
  width: "100%",
  height: "180px",
  background: "#0f766e",
  color: "#fff",
  fontSize: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  marginBottom: "12px",
};

const infografisList = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "15px",
};

const infografisCard = {
  background: "#fff",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  textAlign: "center",
};

const infografisImage = {
  width: "100%",
  height: "90px",
  background: "#0f766e",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",
  fontSize: "30px",
  marginBottom: "8px",
};
/* ================= STYLE STATISTIK ================= */
const statWrapper = {
  background: "#f0fdfa", 
  padding: "50px 30px",
  borderRadius: "12px",
};

const statGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "24px",
};

const statCard = {
  background: "#ffffff",
  padding: "30px 20px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const statIcon = {
  fontSize: "40px",
  marginBottom: "10px",
};

const statNumber = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#0f766e",
  marginBottom: "6px",
};

const formBox = {
  background: "#ffffff",
  padding: "30px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const alertBox = {
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

const btnPrimary = {
  marginTop: "10px",
  padding: "12px",
  background: "#0f766e",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  textDecoration: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

