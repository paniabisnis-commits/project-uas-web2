import { useState, useEffect } from "react";
import "./DetailLayanan.css";

const sliderImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];

const heroSubtitleText =
  "Pendaftaran calon penerima Bantuan Sosial Desa Sumbersari dilakukan secara transparan, objektif, dan sesuai peraturan.";

export default function PendaftaranBantuanSosial() {
  // HERO
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeroText, setShowHeroText] = useState(false);
  const [heroTextIndex, setHeroTextIndex] = useState(0);

  // FORM
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [nomorDaftar, setNomorDaftar] = useState(null);

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    ttl: "",
    jenis_kelamin: "",
    status_kawin: "",
    no_kk: "",
    alamat: "",
    no_hp: "",
    alasan: "",
  });

  // SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ANIMASI HERO
  useEffect(() => {
    const timeout = setTimeout(() => setShowHeroText(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  // TYPEWRITER
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prev) => {
        if (prev < heroSubtitleText.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedNumber = `BANSOS-DES-2026-${Math.floor(
        10000 + Math.random() * 90000
      )}`;

      setNomorDaftar(generatedNumber);
      setIsSubmitting(false);
      setShowNotif(true);

      setForm({
        nik: "",
        nama: "",
        ttl: "",
        jenis_kelamin: "",
        status_kawin: "",
        no_kk: "",
        alamat: "",
        no_hp: "",
        alasan: "",
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
              transform: showHeroText
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "all 0.8s ease-out",
            }}
          >
            Pendaftaran Bantuan Sosial Desa
          </h1>

          <p>
            {heroSubtitleText
              .slice(0, heroTextIndex)
              .split("")
              .map((c, i) => (
                <span key={i}>{c}</span>
              ))}
          </p>
        </div>
      </header>

      {showNotif && (
        <div className="notif-success">
          Terima kasih. Pendaftaran Bantuan Sosial Anda berhasil disimpan
          {nomorDaftar && (
            <div style={{ marginTop: 6, fontWeight: 600 }}>
              Nomor Pendaftaran: {nomorDaftar}
            </div>
          )}
        </div>
      )}

      {/* CONTENT */}
      <div className="detail-layanan-page">
        {/* INFORMASI AWAL */}
        <section className="detail-card">
          <h2>Informasi Pendaftaran Bantuan Sosial</h2>
          <p>
            Portal pendaftaran dan pemutakhiran data calon penerima bantuan sosial pemerintah (PKH, BST, BPNT, Bansos Tunai Desa, dll).
          </p>
        </section>

        <section className="detail-table-wrapper">
          <h2 className="section-title">Informasi Program</h2>

          <table className="detail-table">
            <tbody>
              <tr>
                <th>Jenis Bantuan</th>
                <td>
                  Pendaftaran Calon Penerima Bantuan Tunai Desa Tahap II Tahun
                  2026
                </td>
              </tr>

              <tr>
                <th>Persyaratan Umum</th>
                <td>
                  <ul>
                    <li>Warga Desa Sumbersari</li>
                    <li>Memiliki KTP dan KK yang valid</li>
                    <li>Termasuk keluarga rentan/miskin</li>
                    <li>Belum menerima bantuan sejenis</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <th>Disclaimer</th>
                <td>
                  Pendaftaran ini merupakan pengumpulan data. Keputusan
                  penetapan penerima tetap melalui proses verifikasi lapangan
                  dan musyawarah desa sesuai peraturan.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* FORM */}
        <section className="form-card">
          <h2>Form Pendaftaran Bantuan Sosial</h2>
          {isSubmitting && <div className="loading-bar" />}

          <form className="layanan-form" onSubmit={handleSubmit}>
            <h3>Identitas Kepala Keluarga</h3>
            <div className="form-group">
              <label>No. Kartu Keluarga</label>
              <input
                required
                value={form.no_kk}
                onChange={(e) =>
                  setForm({ ...form, no_kk: e.target.value })
                }placeholder="Masukkan No KK valid"
              />
            </div>

            <div className="form-group">
              <label>NIK</label>
              <input
                required
                value={form.nik}
                onChange={(e) =>
                  setForm({ ...form, nik: e.target.value })
                }placeholder="Masukkan NIK sesuai KTP"
              />
            </div>

            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                required
                value={form.nama}
                onChange={(e) =>
                  setForm({ ...form, nama: e.target.value })
                }placeholder="Contoh: Ahmad Fauzi"
              />
            </div>

            <div className="form-group">
              <label>Tempat, Tanggal Lahir</label>
              <input
                required
                value={form.ttl}
                onChange={(e) =>
                  setForm({ ...form, ttl: e.target.value })
                }placeholder="Contoh: Surakarta, 10 Oktober 1980"
              />
            </div>

            <div className="form-group">
              <label>Jenis Kelamin</label>
              <select
                required
                value={form.jenis_kelamin}
                onChange={(e) =>
                  setForm({ ...form, jenis_kelamin: e.target.value })
                }
              >
                <option value="">Pilih</option>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status Perkawinan</label>
              <select
                required
                value={form.status_kawin}
                onChange={(e) =>
                  setForm({ ...form, status_kawin: e.target.value })
                }
              >
                <option value="">Pilih</option>
                <option>Kawin</option>
                <option>Belum Kawin</option>
                <option>Cerai Hidup</option>
                <option>Cerai Mati</option>
              </select>
            </div>

            <div className="form-group">
              <label>Alamat Lengkap</label>
              <textarea
                required
                value={form.alamat}
                onChange={(e) =>
                  setForm({ ...form, alamat: e.target.value })
                }placeholder="Alamat lengkap sesuai KTP"
              />
            </div>

            <div className="form-group">
              <label>No. Telepon / HP</label>
              <input
                required
                value={form.no_hp}
                onChange={(e) =>
                  setForm({ ...form, no_hp: e.target.value })
                }placeholder="Nomor yang dapat dihubungi"
              />
            </div>

            <div className="form-group">
              <label>Alasan Mengajukan Bantuan</label>
              <textarea
                required
                value={form.alasan}
                onChange={(e) =>
                  setForm({ ...form, alasan: e.target.value })
                }placeholder="Jelaskan secara spesifik alasan kebutuhan bantuan Anda"
              />
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Daftar Bantuan Sosial"}
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
