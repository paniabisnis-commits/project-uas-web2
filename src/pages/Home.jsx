import { Link } from "react-router-dom";
import PengaduanSection from "../components/PengaduanSection";

export default function Home() {
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


  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          backgroundColor: "#0f766e",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "15px" }}>
          Website Resmi Desa Sumbersari
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto" }}>
          Portal informasi dan layanan publik Pemerintah Desa Sumbersari untuk
          masyarakat yang transparan, cepat, dan terpercaya.
        </p>
      </section>

      {/* ================= LAYANAN PUBLIK SECTION ================= */}
      <section style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Layanan Publik
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {/* Item layanan */}
          <div style={cardStyle}>
            <div style={iconStyle}>📝</div>
            <h4>Pengaduan Masyarakat</h4>
            <p>Sampaikan keluhan dan aspirasi Anda secara online.</p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>📄</div>
            <h4>Layanan Administrasi</h4>
            <p>Pengurusan surat dan administrasi desa.</p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>📊</div>
            <h4>Informasi Publik</h4>
            <p>Akses data dan informasi resmi desa.</p>
          </div>
        </div>

        {/* BUTTON LIHAT SELENGKAPNYA */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/layanan" style={btnStyle}>
            Lihat Selengkapnya →
          </Link>
        </div>
      </section>

      {/* ================= BERITA TERKINI SECTION ================= */}
<section style={{ padding: "60px 20px", background: "#f9fafb" }}>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    <h2>Berita</h2>
    <p style={{ color: "#6b7280", marginBottom: "30px" }}>
      Update informasi seputar Desa Sumbersari
    </p>

    <div style={newsLayout}>
      {/* ===== BERITA TERBARU (KIRI) ===== */}
      <div style={mainNewsCard}>
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
            <div key={index} style={sideNewsCard}>
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
  <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
    <div style={statWrapper}>
    <h2>Statistik Desa Sumbersari</h2>
    <p style={{ color: "#6b7280", marginBottom: "40px" }}>
      Jelajahi statistik resmi desa Sumbersari untuk memahami perkembangan dan perencanaan pembangunan
    </p>

    <div style={statGrid}>
      <div style={statCard}>
        <div style={statIcon}>👥</div>
        <h3 style={statNumber}>3.250</h3>
        <p>Jumlah Penduduk</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}>🏠</div>
        <h3 style={statNumber}>1.020</h3>
        <p>Kepala Keluarga</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}>📝</div>
        <h3 style={statNumber}>12</h3>
        <p>Layanan Publik</p>
      </div>

      <div style={statCard}>
        <div style={statIcon}>🏫</div>
        <h3 style={statNumber}>18</h3>
        <p>Fasilitas Umum</p>
      </div>
    </div>
  </div>
  </div>
</section>

{/* ================= PENGADUAN MASYARAKAT ================= */}
<section>
  <div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <PengaduanSection /> 

  </div>
</section>

    </div>
  );
}


/* ================= STYLE HELPER ================= */
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  backgroundColor: "#fff",
};

const iconStyle = {
  fontSize: "40px",
  marginBottom: "10px",
};

const btnStyle = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "#0f766e",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
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

