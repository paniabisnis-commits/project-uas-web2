import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export default function PengaduanSection() {
  const token = localStorage.getItem("token");

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [isi, setIsi] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pengaduanList, setPengaduanList] = useState([]);

  /* ================= AMBIL USER LOGIN ================= */
  useEffect(() => {
    if (!token) return;

    apiClient
      .get("/user")
      .then((res) => {
        setNama(res.data.user.name);
        setEmail(res.data.user.email);
      })
      .catch((err) => console.error("Gagal ambil user", err));
  }, [token]);

  /* ================= AMBIL SEMUA PENGADUAN ================= */
  const fetchPengaduan = async () => {
    try {
      const res = await apiClient.get("/pengaduan");
      setPengaduanList(res.data.data);
    } catch (err) {
      console.error("Gagal ambil pengaduan", err);
    }
  };

  useEffect(() => {
    if (showModal) fetchPengaduan();
  }, [showModal]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await apiClient.post("/pengaduan", {
        isi_pengaduan: isi,
      });

      setSuccess(true);
      setIsi("");
    } catch (err) {
      alert("Gagal mengirim pengaduan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={pageWrapper}>
      <div style={formCard}>
        <h2 style={formTitle}>Pengaduan Masyarakat</h2>
        <p style={{ color: "#6b7280", marginBottom: "40px" }}>
          Sampaikan aspirasi, kritik, atau laporan Anda kepada Pemerintah Desa Sumbersari.</p>

        {!token && (
          <p style={warningText}>
            ⚠ Silakan login terlebih dahulu agar dapat mengirim pengaduan
          </p>
        )}

        <form onSubmit={handleSubmit} style={formWrapper}>
          {/* NAMA */}
          <div style={formGroup}>
            <label style={labelStyle}>Nama Pengadu</label>
            <input
              type="text"
              value={nama}
              readOnly
              style={readonlyInput}
            />
          </div>

          {/* EMAIL */}
          <div style={formGroup}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              readOnly
              style={readonlyInput}
            />
          </div>

          {/* ISI */}
          <div style={formGroup}>
            <label style={labelStyle}>Isi Pengaduan</label>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Jelaskan secara rinci pengaduan Anda"
              style={textareaStyle}
              required
            />
          </div>

          <button style={submitBtn} disabled={loading || !token}>
            📤 Kirim Pengaduan
          </button>

          {/* PROGRESS */}
          {loading && (
            <div style={progressWrapper}>
              <div style={progressBar}></div>
            </div>
          )}

          {/* SUKSES */}
          {success && (
            <div style={successBox}>
              ✅ Pengaduan berhasil dikirim
              <button
                type="button"
                style={linkBtn}
                onClick={() => setShowModal(true)}
              >
                Lihat semua pengaduan
              </button>
            </div>
          )}
        </form>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h4>Daftar Pengaduan</h4>

            {pengaduanList.length === 0 && <p>Belum ada pengaduan</p>}

            {pengaduanList.map((p) => (
              <div key={p.id} style={modalItem}>
                <strong>{p.nama_pengadu}</strong>
                <p>{p.isi_pengaduan}</p>
              </div>
            ))}

            <button style={submitBtn} onClick={() => setShowModal(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= STYLE ================= */

const pageWrapper = {
  padding: "20px 20px",
};

const formCard = {
  maxWidth: "650px",
  margin: "0 auto",
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const formTitle = {
  marginBottom: "20px",
};

const warningText = {
  color: "#b91c1c",
  marginBottom: "15px",
};

const formWrapper = {
  textAlign: "left",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "14px",
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "6px",
};

const readonlyInput = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  background: "#f3f4f6",
};

const textareaStyle = {
  padding: "10px",
  minHeight: "120px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

const submitBtn = {
  marginTop: "10px",
  padding: "12px",
  backgroundColor: "#0f766e",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const successBox = {
  marginTop: "15px",
  color: "#065f46",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkBtn = {
  background: "none",
  border: "none",
  color: "#0f766e",
  cursor: "pointer",
  fontWeight: "bold",
};

const progressWrapper = {
  marginTop: "12px",
  height: "6px",
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
