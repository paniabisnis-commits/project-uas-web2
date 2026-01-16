import { useState, useEffect } from "react";
import "./DetailLayanan.css";

const sliderImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];

const heroSubtitleText =
  "Dashboard APBDes Desa Sumbersari sebagai wujud transparansi dan akuntabilitas pengelolaan keuangan desa.";
function DonutChart({ data, title }) {
  const radius = 70;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className="chart-box">
      <h4>{title}</h4>

      <svg width="200" height="200" viewBox="0 0 200 200">
        <g transform="translate(100,100)">
          {data.map((item, i) => {
            const dash = (item.value / 100) * circumference;
            const gap = circumference - dash;

            const circle = (
              <circle
                key={i}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
              />
            );

            offset += dash;
            return circle;
          })}
        </g>
      </svg>

      <ul className="chart-legend">
        {data.map((item, i) => (
          <li key={i}>
            <span
              className="legend-dot"
              style={{ background: item.color }}
            ></span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DetailDashboardAPBDes() {
  // HERO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeroText, setShowHeroText] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);

  // FAQ
  const [activeFaq, setActiveFaq] = useState(null);

  // SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // FADE TITLE
  useEffect(() => {
    const timeout = setTimeout(() => setShowHeroText(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  // TYPEWRITER
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) =>
        prev < heroSubtitleText.length ? prev + 1 : prev
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const pendapatanDesa = [
  { label: "Dana Desa (APBN) – Rp 800 jt (64%)", value: 64, color: "#0f766e" },
  { label: "Bagi Hasil Pajak – Rp 300 jt (24%)", value: 24, color: "#22c55e" },
  { label: "Pendapatan Asli Desa – Rp 100 jt (8%)", value: 8, color: "#60a5fa" },
  { label: "Lain-lain – Rp 50 jt (4%)", value: 4, color: "#facc15" },
];

const belanjaDesa = [
  { label: "Pembangunan – Rp 600 jt (50%)", value: 50, color: "#2563eb" },
  { label: "Pemberdayaan – Rp 300 jt (25%)", value: 25, color: "#16a34a" },
  { label: "Pemerintahan – Rp 200 jt (17%)", value: 17, color: "#f97316" },
  { label: "Tak Terduga – Rp 100 jt (8%)", value: 8, color: "#dc2626" },
];

const IconChevron = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    className={`faq-icon ${open ? "open" : ""}`}
    fill="none"
  >
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

  return (
    <>
      {/* HERO */}
      <header
        className="layanan-hero"
        style={{ backgroundImage: `url(${sliderImages[currentSlide]})` }}
      >
        <div className="layanan-hero-overlay">
          <h1
            style={{
              opacity: showHeroText ? 1 : 0,
              transform: showHeroText ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease-out",
            }}
          >
            Dashboard APBDes
          </h1>

          <p>{heroSubtitleText.slice(0, heroTextIndex)}</p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="detail-layanan-page">
        {/* DETAIL LAYANAN */}
        <section className="detail-card">
          <h2>Detail Layanan</h2>
          <p>
            Layanan Dashboard APBDes menampilkan ringkasan pendapatan, belanja,
            dan penggunaan anggaran Desa Sumbersari secara terbuka untuk
            masyarakat, sebagai bentuk transparansi dan pengawasan publik.
          </p>

          <p style={{ marginTop: "12px" }}>
            <strong>Tahun Anggaran:</strong> 2025 <br />
            <strong>Update Terakhir:</strong> 30 Desember 2025 (Periode Semester
            II)
          </p>
        </section>

        {/* TABEL APBDES */}
        <section className="detail-table-wrapper">
          <h2 className="section-title">Ringkasan Anggaran Desa</h2>

          <table className="detail-table">
            <thead>
              <tr>
                <th>Indikator</th>
                <th>Jumlah</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Pendapatan Desa</td>
                <td>Rp 1.800.000.000</td>
                <td>Anggaran yang direncanakan masuk ke kas desa selama 2025</td>
              </tr>
              <tr>
                <td>Total Belanja Desa</td>
                <td>Rp 1.200.000.000</td>
                <td>Anggaran yang diizinkan untuk dikeluarkan</td>
              </tr>
              <tr>
                <td>Dana Desa (Transfer APBN)</td>
                <td>Rp 1.400.000.000</td>
                <td>Kontribusi terbesar (±78%) dari total pendapatan</td>
              </tr>
              <tr>
                <td>Sisa Anggaran Tersedia</td>
                <td>Rp 200.000.000</td>
                <td>Belanja belum dicairkan + dana cadangan</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* VISUALISASI */}
        <section className="detail-card section-spacing">
  <h2>Visualisasi Inti</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "32px",
      marginTop: "20px",
    }}
  >
    <DonutChart
      title="Dari Mana Pendapatan Desa Berasal?"
      data={pendapatanDesa}
    />

    <DonutChart
      title="Untuk Apa Uang Desa Dikeluarkan?"
      data={belanjaDesa}
    />
  </div>
</section>

<section className="faq-section section-spacing">
  <h2 className="faq-title">Pertanyaan Umum (FAQ)</h2>

  <div className="faq-item" onClick={() => toggleFaq(0)}>
    <div className="faq-question">
      Siapa yang bisa melihat bukti pengeluaran?
    </div>
    {activeFaq === 0 && (
      <div className="faq-answer">
        Seluruh bukti pengeluaran (kwitansi) dapat dicek publik di Kantor
        Desa selama jam kerja sesuai prinsip transparansi keuangan desa.
      </div>
    )}
  </div>

  <div className="faq-item" onClick={() => toggleFaq(1)}>
    <div className="faq-question">
      Mengapa masih terdapat sisa anggaran?
    </div>
    {activeFaq === 1 && (
      <div className="faq-answer">
        Dana dialokasikan untuk kegiatan semester berikutnya serta sebagai
        cadangan kebutuhan mendesak desa.
      </div>
    )}
  </div>

  <div className="faq-item" onClick={() => toggleFaq(2)}>
    <div className="faq-question">
      Bagaimana cara mengusulkan program dana desa?
    </div>
    {activeFaq === 2 && (
      <div className="faq-answer">
        Usulan dapat disampaikan melalui Musrenbangdes yang dilaksanakan
        setiap bulan Oktober.
      </div>
    )}
  </div>
</section>

      </div>
    </>
  );
}
