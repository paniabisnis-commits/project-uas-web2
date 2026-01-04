import { useEffect, useState } from "react";
import "./Kontak.css";
import MapDesa from "../components/MapDesa";


export default function Kontak() {
  const images = [
    "/images/desa1.jpg",
    "/images/desa2.jpg",
    "/images/desa3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="kontak-hero"
        style={{ backgroundImage: `url(${images[index]})` }}
      >
        <div className="hero-overlay">
          <h1>Desa Sumbersari</h1>
          <p>
            Kontak Resmi Pemerintah Desa <br />
            Klik tombol di bawah untuk menghubungi kami via WhatsApp
          </p>
          <a
            href="https://wa.me/628114448585"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.52 3.48A11.82 11.82 0 0012.01 0C5.39 0 0 5.38 0 12a11.94 11.94 0 001.69 6.16L0 24l5.97-1.57A11.93 11.93 0 0012.01 24C18.63 24 24 18.62 24 12a11.82 11.82 0 00-3.48-8.52zM12 22a9.87 9.87 0 01-5.02-1.38l-.36-.21-3.54.93.95-3.45-.23-.35A9.92 9.92 0 1122 12a9.94 9.94 0 01-10 10zm5.47-7.53c-.3-.15-1.77-.87-2.04-.97s-.48-.15-.68.15-.78.97-.96 1.17-.35.22-.65.07a8.16 8.16 0 01-2.4-1.48 9.04 9.04 0 01-1.66-2.06c-.17-.3 0-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52s-.68-1.64-.93-2.24c-.24-.58-.49-.5-.68-.5h-.58c-.2 0-.52.07-.8.37-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.26 5.16 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
            </svg>
            Hubungi Kami
          </a>
        </div>
      </section>
      <section className="kontak-bar">
  <div className="kontak-bar-grid">

    <div className="kontak-bar-item">
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-6h6v6" />
        </svg>
        Office
      </h3>
      <p>
        Kantor Desa Sumbersari <br />
        Kecamatan Sumbersuko, Kabupaten Sumberan
      </p>
    </div>

    <div className="kontak-bar-item">
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 21V9h6v12" />
        </svg>
        Office
      </h3>
      <p>
        Gedung Pelayanan Desa <br />
        Jl. Sumbersuko Raya No. 10
      </p>
    </div>

    <div className="kontak-bar-item">
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.81.31 1.6.57 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.73-1.73a2 2 0 012.11-.45c.75.26 1.54.45 2.35.57A2 2 0 0122 16.92z" />
        </svg>
        Contact
      </h3>
      <p>
        (0274) 8xxxxxx <br />
        desasumbersari@gmail.com
      </p>
    </div>

  </div>
</section>


      <section className="kontak-map">
  <MapDesa />
</section>
    </>
  );
}
