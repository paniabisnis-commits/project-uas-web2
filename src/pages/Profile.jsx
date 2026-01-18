import { useState, useEffect } from "react";
import "./Profile.css";
import logoDesa from "/images/logo-desa.png"; 

export default function ProfileDesa() {
  const [showHeroText, setShowHeroText] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
    const sliderImages = [
    "/images/desa1.jpg",
    "/images/desa2.jpg",
    "/images/desa3.jpg",
  ];
  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      }, 4000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
    const timeout = setTimeout(() => setShowHeroText(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="profile-container">
      {/* ================= HERO ================= */}
      
      <header
  className="profile-hero"
  style={{
    backgroundImage: `url(${sliderImages[currentSlide]})`,
  }}
>
  <div className="profile-hero-overlay">
    <h1
      style={{
        opacity: showHeroText ? 1 : 0,
        transform: showHeroText ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease-out",
      }}
    >
      Profil Desa
    </h1>
    <p
      style={{
        opacity: showHeroText ? 1 : 0,
        transform: showHeroText ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s ease-out",
        transitionDelay: "0.2s",
      }}
    >
      Selamat datang di Desa Sumbersari, tempat di mana kearifan lokal bertemu dengan semangat kemajuan.
    </p>
  </div>
</header>

      {/* ================= SEJARAH ================= */}
      <section className="profile-section">
        <h2>Sejarah Desa</h2>
        <p className="profile-text">
          Desa Sumbersari merupakan desa yang tumbuh dan berkembang dari
          masyarakat agraris yang menjunjung tinggi nilai gotong royong,
          kearifan lokal, serta kebersamaan. Nama <strong>Sumbersari</strong>{" "}
          bermakna sumber kehidupan yang subur dan makmur, mencerminkan kondisi
          alam desa yang kaya akan sumber daya pertanian dan air.
        </p>
      </section>

      {/* ================= FILOSOFI LOGO ================= */}
      <section className="profile-section alt">
        <h2>Filosofi Logo Desa</h2>

        <div className="logo-philosophy">
          <img src={logoDesa} alt="Filosofi Logo Desa" />

          <ul>
            <li><strong>Gunung</strong> melambangkan keteguhan dan kekuatan desa.</li>
            <li><strong>Sungai</strong> melambangkan sumber kehidupan dan kesejahteraan.</li>
            <li><strong>Sawah & alam hijau</strong> mencerminkan kemakmuran dan kesuburan.</li>
            <li><strong>Matahari</strong> sebagai simbol harapan dan masa depan cerah.</li>
            <li><strong>Padi</strong> melambangkan kesejahteraan dan ketahanan pangan.</li>
            <li><strong>Rumah desa</strong> simbol kebersamaan dan kehidupan masyarakat.</li>
          </ul>
        </div>
      </section>

      {/* ================= VISI MISI ================= */}
      <section className="profile-section">
        <h2>Visi & Misi</h2>

        <div className="visi-misi">
          <div className="card">
            <h3>Visi</h3>
            <p>
              Terwujudnya Desa Sumbersari sebagai desa yang maju melalui transformasi tata kelola dan optimalisasi potensi lokal yang inovatif. Kemajuan ini dicapai dengan penguatan infrastruktur desa yang merata serta pemanfaatan teknologi informasi untuk mendukung konektivitas dan kecerdasan desa, sehingga Desa Sumbersari mampu sejajar dengan perkembangan zaman tanpa meninggalkan akar budaya lokal.
            </p>
          </div>

          <div className="card">
            <h3>Misi</h3>
            <ul>
              <li>Meningkatkan kualitas pelayanan kepada masyarakat</li>
              <li>Memperkuat pembangunan berbasis potensi lokal</li>
              <li>Mewujudkan tata kelola pemerintahan yang transparan</li>
              <li>Mendorong partisipasi aktif masyarakat desa</li>
            </ul>
          </div>
        </div>
      </section>

     <section className="profile-section alt">
  <h2>Struktur Pemerintahan Desa</h2>

  <div className="struktur-wrapper">
    {/* Kepala Desa */}
    <div className="struktur-level">
      <div className="struktur-card utama">
        <div className="icon male" />
        <h4>Kepala Desa</h4>
        <p>Budi Santoso</p>
      </div>
    </div>

    {/* Garis */}
    <div className="struktur-line" />

    {/* Sekretaris */}
    <div className="struktur-level">
      <div className="struktur-card">
        <div className="icon female" />
        <h4>Sekretaris Desa</h4>
        <p>Siti Aminah</p>
      </div>
    </div>

    {/* Garis */}
    <div className="struktur-line" />

    {/* Kaur */}
    <div className="struktur-grid">
      <div className="struktur-card">
        <div className="icon male" />
        <h4>Kaur Pemerintahan</h4>
        <p>Ahmad Fauzi</p>
      </div>

      <div className="struktur-card">
        <div className="icon female" />
        <h4>Kaur Keuangan</h4>
        <p>Dewi Lestari</p>
      </div>

      <div className="struktur-card">
        <div className="icon male" />
        <h4>Kaur Perencanaan</h4>
        <p>Rizki Pratama</p>
      </div>
    </div>

    {/* Garis */}
    <div className="struktur-line" />

    {/* Kadus */}
    <div className="struktur-level">
      <div className="struktur-card">
        <div className="icon male" />
        <h4>Kepala Dusun</h4>
        <p>Herman Mujiono</p>
      </div>
    </div>
  </div>
</section>



    </div>
  );
}
