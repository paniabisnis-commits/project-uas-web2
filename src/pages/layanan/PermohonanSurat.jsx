import { useState, useEffect } from "react";
import "./DetailLayanan.css";

const sliderImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];

const heroSubtitleText =
  "Layanan resmi Desa Sumbersari untuk mempermudah pengajuan surat pengantar secara online, cepat, dan transparan.";

export default function PermohonanSuratPengantar() {
  // 🔹 HERO STATE
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeroText, setShowHeroText] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);

  // 🔹 FORM STATE
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    alamat: "",
    keperluan: "",
    no_hp: "",
  });

  // 🔁 SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ✨ FADE TITLE
  useEffect(() => {
    const timeout = setTimeout(() => setShowHeroText(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  // ⌨️ TYPEWRITER SUBTITLE
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => {
        if (prev < heroSubtitleText.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
  e.preventDefault();

  setIsSubmitting(true);

  setTimeout(() => {
    setIsSubmitting(false);
    setShowNotif(true);

    setForm({
      nama: "",
      nik: "",
      alamat: "",
      keperluan: "",
      no_hp: "",
    });

    setTimeout(() => {
      setShowNotif(false);
    }, 5000);
  }, 2000);
};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <>
      {/* HERO */}
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
            Permohonan Surat Pengantar Online
          </h1>

          <p>
            {heroSubtitleText
              .slice(0, heroTextIndex)
              .split("")
              .map((char, i) => (
                <span key={i}>{char}</span>
              ))}
          </p>
        </div>
      </header>
      {showNotif && (
  <div className="notif-success">
    Permohonan anda berhasil diajukan. Akan diproses maksimal dalam 3 hari kerja.
  </div>
)}

      {/* CONTENT */}
      <div className="detail-layanan-page">
        <section className="detail-card">
          <h2>Detail Layanan</h2>
          <p>
            Ajukan permohonan pembuatan surat pengantar (nikah, SKCK,
            kehilangan, dll) secara online dengan mudah dan cepat.
          </p>
        </section>

        <section className="detail-table-wrapper">
          <h2 className="section-title">Informasi Pelayanan</h2>

          <table className="detail-table">
            <tbody>
              <tr>
                <th>Alur Pelayanan</th>
                <td>
                  <ol>
                    <li>Mengisi formulir permohonan</li>
                    <li>Verifikasi data oleh petugas desa</li>
                    <li>Surat diproses</li>
                    <li>Surat dapat diambil</li>
                  </ol>
                </td>
              </tr>

              <tr>
                <th>Persyaratan</th>
                <td>
                  <ul>
                    <li>Fotokopi KTP</li>
                    <li>Fotokopi KK</li>
                    <li>Domisili sesuai</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <th>Estimasi Waktu</th>
                <td>± 3 Hari Kerja</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="form-card">
          <h2>Form Pengajuan Layanan</h2>
          {isSubmitting && <div className="loading-bar" />}

          <form onSubmit={handleSubmit} className="layanan-form">
            <div className="form-group">
  <label>Nama Lengkap</label>
  <input
    name="nama"
    value={form.nama}
    onChange={(e) =>
      setForm({ ...form, nama: e.target.value })
    }
    placeholder="Contoh: Ahmad Fauzi"
  />
</div>

<div className="form-group">
  <label>NIK</label>
  <input
    name="nik"
    value={form.nik}
    onChange={(e) =>
      setForm({ ...form, nik: e.target.value })
    }
    placeholder="Masukkan NIK sesuai KTP"
  />
</div>

<div className="form-group">
  <label>Alamat</label>
  <input
    name="alamat"
    value={form.alamat}
    onChange={(e) =>
      setForm({ ...form, alamat: e.target.value })
    }
    placeholder="Alamat lengkap sesuai KTP"
  />
</div>

<div className="form-group">
  <label>Keperluan</label>
  <textarea
    name="keperluan"
    value={form.keperluan}
    onChange={(e) =>
      setForm({ ...form, keperluan: e.target.value })
    }
    placeholder="Jelaskan keperluan pengajuan"
  />
</div>

<div className="form-group">
  <label>No. HP</label>
  <input
    name="no_hp"
    value={form.no_hp}
    onChange={(e) =>
      setForm({ ...form, no_hp: e.target.value })
    }
    placeholder="Nomor yang dapat dihubungi"
  />
</div>


            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : "Ajukan Permohonan"}
            </button>

          </form>
        </section>
      </div>
    </>
  );
}
