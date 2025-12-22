export default function Kontak() {
  return (
    <div>
      {/* ================= HERO KONTAK ================= */}
      <section style={heroSection}>
        <h1 style={heroTitle}>Kontak Desa Sumbersari</h1>
        <p style={heroDesc}>
          Hubungi kami untuk informasi, saran, dan pelayanan masyarakat
        </p>
      </section>

      {/* ================= INFORMASI KONTAK ================= */}
      <section style={section}>
        <div style={container}>
          <h2>Informasi Kontak</h2>
          <p style={textMuted}>
            Saluran resmi Pemerintah Desa Sumbersari
          </p>

          <div style={grid3}>
            <div style={infoCard}>
              <div style={icon}>📍</div>
              <h4>Alamat Kantor</h4>
              <p style={infoText}>
                Jl. Raya Desa Sumbersari No. 12<br />
                Kecamatan Sukamaju, Kabupaten Sejahtera
              </p>
            </div>

            <div style={infoCard}>
              <div style={icon}>📞</div>
              <h4>Telepon</h4>
              <p style={infoText}>
                (021) 8899-2233<br />
                Senin – Jumat, 08.00 – 15.00
              </p>
            </div>

            <div style={infoCard}>
              <div style={icon}>✉️</div>
              <h4>Email</h4>
              <p style={infoText}>
                desasumbersari@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FORM KONTAK ================= */}
      <section style={{ ...section, background: "#f9fafb" }}>
        <div style={container}>
          <h2>Form Kontak</h2>
          <p style={textMuted}>
            Kirim pesan atau pertanyaan langsung kepada kami
          </p>

          <div style={formWrapper}>
            <form style={formBox}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                style={input}
              />
              <input
                type="email"
                placeholder="Email"
                style={input}
              />
              <textarea
                rows="5"
                placeholder="Pesan Anda"
                style={textarea}
              />
              <button style={btnPrimary}>Kirim Pesan</button>
            </form>

            <div style={infoSide}>
              <h3 style={{ marginBottom: "10px" }}>Jam Pelayanan</h3>
              <p style={paragraph}>
                Senin – Jumat<br />
                08.00 – 15.00 WIB
              </p>

              <h3 style={{ margin: "20px 0 10px" }}>Catatan</h3>
              <p style={paragraph}>
                Pesan yang masuk akan diproses oleh admin desa dan
                ditindaklanjuti sesuai kebutuhan masyarakat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section style={section}>
        <div style={container}>
          <h2>Lokasi Kantor Desa</h2>
          <p style={textMuted}>
            Temukan lokasi Kantor Desa Sumbersari
          </p>

          <div style={mapBox}>
            <p style={{ color: "#6b7280" }}>
              📍 Peta Google Maps dapat ditampilkan di sini
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= STYLE ================= */
const heroSection = {
  padding: "80px 20px",
  backgroundColor: "#0f766e",
  color: "#ffffff",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "36px",
  marginBottom: "10px",
};

const heroDesc = {
  fontSize: "18px",
  maxWidth: "700px",
  margin: "0 auto",
};

const section = {
  padding: "60px 20px",
};

const container = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const textMuted = {
  color: "#6b7280",
  marginBottom: "30px",
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "24px",
};

const infoCard = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  textAlign: "center",
};

const icon = {
  fontSize: "40px",
  marginBottom: "10px",
};

const infoText = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "1.6",
};

const formWrapper = {
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr",
  gap: "30px",
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

const input = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
};

const textarea = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  resize: "none",
};

const btnPrimary = {
  padding: "12px",
  background: "#0f766e",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

const infoSide = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const paragraph = {
  lineHeight: "1.7",
  color: "#374151",
};

const mapBox = {
  background: "#f0fdfa",
  border: "2px dashed #0f766e",
  borderRadius: "12px",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
