import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AdminBerita() {
  const [berita, setBerita] = useState([]);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchBerita = async () => {
    const res = await apiClient.get("/admin/berita");
    setBerita(res.data.data);
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("isi", isi);
    if (gambar) formData.append("gambar", gambar);

    if (editingId) {
      await apiClient.post(`/admin/berita/${editingId}?_method=PUT`, formData);
    } else {
      await apiClient.post("/admin/berita", formData);
    }

    resetForm();
    fetchBerita();
  };

  const handleEdit = (b) => {
    setEditingId(b.id);
    setJudul(b.judul);
    setIsi(b.isi);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus berita ini?")) return;
    await apiClient.delete(`/admin/berita/${id}`);
    fetchBerita();
  };

  const resetForm = () => {
    setJudul("");
    setIsi("");
    setGambar(null);
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      <h2>Manajemen Berita</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Judul Berita"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />

        <textarea
          placeholder="Isi Berita"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          rows={5}
          required
        />

        <input type="file" onChange={(e) => setGambar(e.target.files[0])} />

        <button type="submit">
          {editingId ? "Update" : "Tambah"}
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {berita.map((b) => (
            <tr key={b.id}>
              <td>{b.judul}</td>
              <td>
                <button onClick={() => handleEdit(b)}>Edit</button>
                <button onClick={() => handleDelete(b.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
