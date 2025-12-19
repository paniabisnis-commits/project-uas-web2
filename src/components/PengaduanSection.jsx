import { useState } from "react";
import { Link } from "react-router-dom";

export default function PengaduanSection() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    nama_pengadu: "",
    email: "",
    isi_pengaduan: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/pengaduan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengirim pengaduan");
      }

      setMessage("Pengaduan berhasil dikirim 🙏");
      setForm({
        nama_pengadu: "",
        email: "",
        isi_pengaduan: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔐 JIKA BELUM LOGIN
  if (!token) {
    return (
      <div style={alertBox}>
        <p>⚠️ Silakan login terlebih dahulu untuk mengirim pengaduan.</p>
        <Link to="/login" style={btnPrimary}>
          Login Sekarang
        </Link>
      </div>
    );
  }

  // ✅ JIKA SUDAH LOGIN
  return (
    <form onSubmit={handleSubmit} style={formBox}>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Nama Pengadu</label>
        <input
          type="text"
          name="nama_pengadu"
          value={form.nama_pengadu}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Isi Pengaduan</label>
        <textarea
          name="isi_pengaduan"
          rows="4"
          value={form.isi_pengaduan}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" style={btnPrimary}>
        Kirim Pengaduan
      </button>
    </form>
  );
}
