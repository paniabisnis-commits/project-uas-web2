import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Layanan.css";

const sliderImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];

export default function Layanan() {
  const [showHeroText, setShowHeroText] = useState(false);
  const [layanan, setLayanan] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("https://backendpemerintah.24tia6.com/api/layanan")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA API:", data.data);
        console.log("JUMLAH DATA:", data.data.length);
        setLayanan(data.data || []);
      })
      .catch((err) => console.error("ERROR FETCH:", err));
  }, []);
  useEffect(() => {
  const timeout = setTimeout(() => setShowHeroText(true), 300);
  return () => clearTimeout(timeout);
}, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slugMap = {
  "Pendaftaran / Perubahan Data Keluarga": "data-keluarga",
  "Pendaftaran Bantuan Sosial (Bansos)": "bansos",
  "Informasi Lowongan Kerja & Pelatihan": "lowongan-kerja",
  "Dashboard APBDes": "apbdes",
};


const getSlug = (nama) => {
  return nama
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

{layanan.slice(1).map((l) => {
  console.log("NAMA DARI API:", JSON.stringify(l.nama_layanan));
  return null;
})}


  return (
    <>
    <header
  className="layanan-hero"
  style={{
    backgroundImage: `url(${sliderImages[currentSlide]})`,
  }}
>
  <div className="layanan-hero-overlay">
    <h1
      style={{
        opacity: showHeroText ? 1 : 0,
        transform: showHeroText ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease-out",
      }}
    >
      Layanan Publik
    </h1>

    <p
      style={{
        opacity: showHeroText ? 1 : 0,
        transform: showHeroText ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s ease-out",
        transitionDelay: "0.2s",
      }}
    >
      Pelayanan terbaik untuk masyarakat Desa Sumbersari
    </p>
  </div>
</header>

      
      <div className="layanan-page">
        {layanan.length > 0 && (
          <section className="layanan-terbaru">
            <h2 className="section-title">Layanan Terbaru Bulan Ini</h2>

            <div className="layanan-terbaru-card">
              <div className="layanan-terbaru-image">
                <img
                  src={`https://backendpemerintah.24tia6.com/storage/${layanan[0].gambar}`}
                  alt={layanan[0].nama_layanan}
                />
              </div>

              <div className="layanan-terbaru-content">
                <h3>{layanan[0].nama_layanan}</h3>
                <p>{layanan[0].deskripsi}</p>

                <Link to="/layanan/permohonan-surat" className="layanan-btn">
                  Detail Layanan
                </Link>
              </div>
            </div>
          </section>
        )}
        {/* DAFTAR LAYANAN */}
        {layanan.length > 1 && (
  <section className="layanan-daftar">
    <h2 className="section-title">Daftar Layanan yang Bisa Diakses</h2>

    <div className="layanan-grid">
      {layanan.slice(1).map((l) => (
        <div key={l.id} className="layanan-item"> 
          <div className="layanan-image">
            <img
              src={`https://backendpemerintah.24tia6.com/storage/${l.gambar}`}
              alt={l.nama_layanan}
            />
          </div>

          <div className="layanan-card-content">
            <h3>{l.nama_layanan}</h3>
            <p>{l.deskripsi}</p>
          </div>

          <Link
  to={`/layanan/${slugMap[l.nama_layanan] || getSlug(l.nama_layanan)}`}
  className="layanan-btn"
>
  Detail Layanan
</Link>


        </div>
      ))}
    </div>
  </section>
        )}
      </div>
    </>
  );
}