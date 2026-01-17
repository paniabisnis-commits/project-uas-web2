import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PengaduanSection from "../components/PengaduanSection";
import CountUpNumber from "../components/CountUpNumber";

export default function Home() {
  
  const [showHeroText, setShowHeroText] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const heroSubtitleText = "Portal informasi dan layanan publik Pemerintah Desa Sumbersari untuk masyarakat yang transparan, cepat, dan terpercaya.";
  const [layanan, setLayanan] = useState([]);
  const [isLayananVisible, setIsLayananVisible] = useState(false);
  const [berita, setBerita] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
  const timeout = setTimeout(() => setShowHeroText(true), 300); // delay muncul
  return () => clearTimeout(timeout);
}, []);

  useEffect(() => {
  const interval = setInterval(() => {
    setHeroTextIndex((prev) => {
      if (prev < heroSubtitleText.length) return prev + 1;
      clearInterval(interval);
      return prev;
    });
  }, 30); // 30ms per huruf → stabil
  return () => clearInterval(interval);
}, []);

const layananTitleRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsLayananVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (layananTitleRef.current) {
    observer.observe(layananTitleRef.current);
  }

  return () => observer.disconnect();
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

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/layanan", {
    headers: { Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      setLayanan(res.data || []);
    })
    .catch((err) => {
      console.error("Gagal fetch layanan:", err);
    });
}, []);



const [showTitle, setShowTitle] = useState(false);
const titleRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowTitle(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (titleRef.current) observer.observe(titleRef.current);

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
      { label: "Pendapatan Desa", value: "Rp 1,8 M" },
      { label: "Belanja Desa", value: "Rp 1,2 M" },
      { label: "Dana Desa", value: "Rp 1,4 M" },
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

const slugMap = {
  "Permohonan Surat Pengantar Online": "permohonan-surat",
  "Pendaftaran / Perubahan Data Keluarga": "data-keluarga",
  "Pendaftaran Bantuan Sosial (Bansos)": "bansos",
};

const getSlug = (nama) => {
  return nama
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const scrollToPengaduan = () => {
  const target = document.getElementById("pengaduan");
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};


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
  <h1
    style={{
      ...heroTitle,
      opacity: showHeroText ? 1 : 0,
      transform: showHeroText ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s ease-out",
    }}
  >
    Website Resmi Desa Sumbersari
  </h1>
  <p
  style={{
    ...heroSubtitle,
    whiteSpace: "pre-wrap", // supaya enter/spasi tetap
  }}
>
  {heroSubtitleText.slice(0, heroTextIndex).split("").map((char, i) => (
    <span
      key={i}
      style={{
        opacity: 1,
        transition: "opacity 0.2s",
      }}
    >
      {char}
    </span>
  ))}
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
  <h2 ref={layananTitleRef} style={titleWrapper}>
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
  <div style={grid}>
  {layanan.slice(0, 3).map((l) => (
    

    <div key={l.id} style={layananCard}>
      {/* Ganti icon menjadi gambar */}
      <img
        src={l.gambar ? `http://127.0.0.1:8000/storage/${l.gambar}` : "/images/default-icon.png"}
        alt={l.nama_layanan}
        style={{ width: "60px", height: "60px", objectFit: "contain", margin: "0 auto 16px" }}
      />
      <h4 style={layananTitle}>{l.nama_layanan}</h4>
      <p style={layananDesc}>{l.deskripsi}</p>
      <Link
  to={`/layanan/${slugMap[l.nama_layanan] || getSlug(l.nama_layanan)}`}
  style={{
    marginTop: "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: "6px",
    border: "1px solid #195651",
    color: "#0d615a",
    textDecoration: "none",
    background: "transparent",
    transition: "all 0.25s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#ecfdf5";
    e.currentTarget.style.transform = "translateY(-1px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  <span>Detail</span>
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
</Link>


    </div>
  ))}
</div>
<div style={{ textAlign: "center", marginTop: "40px" }}>
  <Link
    to="/layanan"
    style={{
      display: "inline-block",
      padding: "10px 22px",
      borderRadius: "8px",
      border: "1px solid #0f766e",
      color: "#0f766e",
      textDecoration: "none",
      fontWeight: 500,
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#0f766e";
      e.currentTarget.style.color = "#ffffff";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "#0f766e";
    }}
  >
    Lihat Semua Layanan
  </Link>
</div>

</section>


<section
  id="berita-section"
  style={{ padding: "60px 20px", background: "#f1f5f9" }}
>
  <div style={{ width: "100%", maxWidth: "1440px", margin: "0 auto" }}>
    <h2
  ref={titleRef}
  style={{
    ...titleWrapper,
    opacity: showTitle ? 1 : 0,
    transform: showTitle ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.6s ease-out",
  }}
>
  Berita
</h2>


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
          <div style={eventImage}>
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
</div>

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
            <div style={infografisImage}>
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="10" width="4" height="10" />
    <rect x="10" y="6" width="4" height="14" />
    <rect x="17" y="3" width="4" height="17" />
  </svg>
</div>

            <h4>Data Penduduk 2025</h4>
          </div>

          
          <div style={infografisCard} onClick={() => setActiveInfografis("infrastruktur")}>
            <div style={infografisImage}>
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="18" />
    <rect x="14" y="8" width="7" height="13" />
    <line x1="6" y1="7" x2="7" y2="7" />
    <line x1="6" y1="11" x2="7" y2="11" />
    <line x1="6" y1="15" x2="7" y2="15" />
  </svg>
</div>

            <h4>Data Infrastruktur Desa</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("apbdes")}>
            <div style={infografisImage}>
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="14 7 21 7 21 14" />
  </svg>
</div>

            <h4>APBDes Desa</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("sosial")}>
            <div style={infografisImage}>
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="7" r="4" />
    <circle cx="17" cy="7" r="4" />
    <path d="M2 21v-2a4 4 0 0 1 4-4h6" />
    <path d="M14 15h2a4 4 0 0 1 4 4v2" />
  </svg>
</div>

            <h4>Data Sosial & Kesehatan</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("produk")}>
            <div style={infografisImage}>
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.3 7 12 12 20.7 7" />
    <line x1="12" y1="12" x2="12" y2="21" />
  </svg>
</div>


            <h4>Data Produk Unggulan</h4>
          </div>

          <div style={infografisCard} onClick={() => setActiveInfografis("fasilitas")}>
            <div style={infografisImage}>
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="7" y1="7" x2="7" y2="7" />
    <line x1="12" y1="7" x2="12" y2="7" />
    <line x1="17" y1="7" x2="17" y2="7" />
    <line x1="7" y1="12" x2="7" y2="12" />
    <line x1="12" y1="12" x2="12" y2="12" />
    <line x1="17" y1="12" x2="17" y2="12" />
  </svg>
</div>


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
        <div style={statIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                fill="#0f766e"
              />
            </svg>
          </div>
        <CountUpNumber target={3240} />
        <p>Jumlah Penduduk</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}><svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rambut (hairline laki-laki) */}
    <path
      d="M6 6.5C6 4 8.7 2 12 2s6 2 6 4.5V7H6V6.5z"
      fill="#0f766e"
    />

    {/* Kepala */}
    <circle cx="12" cy="9" r="4" fill="#0f766e" />

    {/* Leher */}
    <rect x="10" y="13" width="4" height="2" fill="#0f766e" />

    {/* Badan (bahu lebar + dada V shape) */}
    <path
      d="M3 22c0-4.4 3.8-8 9-8s9 3.6 9 8"
      fill="#0f766e"
    />
  </svg>
          </div>
        <CountUpNumber target={980} />
        <p>Kepala Keluarga</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}><svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 2h8l6 6v14a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z"
      fill="#0f766e"
    />
    <path
      d="M14 2v6h6"
      fill="#0f766e"
    />
    <rect x="8" y="12" width="8" height="2" fill="#ffffff" />
    <rect x="8" y="16" width="8" height="2" fill="#ffffff" />
  </svg>
          </div>
        <CountUpNumber target={7} />
        <p>Layanan Publik</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}><svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 21h18V8l-9-5-9 5v13z"
      fill="#0f766e"
    />
    <rect x="7" y="11" width="3" height="3" fill="#ffffff" />
    <rect x="14" y="11" width="3" height="3" fill="#ffffff" />
    <rect x="10" y="16" width="4" height="5" fill="#ffffff" />
  </svg>
          </div>
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

function LayananCard({ icon, title, desc, onClick, delay }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...layananCard,
        transitionDelay: delay,
        cursor: onClick ? "pointer" : "default",
      }}
      className="layanan-card show"
    >
      <div style={layananIcon}>{icon}</div>
      <h4 style={layananTitle}>{title}</h4>
      <p style={layananDesc}>{desc}</p>
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

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(280px, 1fr))",
  gap: "30px",
  marginTop: "40px",
  justifyContent: "center",
  maxWidth: "1000px",
  marginLeft: "auto",
  marginRight: "auto",
};


const layananCard = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "28px 26px",
  textAlign: "center",
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  lineHeight: "1.6",
  transition: "all 0.35s ease",
};


const layananTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "8px",
  wordBreak: "break-word",
};

const layananDesc = {
  fontSize: "14px",
  color: "#6b7280",
  wordWrap: "break-word",
  overflowWrap: "break-word",
};



const layananIcon = {
  fontSize: "42px",
  marginBottom: "16px",
  margin: "0 auto 16px",
  objectFit: "contain",
};

const titleWrapper = {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "32px",
  fontWeight: "bold",
};

const getSlug = (nama) => {
  return nama
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // ganti semua selain a-z/0-9 jadi "-"
    .replace(/^-+|-+$/g, ""); // hapus dash di awal/akhir
};


/* ================= STYLE BERITA ================= */

const newsLayout = {
  display: "grid",
  gridTemplateColumns: "2fr 1.3fr",
  gap: "30px",
  alignItems: "start",
  padding: "20px",
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
