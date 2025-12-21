import { useState } from "react";


export default function Footer() {

    
const [showSurveyPopup, setShowSurveyPopup] = useState(false);
const [surveyValue, setSurveyValue] = useState("");
  return (
    <footer style={footerWrapper}>
      <div style={footerTop}>
        {/* ================= KOLOM KIRI ================= */}
        <div>
          <h3 style={footerTitle}>PEMERINTAH DESA SUMBERSARI</h3>

          <p style={footerItem}>
            📍 Jalan Raya Desa Sumbersari, Kecamatan XXX,<br />
                Kabupaten XXX, Provinsi XXX<br />
                Kode Pos XXXXX
          </p>

          <p style={footerItem}>📞 (0274) 8xxxxxx</p>
          <p style={footerItem}>✉️ desasumbersari@email.com</p>

          <p style={footerItem}>
            🌐 <a href="#" style={footerLink}>www.desasumbersari.go.id</a>
          </p>

          <div style={{ marginTop: "15px" }}>
            <br />
  <strong>FOLLOW US :</strong>

  <div style={socialRow}>
    {/* INSTAGRAM */}
<a
  href="https://www.instagram.com/desasumbersari"
  target="_blank"
  rel="noopener noreferrer"
  style={socialIconBase}
  title="Instagram Desa"
  onMouseEnter={(e) => {
    e.currentTarget.style.background = instagramGradient;
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.transform = "scale(1.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#374151";
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z"/>
  </svg>
</a>


    {/* FACEBOOK */}
    <a
      href="https://www.facebook.com/desasumbersari"
      target="_blank"
      rel="noopener noreferrer"
      style={socialIconBase}
      title="Facebook Desa"
      onMouseEnter={(e) => hoverIn(e, "#1877F2")}
      onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#374151";
    e.currentTarget.style.transform = "scale(1)";
  }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 10-11.5 9.95v-7.04h-2.5V12h2.5V9.8c0-2.47 1.47-3.84 3.73-3.84 1.08 0 2.21.2 2.21.2v2.43h-1.25c-1.23 0-1.62.77-1.62 1.56V12h2.77l-.44 2.91h-2.33v7.04A10 10 0 0022 12z"/>
      </svg>
    </a>

    {/* YOUTUBE */}
    <a
        href="https://www.youtube.com/@desasumbersari"
        target="_blank"
        rel="noopener noreferrer"
        style={socialIconBase}
        title="YouTube Desa"
        onMouseEnter={(e) => hoverIn(e, "#FF0000")}
        onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#374151";
    e.currentTarget.style.transform = "scale(1)";
  }}
        >
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M23.498 6.186a2.999 2.999 0 00-2.113-2.118C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.385.568A2.999 2.999 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.999 2.999 0 002.113 2.118C4.495 20.5 12 20.5 12 20.5s7.505 0 9.385-.568a2.999 2.999 0 002.113-2.118C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
        </svg>
        </a>
  </div>
</div>

        </div>

        {/* ================= KOLOM TENGAH ================= */}
        <div>
          <h4 style={footerSubtitle}>Statistik Pengunjung</h4>

          <p style={footerItem}>Online Visitors : 1</p>
          <p style={footerItem}>Today's Views : 3</p>
          <p style={footerItem}>Last 7 Days Views : 31</p>
          <p style={footerItem}>Total Views : 7,312</p>
          <p style={footerItem}>Total Page Views : 28,746</p>
        </div>

        {/* ================= KOLOM KANAN ================= */}
        <div>
          <h4 style={footerSubtitle}>
            Bagaimana Penilaian Anda Terhadap <br />
            Kinerja Pelayanan Publik Desa?
          </h4>

          <div style={surveyGroup}>
            <label>
  <input
    type="radio"
    name="survey"
    value="Sangat Baik"
    onChange={(e) => setSurveyValue(e.target.value)}
  /> Sangat Baik
</label>

<label>
  <input
    type="radio"
    name="survey"
    value="Baik"
    onChange={(e) => setSurveyValue(e.target.value)}
  /> Baik
</label>

<label>
  <input
    type="radio"
    name="survey"
    value="Cukup"
    onChange={(e) => setSurveyValue(e.target.value)}
  /> Cukup
</label>

<label>
  <input
    type="radio"
    name="survey"
    value="Kurang"
    onChange={(e) => setSurveyValue(e.target.value)}
  /> Kurang
</label>

          </div>

          <button
  style={surveyBtn}
  onClick={() => {
    if (!surveyValue) {
      alert("Silakan pilih penilaian terlebih dahulu.");
      return;
    }
    setShowSurveyPopup(true);
  }}
>
  Pilih
</button>

        </div>
      </div>


      {/* ================= COPYRIGHT ================= */}
      <div style={footerBottom}>
        © {new Date().getFullYear()}. PEMERINTAH DESA SUMBERSARI. ALL RIGHTS RESERVED
      </div>

      {showSurveyPopup && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  }}>
    <div style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "8px",
      maxWidth: "400px",
      width: "90%",
      color: "#000"
    }}>
      <div style={emojiWrapper}>🙏</div>

      <p style={{ lineHeight: "1.6" }}>
        Terima kasih atas partisipasi Anda dalam memberikan penilaian terhadap
        pelayanan publik Desa Sumbersari.
        <br /><br />
        Penilaian <strong>{surveyValue}</strong> yang Anda berikan sangat
        berarti bagi kami untuk meningkatkan kualitas pelayanan.
      </p>

      <button
        style={{ ...surveyBtn, marginTop: "15px" }}
        onClick={() => setShowSurveyPopup(false)}
      >
        Tutup
      </button>
    </div>
  </div>
)}
    <style>
{`
@keyframes emojiPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
`}
</style>

    </footer>
  );
}

/* ================= STYLE ================= */

const footerWrapper = {
  backgroundColor: "#0f766e",
  color: "#ffffff",
  marginTop: "80px",
};

const footerTop = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "40px",
  textAlign: "left",
};

const footerTitle = {
  marginBottom: "15px",
  fontSize: "18px",
};

const footerSubtitle = {
  marginBottom: "15px",
  fontSize: "16px",
};

const footerItem = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#e5e7eb",
};

const footerLink = {
  color: "#ffffff",
  textDecoration: "underline",
};

const socialRow = {
  display: "flex",
  gap: "14px",
  marginTop: "10px",
};

const instagramGradient = "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)";

const socialIconBase = {
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  cursor: "pointer",
  color: "#fcf8f8ff",
};


const hoverIn = (e, color) => {
  e.currentTarget.style.backgroundColor = color;
  e.currentTarget.style.transform = "scale(1.15)";
};

const hoverOut = (e) => {
  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
  e.currentTarget.style.transform = "scale(1)";
};

const surveyGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  fontSize: "14px",
  marginBottom: "15px",
};

const surveyBtn = {
  padding: "10px 20px",
  backgroundColor: "#c19916ff",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

const emojiWrapper = {
  fontSize: "48px",
  textAlign: "center",
  marginBottom: "10px",
  animation: "emojiPulse 1.5s infinite ease-in-out",
};

const footerBottom = {
  backgroundColor: "#1b4d48ff",
  textAlign: "center",
  padding: "15px",
  fontSize: "13px",
};
