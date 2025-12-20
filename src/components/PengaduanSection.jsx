import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function PengaduanSection() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    nama_pengadu: "",
    email: "",
    isi_pengaduan: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await apiClient.post("/pengaduan", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Pengaduan berhasil dikirim.");
      setForm({ nama_pengadu: "", email: "", isi_pengaduan: "" });
    } catch {
      setError("Gagal mengirim pengaduan.");
    }
  };

  return (
    <section style={sectionStyle}>
      <h2 style={{ textAlign: "left" }}>Pengaduan Masyarakat</h2>

      <p style={{ marginBottom: 20, textAlign: "left" }}>
        Sampaikan laporan, saran, atau keluhan terkait pelayanan dan fasilitas
        Desa Sumbersari melalui form berikut.
      </p>

      {/* ===== BELUM LOGIN ===== */}
      {!token ? (
        <div style={warningBox}>
          ⚠️ Silakan{" "}
          <Link to="/login" style={loginLink}>
            login terlebih dahulu
          </Link>{" "}
          untuk mengirim pengaduan.
        </div>
      ) : (
        /* ===== FORM ===== */
        <form onSubmit={handleSubmit} style={formStyle}>
          {success && <p style={successText}>{success}</p>}
          {error && <p style={errorText}>{error}</p>}

          <div style={field}>
            <label>Nama Pengadu</label>
            <input
              type="text"
              name="nama_pengadu"
              value={form.nama_pengadu}
              onChange={handleChange}
              required
            />
          </div>

          <div style={field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={field}>
            <label>Isi Pengaduan</label>
            <textarea
              name="isi_pengaduan"
              rows="4"
              value={form.isi_pengaduan}
              onChange={handleChange}
              required
            />
          </div>

          {/* 🔑 BUTTON RATA KIRI */}
          <button type="submit" style={submitBtn}>
            Kirim Pengaduan
          </button>
        </form>
      )}
    </section>
  );
}

/* ================= STYLE ================= */

const sectionStyle = {
  padding: "60px 20px",
  background: "#f1f5f9",
};

const warningBox = {
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
};

const loginLink = {
  color: "#0f766e",
  fontWeight: "bold",
  textDecoration: "none",
};

const formStyle = {
  maxWidth: "600px",
  background: "#ffffff",
  padding: "30px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  textAlign: "left", // 🔑 KUNCI UTAMA
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
  alignItems: "flex-start", // 🔑 BIKIN LABEL + INPUT KE KIRI
};

const submitBtn = {
  padding: "12px 24px",
  background: "#0f766e",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const successText = { color: "green" };
const errorText = { color: "red" };
