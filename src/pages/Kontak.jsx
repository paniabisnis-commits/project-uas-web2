import { useEffect, useState } from "react";
import "./Kontak.css";

export default function Kontak() {
  const images = [
    "/images/desa1.jpg",
    "/images/desa2.jpg",
    "/images/desa3.jpg",
  ];

  const [index, setIndex] = useState(0);

  // SLIDER OTOMATIS
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // ganti tiap 4 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== HERO SLIDER ===== */}
      <section
        className="kontak-hero"
        style={{ backgroundImage: `url(${images[index]})` }}
      >
        <div className="hero-overlay">
          <h1>Desa Sumbersari</h1>
          <p>
            Kontak Resmi Pemerintah Desa <br />
            Informasi layanan dan jam operasional kantor desa
          </p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="kontak-container">
        <div className="kontak-grid">
          <div className="kontak-card">
            <span className="card-label">Alamat Kantor</span>
            <p>
              Kantor Desa Sumbersari <br />
              Kecamatan Contoh, Kabupaten Contoh
            </p>
          </div>

          <div className="kontak-card">
            <span className="card-label">Email Resmi</span>
            <p>desasumbersari@gmail.com</p>
          </div>

          <div className="kontak-card">
            <span className="card-label">Telepon</span>
            <p>08xx-xxxx-xxxx</p>
          </div>

          <div className="kontak-card">
            <span className="card-label">Jam Pelayanan</span>
            <p>
              Senin – Jumat <br />
              08.00 – 15.00 WIB
            </p>
          </div>
        </div>

        <div className="kontak-note">
          <p>
            📌 Masyarakat diharapkan datang langsung ke kantor desa
            dengan membawa dokumen pendukung.
          </p>
        </div>
      </section>
    </>
  );
}
