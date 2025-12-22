export default function Profile() {
  return (
    <div>
      {/* ================= HERO PROFILE ================= */}
      <section style={heroSection}>
        <h1 style={heroTitle}>Profil Desa Sumbersari</h1>
        <p style={heroDesc}>
          Informasi umum, visi misi, dan struktur pemerintahan Desa Sumbersari
        </p>
      </section>

      {/* ================= TENTANG DESA ================= */}
      <section style={section}>
        <div style={container}>
          <h2>Tentang Desa</h2>
          <p style={textMuted}>
            Desa Sumbersari merupakan desa yang terus berkembang dengan
            mengedepankan transparansi, pelayanan publik, dan partisipasi
            masyarakat.
          </p>

          <div style={card}>
            <p style={paragraph}>
              Desa Sumbersari terletak di wilayah strategis dengan potensi
              pertanian, UMKM, dan sumber daya manusia yang aktif. Pemerintah
              desa berkomitmen membangun tata kelola yang bersih, efektif, dan
              berbasis teknologi informasi.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VISI & MISI ================= */}
      <section style={{ ...section, background: "#f9fafb" }}>
        <div style={container}>
          <h2>Visi & Misi</h2>

          <div style={grid2}>
            <div style={card}>
              <h3 style={cardTitle}>Visi</h3>
              <p style={paragraph}>
                Terwujudnya Desa Sumbersari yang mandiri, sejahtera, transparan,
                dan berdaya saing.
              </p>
            </div>

            <div style={card}>
              <h3 style={cardTitle}>Misi</h3>
              <ul style={list}>
                <li>Meningkatkan kualitas pelayanan publik</li>
                <li>Mengembangkan potensi ekonomi desa</li>
                <li>Mendorong partisipasi aktif masyarakat</li>
                <li>Mewujudkan pemerintahan desa yang transparan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STRUKTUR PEMERINTAHAN ================= */}
      <section style={section}>
        <div style={container}>
          <h2>Struktur Pemerintahan Desa</h2>
          <p style={textMuted}>
            Susunan aparatur pemerintahan Desa Sumbersari
          </p>

          <div style={grid3}>
            {perangkatDesa.map((item, index) => (
              <div key={index} style={profileCard}>
                <div style={avatar}>👤</div>
                <h4>{item.nama}</h4>
                <p style={jabatan}>{item.jabatan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= DATA ================= */
const perangkatDesa = [
  { nama: "Ahmad Santoso", jabatan: "Kepala Desa" },
  { nama: "Siti Aminah", jabatan: "Sekretaris Desa" },
  { nama: "Budi Pratama", jabatan: "Kaur Pemerintahan" },
  { nama: "Rina Lestari", jabatan: "Kaur Keuangan" },
  { nama: "Dedi Kurniawan", jabatan: "Kasi Pelayanan" },
  { nama: "Nur Hidayah", jabatan: "Kasi Kesejahteraan" },
];

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

const card = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const paragraph = {
  textAlign: "justify",
  lineHeight: "1.7",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "24px",
  marginTop: "30px",
};

const cardTitle = {
  marginBottom: "10px",
  color: "#0f766e",
};

const list = {
  paddingLeft: "20px",
  lineHeight: "1.8",
};

const profileCard = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  textAlign: "center",
};

const avatar = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "#0f766e",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "36px",
  margin: "0 auto 15px",
};

const jabatan = {
  color: "#6b7280",
  fontSize: "14px",
};
