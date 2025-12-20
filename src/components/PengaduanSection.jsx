import { useState } from "react";
import apiClient from "../api/apiClient";
import { Link } from "react-router-dom";

export default function PengaduanSection() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [isi, setIsi] = useState("");

  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listPengaduan, setListPengaduan] = useState([]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);

  try {
    await apiClient.post("/pengaduan", {
      nama_pengadu: nama,
      email,
      isi_pengaduan: isi,
    });

    setSuccess(true);
    setNama("");
    setEmail("");
    setIsi("");
  } catch {
    alert("Gagal mengirim pengaduan");
  } finally {
    setLoading(false);
  }
};


  const fetchPengaduan = async () => {
    const res = await apiClient.get("/pengaduan");
    setListPengaduan(res.data.data);
    setShowModal(true);
  };

  return (
    <section style={{ padding: "20px 20px" }}>
      <h2>Pengaduan Masyarakat</h2>
      <p>Sampaikan keluhan atau aspirasi Anda kepada Pemerintah Desa Sumbersari.</p>

      {!token ? (
        <p style={{ color: "red" }}>
          ⚠️ Silakan <Link to="/login">login</Link> terlebih dahulu untuk mengirim
          pengaduan.
        </p>
      ) : (
        <>
          {/* ===== FORM CONTAINER ===== */}
          <form onSubmit={handleSubmit} style={formWrapper}>
            <div style={formGroup}>
              <label><b>Nama Pengadu</b></label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div style={formGroup}>
              <label><b>Email</b></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={formGroup}>
              <label> <b>Isi Pengaduan</b></label>
              <textarea
                rows="4"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                required
              />
            </div>

            <div style={{ width: "100%" }}>
              <button style={submitBtn}>
                📩 Kirim Pengaduan
              </button>
            </div>

          </form>

          {loading && (
            <div style={progressWrapper}>
              <div style={progressBar}></div>
            </div>
          )}



          {success && (
            <div style={{ marginTop: 15, display: "flex", gap: 15 }}>
              <span style={{ color: "green" }}>
                ✅ Pengaduan berhasil dikirim
              </span>
              <button onClick={fetchPengaduan} style={linkBtn}>
                Lihat semua pengaduan →
              </button>
            </div>
          )}
        </>
      )}

      {/* ===== MODAL ===== */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>Daftar Pengaduan</h3>

            {listPengaduan.map((p) => (
              <div key={p.id} style={modalItem}>
                <strong>{p.nama_pengadu}</strong>
                <p>{p.isi_pengaduan}</p>
                <small>{p.email}</small>
              </div>
            ))}

            <button onClick={() => setShowModal(false)}>Tutup</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= STYLE ================= */

const pageWrapper = {
  background: "#79bbf5ff",
  minHeight: "100vh",
  padding: "60px 20px",
  display: "flex",
  justifyContent: "center",
};

const formWrapper = {
  maxWidth: "280px",        // 🔑 lebih lebar
  width: "100%",            // responsif
  margin: "20px auto 0",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start", // 🔑 rata kiri
  marginBottom: "12px",
  width: "100%",
};

const submitBtn = {
  marginTop: "10px",
  padding: "12px 18px",
  backgroundColor: "#0f766e",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",               
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#0f766e",
  cursor: "pointer",
  fontWeight: "bold",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "500px",
};

const modalItem = {
  borderBottom: "1px solid #ddd",
  paddingBottom: "8px",
  marginBottom: "10px",
};

const progressWrapper = {
  marginTop: "12px",
  width: "100%",
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "6px",
  overflow: "hidden",
};

const progressBar = {
  width: "100%",
  height: "100%",
  background: "#0f766e",
  animation: "loading 1.2s infinite",
};
