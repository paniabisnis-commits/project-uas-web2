import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AdminLayanan() {
  const [layanan, setLayanan] = useState([]);
  const [nama, setNama] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");

  const fetchData = async () => {
    const res = await apiClient.get("/admin/layanan");
    setLayanan(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!nama.trim()) return alert("Nama layanan tidak boleh kosong");
    await apiClient.post("/admin/layanan", { nama_layanan: nama });
    setNama("");
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus layanan ini?")) return;
    await apiClient.delete(`/admin/layanan/${id}`);
    fetchData();
  };

  const handleEdit = (id, nama) => {
    setEditId(id);
    setEditNama(nama);
  };

  const handleUpdate = async () => {
    if (!editNama.trim()) return alert("Nama layanan tidak boleh kosong");
    await apiClient.put(`/admin/layanan/${editId}`, { nama_layanan: editNama });
    setEditId(null);
    setEditNama("");
    fetchData();
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditNama("");
  };

  return (
    <div style={container}>
      <h2 style={title}>Manajemen Layanan</h2>

      {/* CREATE */}
      <div style={createWrapper}>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama layanan baru"
          style={input}
        />
        <button onClick={handleCreate} style={addButton}>Tambah Layanan</button>
      </div>

      {/* LIST */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Nama Layanan</th>
            <th style={th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {layanan.map((l, idx) => (
            <tr key={l.id} style={tr}>
              <td style={td}>{idx + 1}</td>
              <td style={td}>
                {editId === l.id ? (
                  <input
                    value={editNama}
                    onChange={(e) => setEditNama(e.target.value)}
                    style={inputEdit}
                  />
                ) : (
                  l.nama_layanan
                )}
              </td>
              <td style={td}>
                {editId === l.id ? (
                  <>
                    <button onClick={handleUpdate} style={saveButton}>Simpan</button>
                    <button onClick={handleCancelEdit} style={cancelButton}>Batal</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(l.id, l.nama_layanan)} style={editButton}>Edit</button>
                    <button onClick={() => handleDelete(l.id)} style={deleteButton}>Hapus</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===== STYLING =====
const container = {
  padding: "30px",
  fontFamily: "Inter, sans-serif",
};

const title = {
  fontSize: "24px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#064e3b",
};

const createWrapper = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const input = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  flex: 1,
};

const addButton = {
  padding: "10px 20px",
  backgroundColor: "#10b981",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "background 0.3s",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const th = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "2px solid #d1d5db",
  backgroundColor: "#f0fdf4",
  color: "#065f46",
};

const tr = {
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "12px",
};

const editButton = {
  padding: "6px 12px",
  marginRight: "5px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const deleteButton = {
  padding: "6px 12px",
  backgroundColor: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const saveButton = {
  padding: "6px 12px",
  marginRight: "5px",
  backgroundColor: "#10b981",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const cancelButton = {
  padding: "6px 12px",
  backgroundColor: "#9ca3af",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const inputEdit = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  width: "100%",
};
