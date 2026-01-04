import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AdminLayanan() {
  const [layanan, setLayanan] = useState([]);
  const [nama, setNama] = useState("");

  const fetchData = () => {
    apiClient.get("/admin/layanan")
      .then(res => setLayanan(res.data.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    await apiClient.post("/admin/layanan", { nama_layanan: nama });
    setNama("");
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus layanan?")) return;
    await apiClient.delete(`/admin/layanan/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manajemen Layanan</h2>

      {/* CREATE */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={nama}
          onChange={e => setNama(e.target.value)}
          placeholder="Nama layanan"
        />
        <button onClick={handleCreate}>Tambah</button>
      </div>

      {/* LIST */}
      <ul>
        {layanan.map(l => (
          <li key={l.id} style={item}>
            {l.nama_layanan}
            <button onClick={() => handleDelete(l.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const item = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
};
