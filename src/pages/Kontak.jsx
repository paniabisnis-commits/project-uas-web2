import { useState } from "react";
import { kirimPengaduan } from "../api/pengaduan";

export default function Kontak() {
  const [form, setForm] = useState({
    nama_pengadu: "",
    email: "",
    isi_pengaduan: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await kirimPengaduan(form);
    alert("Pengaduan berhasil dikirim");
    setForm({ nama_pengadu: "", email: "", isi_pengaduan: "" });
  };

  return (
    <section>
      <h1>Kontak & Pengaduan</h1>

      <form onSubmit={submit}>
        <input
          placeholder="Nama"
          value={form.nama_pengadu}
          onChange={(e) =>
            setForm({ ...form, nama_pengadu: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <textarea
          placeholder="Isi Pengaduan"
          value={form.isi_pengaduan}
          onChange={(e) =>
            setForm({ ...form, isi_pengaduan: e.target.value })
          }
        />
        <button>Kirim</button>
      </form>
    </section>
  );
}
