import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "../../styles/admin.css"; 

export default function Pengaduan() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await apiClient.get("/admin/pengaduan");
      setComplaints(res.data.data || []);
    } catch (err) {
      setError("Gagal mengambil data pengaduan");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update status pengaduan
  const updateStatus = async (id, status) => {
    try {
      await apiClient.put(`/admin/pengaduan/${id}/status`, { status });
      setComplaints((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  };

  // Hapus pengaduan
  const handleDelete = async (id, status) => {
    if (status === "selesai") return; // tidak bisa hapus jika sudah selesai
    if (!confirm("Yakin ingin menghapus pengaduan ini?")) return;
    try {
      await apiClient.delete(`/admin/pengaduan/${id}`);
      setComplaints((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus pengaduan");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manajemen Pengaduan Masyarakat <br />Desa Sumbersari</h2>

      {error && <p className="error-text">{error}</p>}

      <div className="form-card full-width">
        <div className="table-wrapper">
          <table className="admin-table">
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
                complaints.map((item, index) => {
                  const isFinished = item.status === "selesai";
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nama_pengadu}</td>
                      <td>{item.email}</td>
                      <td>{item.isi_pengaduan}</td>
                      <td>
                        <span className={`status-badge ${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td>
                        <div className="action-group">
                          <select
                            className="status-select"
                            value={item.status}
                            onChange={(e) =>
                              updateStatus(item.id, e.target.value)
                            }
                            disabled={isFinished} // dinonaktifkan jika sudah selesai
                          >
                            <option value="baru">Baru</option>
                            <option value="diproses">Diproses</option>
                            <option value="selesai">Selesai</option>
                          </select>

                          <button
                            className="icon-btn delete"
                            onClick={() => handleDelete(item.id, item.status)}
                            title="Hapus Pengaduan"
                            disabled={isFinished} // dinonaktifkan jika sudah selesai
                          >
                            <svg viewBox="0 0 24 24">
                              <path d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 14H5L4 7z" />
                              <path d="M9 4h6l1 2H8l1-2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
