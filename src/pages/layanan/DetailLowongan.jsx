import { useState, useEffect } from "react";
import "./DetailLayanan.css";

/* ================= ICON SVG ================= */
const IconMoney = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18v12H3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);


const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);


const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);


const IconWebsite = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="7"
      y="2"
      width="10"
      height="20"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
  </svg>
);

const sliderImages = ["/images/desa1.jpg", "/images/desa2.jpg", "/images/desa3.jpg"];
const heroSubtitleText =
  "Informasi resmi lowongan kerja dan pelatihan untuk meningkatkan kesejahteraan masyarakat Desa Sumbersari.";

export default function LowonganPelatihan() {
  const [jenis, setJenis] = useState("lowongan");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeroText, setShowHeroText] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(
      () => setCurrentSlide((p) => (p + 1) % sliderImages.length),
      4000
    );
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowHeroText(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setHeroTextIndex((p) =>
        p < heroSubtitleText.length ? p + 1 : p
      );
    }, 30);
    return () => clearInterval(i);
  }, []);

  const dataLowongan = [
  {
    title: "Staff Administrasi Kantor",
    instansi: "PT Sejahtera Mandiri • Sumbersari",
    gaji: "Rp 3 – 4 Juta",
    waktu: "Full-time",
    deskripsi:
      "Mengelola administrasi kantor, pengarsipan dokumen, dan laporan kegiatan operasional.",
  },
  {
    title: "Operator Produksi Pangan",
    instansi: "UMKM Maju Jaya • Sumbersari",
    gaji: "Rp 2,5 – 3 Juta",
    waktu: "Shift",
    deskripsi:
      "Membantu proses produksi makanan olahan desa, menjaga kebersihan dan kualitas produk.",
  },
  {
    title: "Petugas Lapangan BUMDes",
    instansi: "BUMDes Sumbersari",
    gaji: "Rp 3 Juta",
    waktu: "Kontrak",
    deskripsi:
      "Melakukan pendataan usaha warga, monitoring program desa, dan laporan kegiatan lapangan.",
  },
  {
    title: "Penjaga Toko Sembako",
    instansi: "Toko Barokah • Dalam Kecamatan",
    gaji: "Rp 2 – 2,5 Juta",
    waktu: "Full-time",
    deskripsi:
      "Melayani pembeli, mengatur stok barang, serta menjaga kebersihan dan kerapian toko.",
  },
  {
    title: "Tenaga Kebersihan Lingkungan",
    instansi: "Pemerintah Desa Sumbersari",
    gaji: "Rp 2 Juta",
    waktu: "Paruh Waktu",
    deskripsi:
      "Menjaga kebersihan fasilitas umum desa seperti balai desa, jalan lingkungan, dan taman.",
  },
  {
    title: "Asisten Pengelola Wisata Desa",
    instansi: "Pokdarwis Sumbersari",
    gaji: "Rp 2,5 – 3 Juta",
    waktu: "Full-time",
    deskripsi:
      "Membantu operasional wisata desa, pelayanan pengunjung, dan promosi kegiatan wisata.",
  },
];

const dataPelatihan = [
  {
    title: "Pelatihan Kewirausahaan Pemula",
    instansi: "Dinas Koperasi & UMKM",
    waktu: "3 Hari",
    deskripsi:
      "Pelatihan dasar membangun usaha mandiri mulai dari ide bisnis hingga pengelolaan sederhana.",
  },
  {
    title: "Pelatihan Pengolahan Produk Pangan",
    instansi: "PKK Desa Sumbersari",
    waktu: "3 Hari",
    deskripsi:
      "Pelatihan mengolah hasil pertanian desa menjadi produk bernilai jual.",
  },
  {
    title: "Pelatihan Digital Marketing UMKM",
    instansi: "Diskominfo Kabupaten",
    waktu: "3 Hari",
    deskripsi:
      "Meningkatkan kemampuan promosi produk desa melalui media sosial dan marketplace.",
  },
  {
    title: "Pelatihan Menjahit Dasar",
    instansi: "BLK Kecamatan",
    waktu: "3 Hari",
    deskripsi:
      "Pelatihan keterampilan menjahit bagi warga untuk membuka peluang usaha rumahan.",
  },
  {
    title: "Pelatihan Pengelolaan Keuangan Usaha",
    instansi: "Pendamping UMKM Desa",
    waktu: "3 Hari",
    deskripsi:
      "Belajar pencatatan keuangan sederhana agar usaha desa lebih tertata dan berkembang.",
  },
  {
    title: "Pelatihan Barista Kopi Lokal",
    instansi: "Komunitas Kopi Desa",
    waktu: "3 Hari",
    deskripsi:
      "Pelatihan penyajian kopi lokal untuk mendukung usaha kedai kopi desa.",
  },
];

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
            Informasi Lowongan Kerja & Pelatihan
          </h1>
          <p>{heroSubtitleText.slice(0, heroTextIndex)}</p>
        </div>
      </header>
        
      <div className="detail-layanan-page">
        <section className="detail-card">
  <h2>Detail Layanan</h2>
  <p>
    Layanan ini menyediakan informasi resmi mengenai lowongan kerja dan
    program pelatihan yang tersedia bagi masyarakat Desa Sumbersari.
    Informasi disajikan untuk membantu warga memperoleh kesempatan kerja
    serta meningkatkan keterampilan dan kompetensi.
  </p>
</section>
<section className="detail-table-wrapper">
  <h2 className="section-title">Informasi Pelayanan</h2>

  <table className="detail-table">
    <tbody>
      <tr>
        <th>Jenis Informasi</th>
        <td>Lowongan Kerja dan Pelatihan / Kursus</td>
      </tr>

      <tr>
        <th>Sasaran</th>
        <td>Masyarakat Desa Sumbersari Usia Produktif</td>
      </tr>

      <tr>
        <th>Pembaruan Data</th>
        <td>Berkala sesuai informasi dari perusahaan & instansi terkait</td>
      </tr>

      {/* ✅ RADIO MASUK TABEL */}
      <tr>
        <th>Kategori</th>
        <td>
          <div className="radio-group radio-vertical">
            <label>
              <input
                type="radio"
                name="kategori"
                checked={jenis === "lowongan"}
                onChange={() => setJenis("lowongan")}
              />
              Lowongan Kerja
            </label>

            <label>
              <input
                type="radio"
                name="kategori"
                checked={jenis === "pelatihan"}
                onChange={() => setJenis("pelatihan")}
              />
              Pelatihan
            </label>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</section>



        {/* GRID BARU */}
        <section className="lp-grid">
  {(jenis === "lowongan" ? dataLowongan : dataPelatihan).map((item, i) => (
    <div className="lp-card" key={i}>
      <h3>{item.title}</h3>

      <p className="info-sub">{item.instansi}</p>

      <div className="lp-labels">
        <span>
          <IconMoney /> {jenis === "lowongan" ? item.gaji : "Gratis"}
        </span>
        <span>
          <IconCalendar /> {item.waktu}
        </span>
        <span>
          <IconLocation /> Dalam Kecamatan
        </span>
      </div>

      <p className="lp-desc">{item.deskripsi}</p>

      <p className="info-deadline">
        Batas {jenis === "lowongan" ? "Lamaran" : "Pendaftaran"}:
        30 September 2026
      </p>

      <p className="lp-contact">
        <span><IconWebsite /> info@desa.go.id</span><br />
        <span><IconPhone /> 0812-0000-1234</span>
      </p>
    </div>
  ))}
</section>


        {/* HELP */}
        <section className="lp-help-box">
          <h2>Butuh Bantuan?</h2>
          <p>
            Apabila Anda mengalami kesulitan dalam proses pendaftaran atau
            membutuhkan arahan lebih lanjut, silakan datang langsung ke
            Kantor Desa Sumbersari untuk berkonsultasi.
            <br /><br />
            <strong>Bpk. Ahmad Fauzi (Kaur Pemerintahan)</strong><br />
            Senin – Jumat | 10.00 – 14.00
          </p>
        </section>
      </div>
    </>
  );
}
