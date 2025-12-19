import { useState } from "react";

export default function Pengaduan() {
  const [form, setForm] = useState({
    nama_pengadu: "",
    email: "",
    isi_pengaduan: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/pengaduan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Pengaduan berhasil dikirim");
    setForm({ nama_pengadu: "", email: "", isi_pengaduan: "" });
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Nama"
        value={form.nama_pengadu}
        onChange={e => setForm({ ...form, nama_pengadu: e.target.value })}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Isi Pengaduan"
        value={form.isi_pengaduan}
        onChange={e => setForm({ ...form, isi_pengaduan: e.target.value })}
      />

      <button type="submit">Kirim</button>
    </form>
  );
}