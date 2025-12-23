import { useEffect, useState } from "react";
import "./Kontak.css";

export default function Kontak() {
  return (
    <section className="kontak-container">
      {/* HEADER */}
      <header className="kontak-header">
        <h1>Kontak Pemerintah Desa</h1>
        <p>
          Informasi resmi untuk menghubungi Pemerintah Desa.
          Silakan menghubungi kami pada jam pelayanan.
        </p>
      </header>

      {/* GRID INFO */}
      <div className="kontak-grid">
        <div className="kontak-card">
          <h3>Alamat Kantor</h3>
          <p>
            Kantor Desa Contoh<br />
            Kecamatan Contoh, Kabupaten Contoh
          </p>
        </div>

        <div className="kontak-card">
          <h3>Email Resmi</h3>
          <p>desacontoh@gmail.com</p>
        </div>

        <div className="kontak-card">
          <h3>Telepon</h3>
          <p>08xx-xxxx-xxxx</p>
        </div>

        <div className="kontak-card">
          <h3>Jam Pelayanan</h3>
          <p>
            Senin – Jumat<br />
            08.00 – 15.00 WIB
          </p>
        </div>
      </div>

      {/* CATATAN */}
      <div className="kontak-note">
        <p>
          📌 Masyarakat diharapkan datang langsung ke kantor desa
          dengan membawa dokumen pendukung.
        </p>
      </div>
    </section>
  );
}
