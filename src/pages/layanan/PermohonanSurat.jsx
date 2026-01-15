import { useState } from "react";
import "./DetailLayanan.css";

export default function PermohonanSuratPengantar() {
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    alamat: "",
    keperluan: "",
    no_hp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Permohonan berhasil diajukan");
  };

  return (
    <div className="detail-layanan-page">
      {/* HEADER */}
      <header className="detail-header">
        <h1>Permohonan Surat Pengantar Online</h1>
        <p>
          Layanan resmi Desa Sumbersari untuk mempermudah pengajuan surat
          pengantar secara online, cepat, dan transparan.
        </p>
      </header>

      {/* INFORMASI LAYANAN */}
      <section className="detail-card">
        <h2>Detail Layanan</h2>
        <p>
          Layanan ini digunakan oleh masyarakat Desa Sumbersari untuk
          mengajukan surat pengantar sebagai syarat administrasi
          (KK, KTP, BPJS, dll).
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
            <li>Surat diproses dan disetujui</li>
            <li>Surat dapat diambil / diunduh</li>
          </ol>
        </td>
      </tr>

      <tr>
        <th>Persyaratan</th>
        <td>
          <ul>
            <li>Fotokopi KTP</li>
            <li>Fotokopi Kartu Keluarga</li>
            <li>Data sesuai domisili</li>
          </ul>
        </td>
      </tr>

      <tr>
        <th>Estimasi Waktu</th>
        <td>± 1 Hari Kerja</td>
      </tr>
    </tbody>
  </table>
</section>


      {/* FORM */}
      <section className="form-card">
        <h2>Form Pengajuan Layanan</h2>

        <form onSubmit={handleSubmit} className="layanan-form">
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input type="text" placeholder="Contoh: Ahmad Fauzi" />
          </div>


          <div className="form-group">
            <label>NIK</label>
            <input
              type="text"
              placeholder="Masukkan NIK sesuai KTP"
            />
          </div>

          <div className="form-group">
            <label>Alamat</label>
            <input
              type="text"
              placeholder="Masukkan Alamat Lengkap sesuai KTP"
            />
          </div>

          <div className="form-group">
            <label>Keperluan</label>
            <textarea
              name="keperluan"
              placeholder="Jelaskan keperluan pengajuan surat pengantar"
            />
          </div>

          <div className="form-group">
            <label>No. HP</label>
            <input
              type="text"
              placeholder="Masukkan No.HP yang dapat dihubungi"
            />
          </div>

          <button type="submit" className="submit-btn">
            Ajukan Permohonan
          </button>
        </form>
      </section>
    </div>
  );
}
