import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PengaduanSection from "../components/PengaduanSection";
import CountUpNumber from "../components/CountUpNumber";

export default function Home() {
  const [berita, setBerita] = useState([]);
  

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/berita", {
    headers: { Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      setBerita(res.data || []);
    })
    .catch((err) => {
      console.error("Gagal fetch berita:", err);
    });
}, []);


  const beritaUtama = berita[0];
  const beritaLainnya = berita.slice(1, 4);
  
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
        observer.disconnect(); 
      }
    },
    {
      threshold: 0.2, 
      rootMargin: "0px 0px -100px 0px", 
    }
  );

  observer.observe(section);
  return () => observer.disconnect();
}, []);



const [isEventVisible, setIsEventVisible] = useState(false);

useEffect(() => {
  const section = document.getElementById("event-infografis");
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsEventVisible(true);
        observer.disconnect(); 
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
  return () => observer.disconnect();
}, []);

const [events, setEvents] = useState([]);
const [loadingEvent, setLoadingEvent] = useState(true);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/events", {
    headers: { Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      setEvents(res.data || []);
      setLoadingEvent(false);
    })
    .catch((err) => {
      console.error("Gagal fetch event:", err);
      setLoadingEvent(false);
    });
}, []);

const [activeInfografis, setActiveInfografis] = useState(null);

const infografisData = {
  penduduk: {
    title: "Data Penduduk 2025",
    content: [
      { label: "Total Penduduk", value: 3240 },
      { label: "Laki-laki", value: 1620 },
      { label: "Perempuan", value: 1620 },
      { label: "Kepala Keluarga", value: 980 },
    ],
  },
  infrastruktur: {
    title: "Data Infrastruktur Desa",
    content: [
      { label: "Jalan Desa", value: "12 Km" },
      { label: "Jembatan", value: 5 },
      { label: "Gedung Publik", value: 8 },
      { label: "Saluran Irigasi", value: "6 Km" },
    ],
  },
  apbdes: {
    title: "APBDes Desa",
    content: [
      { label: "Pendapatan Desa", value: "Rp 2,1 M" },
      { label: "Belanja Desa", value: "Rp 1,9 M" },
      { label: "Dana Desa", value: "Rp 1,2 M" },
      { label: "Sisa Anggaran", value: "Rp 200 Jt" },
    ],
  },
  sosial: {
    title: "Data Sosial & Kesehatan",
    content: [
      { label: "Balita", value: 320 },
      { label: "Lansia", value: 410 },
      { label: "Posyandu", value: 6 },
      { label: "Kasus Stunting", value: 12 },
    ],
  },
  produk: {
    title: "Produk Unggulan Desa",
    content: [
      { label: "Pertanian", value: "Padi, Jagung" },
      { label: "UMKM Aktif", value: 86 },
      { label: "Produk Olahan", value: 14 },
    ],
  },
  fasilitas: {
    title: "Fasilitas Umum",
    content: [
      { label: "Sekolah", value: 4 },
      { label: "Puskesmas", value: 3 },
      { label: "Masjid", value: 8 },
      { label: "Lapangan", value: 3 },
    ],
  },
};

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
  style={{
    paddingTop: "calc(var(--navbar-height) + 40px)",
    paddingBottom: "40px",
    padding: "80px 40px 40px",
  }}
>

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
    gap: "28px", 
    maxWidth: "1400px",
    margin: "40px auto 0", 
  }}
>
          <div
  style={{
    ...layananCard,
    transitionDelay: "0s",
  }}
  className={`layanan-card ${isLayananVisible ? "show" : ""}`}
>
  <div style={layananIcon}>📝</div>
  <h4 style={layananTitle}>Pengaduan Masyarakat</h4>
  <p style={layananDesc}>
    Sampaikan keluhan dan aspirasi Anda secara online dengan cepat dan transparan.
  </p>
</div>

<div
  style={{
    ...layananCard,
    transitionDelay: "0.2s",
  }}
  className={`layanan-card ${isLayananVisible ? "show" : ""}`}
>
  <div style={layananIcon}>📄</div>
  <h4 style={layananTitle}>Layanan Administrasi</h4>
  <p style={layananDesc}>
    Pengurusan surat dan administrasi desa secara mudah dan terintegrasi.
  </p>
</div>

<div
  style={{
    ...layananCard,
    transitionDelay: "0.4s",
  }}
  className={`layanan-card ${isLayananVisible ? "show" : ""}`}
>
  <div style={layananIcon}>📊</div>
  <h4 style={layananTitle}>Informasi Publik</h4>
  <p style={layananDesc}>
    Akses data dan informasi resmi desa secara terbuka dan terpercaya.
  </p>
</div>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/layanan" className="btn-layanan">
            Lihat Selengkapnya →
          </Link>
        </div>
      </section>
    

<section
  id="berita-section"
  style={{ padding: "60px 20px", background: "#f1f5f9" }}
>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    <h2 style={titleWrapper}>Berita</h2>

    <p style={{ color: "#6b7280", marginBottom: "30px" }}>
      Update informasi seputar Desa Sumbersari
    </p>
      <div style={newsLayout}>
        {beritaUtama && (
          <div style={mainNewsCard}>
            <img
  src={`http://127.0.0.1:8000/storage/${beritaUtama.image}`}
  alt={beritaUtama.title}
  style={mainNewsImage}
/>

            <small>
              {new Date(beritaUtama.created_at).toLocaleDateString("id-ID")}
            </small>
            <h3>{beritaUtama.title}</h3>
            <br />
            <p style={mainNewsContent}>{beritaUtama.content}</p>
          </div>
        )}

        <div style={sideNewsList}>
          {beritaLainnya.map((item) => (
            <div key={item.id} style={sideNewsCard}>
              <img
                src={`http://127.0.0.1:8000/storage/${item.image}`}
                alt={item.title}
                style={sideNewsImage}
              />
              <div>
                <small>
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </small>
                <h4 style={sideNewsTitle}>{item.title}</h4>
                <p style={sideNewsExcerpt}>{item.content}</p>
              </div>
            </div>
          ))}

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Link to="/berita" className="btn-outline">
              Berita Lainnya →
            </Link>
          </div>
        </div>
      </div>
  
  </div>
</section>


{/* ================= EVENT & INFOGRAFIS SECTION ================= */}
<section
  id="event-infografis"
  style={{ padding: "70px 20px", background: "#ffffff" }}>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    <div style={eventInfoLayout}>

      {/* ===== EVENT PUBLIK ===== */}
      <div id="event-infografis">
  <h2 className={`slide-title ${isEventVisible ? "show" : ""}`}>
    Event Publik
  </h2>

  <p style={{ color: "#6b7280", marginBottom: "20px" }}>
    Kegiatan dan agenda desa terbaru
  </p>

  {loadingEvent ? (
    <p style={{ color: "#9ca3af" }}>Memuat event...</p>
  ) : events.length === 0 ? (
    <p style={{ color: "#9ca3af" }}>Belum ada event.</p>
  ) : (
    events.slice(0, 1).map((event) => (
      <div key={event.id} style={eventCard}>
        {event.image ? (
          <img
            src={`http://127.0.0.1:8000/storage/${event.image}`}
            alt={event.title}
            style={eventImage}
          />
        ) : (
          <div style={eventImage}>📅</div>
        )}

        <small style={newsDate}>
          {event.event_date
            ? new Date(event.event_date).toLocaleDateString("id-ID")
            : "-"}
        </small>

        <h4 style={{ margin: "8px 0" }}>{event.title}</h4>

        <p style={{ textAlign: "justify" }}>
          {event.description}
        </p>
      </div>
    ))
  )}

  <div style={{ marginTop: "20px", textAlign: "center" }}>
    <Link to="/kalender-event" className="btn-outline">
      Lihat Kalender Event →
    </Link>
  </div>
</div>


      {/* ===== INFOGRAFIS ===== */}
      <div>
        <h2 className={`slide-title ${isEventVisible ? "show" : ""}`}>
  Infografis</h2>

        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Data dan statistik Desa Sumbersari
        </p>

        <div style={infografisList}>
          <div
            style={infografisCard}
            onClick={() => setActiveInfografis("penduduk")}>
            <div style={infografisImage}>📊</div>
            <h4>Data Penduduk 2025</h4>
          </div>

          
          <div style={infografisCard} onClick={() => setActiveInfografis("infrastruktur")}>
            <div style={infografisImage}>🏗️</div>
            <h4>Data Infrastruktur Desa</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("apbdes")}>
            <div style={infografisImage}>📈</div>
            <h4>APBDes Desa</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("sosial")}>
            <div style={infografisImage}>🫂</div>
            <h4>Data Sosial & Kesehatan</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("produk")}>
            <div style={infografisImage}>🌾</div>
            <h4>Data Produk Unggulan</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("fasilitas")}>
            <div style={infografisImage}>🏥</div>
            <h4>Fasilitas Umum</h4>
          </div>
        </div>

      </div>

    </div>
  </div>
</section>
{activeInfografis && (
  <div style={modalOverlay}>
    <div style={modalContent}>
      <button
        onClick={() => setActiveInfografis(null)}
        style={closeButton}
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <h3>{infografisData[activeInfografis].title}</h3>

      <ul style={modalList}>
        {infografisData[activeInfografis].content.map((item, i) => (
          <li key={i} style={modalItem}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


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
        <CountUpNumber target={3240} />
        <p>Jumlah Penduduk</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}>🏠</div>
        <CountUpNumber target={980} />
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

const layananCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "32px 24px",
  textAlign: "center",
  transition: "all 0.35s ease",
  cursor: "default",
  marginBottom: "10px",
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
  gridTemplateColumns: "2fr 1.3fr",
  gap: "30px",
  alignItems: "start",
};

const mainNewsCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  willChange: "transform",
};

const mainNewsImage = {
  width: "100%",
  height: "260px",
  minHeight: "260px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "12px",
  backgroundColor: "transparent",
};

const mainNewsContent = {
  flexGrow: 1,
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textAlign: "justify",
  lineHeight: "1.6",
};

const sideNewsList = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const sideNewsCard = {
  display: "flex",
  gap: "14px",
  background: "#fff",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  alignItems: "center",
};

const sideNewsImage = {
  width: "120px",
  height: "80px",
  minHeight: "80px",
  objectFit: "cover",
  borderRadius: "6px",
  flexShrink: 0,
};

const sideNewsTitle = {
  margin: "4px 0 6px",
  fontSize: "15px",
  fontWeight: "600",
  textAlign: "justify",  
  lineHeight: "1.4",
};

const newsDate = {
  color: "#4f5d78ff",
  fontSize: "12px",
};

const sideNewsExcerpt = {
  fontSize: "14px",
  color: "#555",
  textAlign: "justify",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};


const eventInfoLayout = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  alignItems: "start", 
};

const eventCard = {
  background: "#fff",
  padding: "25px 22px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  lineHeight: "1.6", 
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
  gap: "16px",
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

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalContent = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "420px",
  position: "relative",
};

const closeButton = {
  position: "absolute",
  top: "12px",
  right: "12px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const modalList = {
  marginTop: "20px",
  listStyle: "none",
  padding: 0,
};

const modalItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #e5e7eb",
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
