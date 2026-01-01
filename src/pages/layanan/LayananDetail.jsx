import { useParams } from "react-router-dom";
import "./LayananDetail.css";

const layananData = {
  "layanan-administrasi": {
    nama: "Layanan Administrasi Desa",
    gambar: "UWsBCsQC28pHalqBWXpqtbtxXd2F3rtZHeFIWJR7.png",
    deskripsi:
      "Layanan Administrasi Desa merupakan pelayanan resmi yang diberikan oleh Pemerintah Desa Sumbersari kepada masyarakat dalam pengurusan berbagai dokumen administrasi kependudukan dan surat menyurat desa. Layanan ini bertujuan untuk memberikan kemudahan, kecepatan, dan kepastian hukum bagi warga desa dalam memenuhi kebutuhan administrasi mereka.",
    persyaratan: [
      "Fotokopi KTP pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat pengantar RT/RW (jika diperlukan)",
      "Dokumen pendukung sesuai jenis layanan",
    ],
    alur: [
      "Pemohon datang ke Kantor Desa Sumbersari",
      "Petugas melakukan pengecekan dan verifikasi berkas",
      "Proses administrasi oleh petugas desa",
      "Dokumen selesai dan diserahkan kepada pemohon",
    ],
    waktu: "1–2 hari kerja",
    biaya: "Gratis",
  },

  "informasi-publik": {
    nama: "Layanan Informasi Publik",
    gambar: "iBdhVWnvBG6uxKriHbq0S3V9MfirGCO6kKz0xRN7.png",
    deskripsi:
      "Layanan Informasi Publik merupakan bentuk keterbukaan Pemerintah Desa Sumbersari dalam menyediakan informasi resmi kepada masyarakat. Layanan ini meliputi penyampaian pengumuman desa, dokumen kebijakan, laporan kegiatan, serta informasi publik lainnya sesuai dengan peraturan perundang-undangan yang berlaku.",
    persyaratan: [
      "Identitas diri pemohon (KTP)",
      "Permohonan informasi secara tertulis",
      "Menjelaskan tujuan penggunaan informasi",
    ],
    alur: [
      "Pemohon mengajukan permohonan informasi",
      "Petugas memverifikasi permohonan",
      "Informasi disiapkan oleh petugas",
      "Informasi diberikan kepada pemohon",
    ],
    waktu: "1 hari kerja",
    biaya: "Gratis",
  },

  "data-umkm-desa": {
    nama: "Pendataan UMKM Desa",
    gambar: "V7WQnUr8AQs3OGWehnKFGlnp0XcUDqU67oHD26HI.png",
    deskripsi:
      "Layanan Pendataan UMKM Desa bertujuan untuk mencatat dan mengelola data usaha mikro, kecil, dan menengah milik warga Desa Sumbersari. Data ini digunakan sebagai dasar pengembangan ekonomi desa, pemberian pelatihan, serta penyaluran bantuan usaha dari pemerintah.",
    persyaratan: [
      "Fotokopi KTP pemilik usaha",
      "Surat keterangan usaha dari RT/RW",
      "Foto lokasi usaha",
    ],
    alur: [
      "Pemilik usaha mendaftar ke kantor desa",
      "Petugas memverifikasi data dan lokasi usaha",
      "Data UMKM dicatat dalam sistem desa",
      "Pemilik usaha terdaftar sebagai UMKM Desa",
    ],
    waktu: "2–3 hari kerja",
    biaya: "Gratis",
  },

  "bantuan-sosial": {
    nama: "Layanan Bantuan Sosial",
    gambar: "EENRH4owNbHhsoFg3vBTTpYDGjK4np7cCarp2IgH.png",
    deskripsi:
      "Layanan Bantuan Sosial adalah pelayanan pendataan dan pendaftaran calon penerima bantuan sosial bagi masyarakat Desa Sumbersari yang memenuhi kriteria. Layanan ini bertujuan untuk memastikan bantuan pemerintah tepat sasaran dan diterima oleh warga yang berhak.",
    persyaratan: [
      "Fotokopi KTP dan Kartu Keluarga",
      "Surat keterangan tidak mampu",
      "Terdaftar dalam DTKS (jika ada)",
    ],
    alur: [
      "Pendaftaran calon penerima bantuan",
      "Verifikasi dan validasi data",
      "Survey lapangan (jika diperlukan)",
      "Penetapan penerima bantuan",
    ],
    waktu: "Menyesuaikan program bantuan",
    biaya: "Gratis",
  },
};
const BASE_IMAGE_URL = "http://127.0.0.1:8000/storage/layanan/";
export default function LayananDetail() {
  const { slug } = useParams();
  const layanan = layananData[slug];

  if (!layanan) {
    return (
      <div className="layanan-detail-page">
        <p>Layanan tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="layanan-detail-page">
      {/* HEADER */}
      <div className="detail-header">
         <img
    src={`${BASE_IMAGE_URL}${layanan.gambar}`}
    alt={layanan.nama}
    className="detail-image"
  />

        <div className="detail-header-text">
          <h1>{layanan.nama}</h1>
          <p className="deskripsi">{layanan.deskripsi}</p>
        </div>
      </div>

      {/* PERSYARATAN & ALUR */}
<div className="detail-grid">
  <section className="detail-section">
    <h3>Persyaratan</h3>
    <ol>
      {layanan.persyaratan.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  </section>

  <section className="detail-section">
    <h3>Alur Pelayanan</h3>
    <ol>
      {layanan.alur.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  </section>
</div>

<div className="detail-info">
  <div className="info-card waktu">
    <div className="info-icon">⏱️</div>
    <div className="info-text">
      <span className="info-label">Estimasi Waktu</span>
      <strong>{layanan.waktu}</strong>
    </div>
  </div>

  <div className="info-card biaya">
    <div className="info-icon">💰</div>
    <div className="info-text">
      <span className="info-label">Biaya Layanan</span>
      <strong>{layanan.biaya}</strong>
    </div>
  </div>
</div>

      <a
  href={`https://wa.me/628114448585?text=${encodeURIComponent(
    `Halo Admin Desa Sumbersari, saya ingin mengajukan layanan "${layanan.nama}".`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-ajukan"
>
  Ajukan Layanan
</a>

    </div>
  );
}
