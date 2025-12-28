import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Layanan.css";

const heroImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/layanan")
      .then((res) => res.json())
      .then((data) => setLayanan(data.data))
      .catch((err) => console.error("ERROR FETCH:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="layanan-hero"
        style={{ backgroundImage: `url(${heroImages[heroIndex]})` }}
      >
        <div className="layanan-hero-overlay">
          <h1>Layanan Publik</h1>
          <p>Pelayanan terbaik untuk masyarakat Desa Sumbersari</p>
        </div>
      </section>

      <section className="layanan-page">
        {/* === LAYANAN TERBARU === */}
        {layanan[0] && (
          <section className="layanan-terbaru">
            <h2 className="section-title">Layanan Terbaru Bulan Ini</h2>

            <div className="layanan-terbaru-card">
              <div className="layanan-terbaru-image">
                <img
                  src={`http://127.0.0.1:8000/storage/${layanan[0].gambar}`}
                  alt={layanan[0].nama_layanan}
                />
              </div>

              <div className="layanan-terbaru-content">
                <h3>{layanan[0].nama_layanan}</h3>
                <p>{layanan[0].deskripsi}</p>
                <Link to="/#pengaduan" className="layanan-btn">
                  Detail Layanan
                </Link>

              </div>
            </div>
          </section>
        )}

        {/* === DAFTAR LAYANAN === */}
        {layanan.length > 1 && (
  <section className="layanan-daftar">
    <h2 className="section-title">Daftar Layanan yang Bisa Diakses</h2>

    <div className="layanan-grid">
      {layanan.map((l) => (
        <div key={l.id} className="layanan-card">
          <div className="layanan-image">
            <img
              src={`http://127.0.0.1:8000/storage/${l.gambar}`}
              alt={l.nama_layanan}
            />
          </div>

          <div className="layanan-card-content">
            <h3>{l.nama_layanan}</h3>
            <p>{l.deskripsi}</p>
          </div>

          <Link to="/#pengaduan" className="layanan-btn">
            Detail Layanan
          </Link>
        </div>
      ))}
    </div>
  </section>
)}
      </section>
    </>
  );
}
