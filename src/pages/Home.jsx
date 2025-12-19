import { Link } from "react-router-dom";

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
