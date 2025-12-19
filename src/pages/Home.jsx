import { Link } from "react-router-dom";

export default function Home() {
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
