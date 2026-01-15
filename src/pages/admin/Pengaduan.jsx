import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function Pengaduan() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // Ambil data pengaduan
  // ===============================
  const fetchComplaints = async () => {
    try {
      const res = await apiClient.get("/admin/pengaduan");
      setComplaints(res.data.data);
    } catch (err) {
      setError("Gagal mengambil data pengaduan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ===============================
  // Update status pengaduan
  // ===============================
  const updateStatus = async (id, status) => {
    try {
      await apiClient.put(`/admin/pengaduan/${id}/status`, {
        status,
      });

      // update state tanpa reload
      setComplaints((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={wrapper}>
      <h2 style={title}>📩 Daftar Pengaduan Masyarakat</h2>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Isi Pengaduan</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Tidak ada pengaduan
                </td>
              </tr>
            ) : (
              complaints.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama_pengadu}</td>
                  <td>{item.email}</td>
                  <td>{item.isi_pengaduan}</td>
                  <td>
                    <span style={statusBadge(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(item.id, e.target.value)
                      }
                      style={select}
                    >
                      <option value="baru">Baru</option>
                      <option value="diproses">Diproses</option>
                      <option value="selesai">Selesai</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const wrapper = {
  padding: "20px",
};

const title = {
  marginBottom: "20px",
  color: "#064e3b",
};

const tableWrapper = {
  overflowX: "auto",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const select = {
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const statusBadge = (status) => ({
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#fff",
  background:
    status === "baru"
      ? "#2563eb"
      : status === "diproses"
      ? "#f59e0b"
      : "#16a34a",
});
