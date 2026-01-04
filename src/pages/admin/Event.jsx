import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AdminEvent() {
  const [events, setEvents] = useState([]);
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    const res = await apiClient.get("/admin/events");
    setEvents(res.data.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { judul, tanggal, lokasi };

    if (editingId) {
      await apiClient.put(`/admin/events/${editingId}`, payload);
    } else {
      await apiClient.post("/admin/events", payload);
    }

    resetForm();
    fetchEvents();
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setJudul(event.judul);
    setTanggal(event.tanggal);
    setLokasi(event.lokasi);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus event ini?")) return;
    await apiClient.delete(`/admin/events/${id}`);
    fetchEvents();
  };

  const resetForm = () => {
    setJudul("");
    setTanggal("");
    setLokasi("");
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      <h2>Manajemen Event</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Judul Event"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
        />
        <input
          placeholder="Lokasi"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          required
        />

        <button type="submit">
          {editingId ? "Update" : "Tambah"}
        </button>
      </form>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Tanggal</th>
            <th>Lokasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>{e.judul}</td>
              <td>{e.tanggal}</td>
              <td>{e.lokasi}</td>
              <td>
                <button onClick={() => handleEdit(e)}>Edit</button>
                <button onClick={() => handleDelete(e.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
