import { useState, useEffect } from "react";
import "./DetailLayanan.css";

const sliderImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];

const heroSubtitleText =
  "Layanan resmi Desa Sumbersari untuk pendaftaran dan perubahan data keluarga secara online, mudah, dan transparan.";

export default function DetailDataKeluarga() {
  // HERO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeroText, setShowHeroText] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);

  // FORM
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    no_kk: "",
    alamat: "",
    hubungan: "",
    no_hp: "",
    jenis_perubahan: "",
    perubahan_data: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowNotif(true);

      setForm({
        nik: "",
        nama: "",
        no_kk: "",
        alamat: "",
        hubungan: "",
        no_hp: "",
        jenis_perubahan: "",
        perubahan_data: "",
      });

      setTimeout(() => setShowNotif(false), 5000);
    }, 2000);
  };

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
            Pendaftaran & Perubahan Data Keluarga
          </h1>

          <p>
            {heroSubtitleText.slice(0, heroTextIndex)}
          </p>
        </div>
      </header>

      {/* NOTIF */}
      {showNotif && (
        <div className="notif-success">
          Permohonan anda berhasil diajukan. Akan diproses maksimal dalam 3 hari
          kerja.
        </div>
      )}

      {/* CONTENT */}
      <div className="detail-layanan-page">
        <section className="detail-card">
          <h2>Detail Layanan</h2>
          <p>
            Layanan ini digunakan untuk pendaftaran dan perubahan data keluarga
            seperti kelahiran, kematian, pindah datang, serta perubahan data
            diri dalam Kartu Keluarga.
          </p>
        </section>

        <section className="detail-table-wrapper">
          <h2 className="section-title">Informasi Pelayanan</h2>

          <table className="detail-table">
            <tbody>
              <tr>
                <th>Jenis Layanan</th>
                <td>
                  Kelahiran, Kematian, Pindah Datang, Pindah Keluar, Perubahan
                  Data Diri
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
              <label>NIK</label>
              <input name="nik" value={form.nik} onChange={handleChange}placeholder="Masukkan NIK sesuai KTP" />
            </div>

            <div className="form-group">
              <label>Nama Lengkap</label>
              <input name="nama" value={form.nama} onChange={handleChange}placeholder="Contoh: Ahmad Fauzi" />
            </div>

            <div className="form-group">
              <label>Nomor Kartu Keluarga (KK)</label>
              <input name="no_kk" value={form.no_kk} onChange={handleChange}placeholder="Masukkan No KK valid" />
            </div>

            <div className="form-group">
              <label>Alamat sesuai KK</label>
              <input name="alamat" value={form.alamat} onChange={handleChange}placeholder="Alamat lengkap sesuai KTP" />
            </div>

            <div className="form-group">
              <label>Hubungan dengan yang bersangkutan</label>
              <input
                name="hubungan"
                placeholder="Kepala Keluarga / Istri / Anak"
                value={form.hubungan}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Nomor Telepon / HP</label>
              <input name="no_hp" value={form.no_hp} onChange={handleChange}placeholder="Nomor yang dapat dihubungi" />
            </div>

            <div className="form-group">
              <label>Jenis Perubahan Data</label>
              <select
                name="jenis_perubahan"
                value={form.jenis_perubahan}
                onChange={handleChange}
              >
                <option value="">-- Pilih Jenis --</option>
                <option value="kelahiran">Kelahiran</option>
                <option value="kematian">Kematian</option>
                <option value="pindah_masuk">Kedatangan / Pindah Masuk</option>
                <option value="pindah_keluar">Keberangkatan / Pindah Keluar</option>
              </select>
            </div>

            <div className="form-group">
              <label>Perubahan Data Diri</label>
              <textarea
                name="perubahan_data"
                placeholder="Nama, agama, pekerjaan, status perkawinan, dll"
                value={form.perubahan_data}
                onChange={handleChange}
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
