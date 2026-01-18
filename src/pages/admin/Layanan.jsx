import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "../../styles/admin.css";


export default function AdminLayanan() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [layanan, setLayanan] = useState([]);

  // CREATE
  const [kategori, setKategori] = useState("");
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // MODAL EDIT
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    kategori: "",
    nama_layanan: "",
    deskripsi: "",
    gambar: null,
  });

  const fetchData = async () => {
    const res = await apiClient.get("/layanan");
    setLayanan(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
  if (errorMsg || successMsg) {
    const timer = setTimeout(() => {
      setErrorMsg("");
      setSuccessMsg("");
    }, 5000);

    return () => clearTimeout(timer);
  }
}, [errorMsg, successMsg]);


  // CREATE
  const handleCreate = async () => {
    if (!kategori || !nama || !deskripsi || !gambar) {
  setErrorMsg("Semua field wajib diisi");

  return;
}
    const formData = new FormData();
    formData.append("kategori", kategori);
    formData.append("nama_layanan", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("gambar", gambar);

    await apiClient.post("/layanan", formData);
      setSuccessMsg("Layanan berhasil ditambahkan");
      setKategori("");
      setNama("");
      setDeskripsi("");
      setGambar(null);
      setErrorMsg("");

      fetchData();
        };

  // OPEN MODAL
  const openEditModal = (l) => {
    setEditId(l.id);
    setEditData({
      kategori: l.kategori,
      nama_layanan: l.nama_layanan,
      deskripsi: l.deskripsi,
      gambar: null,
    });
    setShowModal(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("kategori", editData.kategori);
    formData.append("nama_layanan", editData.nama_layanan);
    formData.append("deskripsi", editData.deskripsi);

    if (editData.gambar) {
      formData.append("gambar", editData.gambar);
    }

    await apiClient.post(`/layanan/${editId}?_method=PUT`, formData);
    setSuccessMsg("Layanan berhasil diperbarui");
    setShowModal(false);
    fetchData();
  };

  const handleDelete = (id) => {
  setDeleteId(id);
  setShowDeleteConfirm(true);
};
const confirmDelete = async () => {
  await apiClient.delete(`/layanan/${deleteId}`);

  setSuccessMsg("Layanan berhasil dihapus");

  setShowDeleteConfirm(false);
  setDeleteId(null);
  fetchData();
};

const cancelDelete = () => {
  setShowDeleteConfirm(false);
  setDeleteId(null);
};


  return (
    <div className="admin-container">
        {errorMsg && (
  <div className="alert alert-error slide-down">
    ⚠️ {errorMsg}
  </div>
)}
{successMsg && (
  <div className="alert alert-success slide-down fade-out">
    ✅ {successMsg}
  </div>
)}
{showDeleteConfirm && (
  <div className="alert alert-confirm slide-down">
    <div className="alert-confirm-inner">
      <div className="alert-text">
        <strong>Hapus layanan ini?</strong>
        <small>Data yang dihapus tidak dapat dikembalikan</small>
      </div>

      <div className="alert-actions">
        <button className="btn btn-confirm" onClick={confirmDelete}>
          OK
        </button>
        <button className="btn btn-cancel" onClick={cancelDelete}>
          Batal
        </button>
      </div>
    </div>
  </div>
)}

      <h2 className="admin-title">Manajemen Layanan 
        <br />Desa Sumbersari</h2>

      <div className="form-card full-width">
        <h4>Tambah Layanan Baru</h4>

        <div className="form-grid">
          <input
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            placeholder="Kategori"
          />
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Layanan"
          />
        </div>

        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi Layanan"
        />

        <input type="file" onChange={(e) => setGambar(e.target.files[0])} />

        <div className="btn-center">
        <button className="btn btn-submit" onClick={handleCreate}>
          Tambah Layanan
        </button>

</div>

      </div>

      {/* ===== TABLE ===== */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Gambar</th>
            <th>Kategori</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {layanan.map((l, i) => (
            <tr key={l.id}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000/storage/${l.gambar}`}
                  className="thumb"
                />
              </td>
              <td>{l.kategori}</td>
              <td>{l.nama_layanan}</td>
              <td>{l.deskripsi}</td>
              <td className="aksi">
                <div className="action-group">
    <button
  className="icon-btn edit"
  onClick={() => openEditModal(l)}
  title="Edit Layanan"
>
      {/* ICON EDIT */}
      <svg viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25z"/>
        <path d="M20.7 7.04a1 1 0 000-1.41L18.37 3.3a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.82-1.84z"/>
      </svg>
    </button>

    <button
      className="icon-btn delete"
      onClick={() => handleDelete(l.id)}
      title="Hapus Layanan"
    >
      {/* ICON HAPUS */}
      <svg viewBox="0 0 24 24">
        <path d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 14H5L4 7z"/>
        <path d="M9 4h6l1 2H8l1-2z"/>
      </svg>
    </button>
  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== MODAL EDIT ===== */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              {/* SVG CLOSE */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.3 5.71L12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z"
                />
              </svg>
            </button>

            <h3>Edit Layanan</h3>

            <input
              value={editData.kategori}
              onChange={(e) =>
                setEditData({ ...editData, kategori: e.target.value })
              }
              placeholder="Kategori"
            />

            <input
              value={editData.nama_layanan}
              onChange={(e) =>
                setEditData({ ...editData, nama_layanan: e.target.value })
              }
              placeholder="Nama Layanan"
            />

            <textarea
              value={editData.deskripsi}
              onChange={(e) =>
                setEditData({ ...editData, deskripsi: e.target.value })
              }
              placeholder="Deskripsi"
            />

            <input
              type="file"
              onChange={(e) =>
                setEditData({ ...editData, gambar: e.target.files[0] })
              }
            />

            <div className="btn-group right">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="btn btn-success" onClick={handleUpdate}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

