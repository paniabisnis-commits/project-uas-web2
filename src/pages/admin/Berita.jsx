import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "../../styles/admin.css";

export default function AdminBerita() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [berita, setBerita] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Modal Edit
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    title: "",
    content: "",
    image: null,
    imagePreview: null,
  });

  // Fetch semua berita
  const fetchBerita = async () => {
    try {
      const res = await apiClient.get("/admin/berita");
      setBerita(res.data.data || []);
    } catch (err) {
      console.error(err);
      showNotification("Gagal memuat berita", "error");
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // Notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 4000);
  };

  // Handle image preview tambah berita
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      showNotification("Semua field wajib diisi", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await apiClient.post("/berita", formData, { headers: { "Content-Type": "multipart/form-data" } });
      showNotification("Berita berhasil ditambahkan", "success");
      resetForm();
      fetchBerita();
    } catch (err) {
      console.error(err);
      showNotification("Gagal menambahkan berita", "error");
    }
  };

  // Open modal edit
  const openEditModal = (b) => {
    setEditData({
      id: b.id,
      title: b.title,
      content: b.content,
      image: null,
      imagePreview: b.image ? `http://127.0.0.1:8000/storage/${b.image}` : null,
    });
    setShowModal(true);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditData((prev) => ({
      ...prev,
      image: file,
      imagePreview: file ? URL.createObjectURL(file) : prev.imagePreview,
    }));
  };

  const handleUpdate = async () => {
    if (!editData.title || !editData.content) {
      showNotification("Judul dan isi wajib diisi", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("content", editData.content);
    if (editData.image) formData.append("image", editData.image);

    try {
      await apiClient.post(`/berita/${editData.id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showNotification("Berita berhasil diperbarui", "success");
      setShowModal(false);
      fetchBerita();
    } catch (err) {
      console.error(err);
      showNotification("Gagal memperbarui berita", "error");
    }
  };

  const handleDeleteClick = (id) => {
  setNotification({ show: false, message: "", type: "" });
  setDeleteId(id);
  setShowConfirm(true);
};


const confirmDelete = async () => {
  try {
    await apiClient.delete(`/berita/${deleteId}`);
    showNotification("Berita berhasil dihapus", "success");
    fetchBerita();
  } catch {
    showNotification("Gagal menghapus berita", "error");
  } finally {
    setShowConfirm(false);
    setDeleteId(null);
  }
};


  const truncateContent = (text, len = 100) =>
    text.length > len ? text.substring(0, len) + "..." : text;

  return (
    <div className="admin-container">
      {notification.show && (
        <div className={`alert alert-${notification.type}`}>{notification.message}</div>
      )}
{showConfirm && (
  <div className="alert alert-confirm slide-down">
    <div className="alert-confirm-inner">

      <div className="alert-text">
        <strong>Hapus data ini?</strong>
        <small>Data yang dihapus tidak dapat dikembalikan</small>
      </div>

      <div className="alert-actions">
        <button className="btn btn-confirm" onClick={confirmDelete}>
          OK
        </button>
        <button
          className="btn btn-cancel"
          onClick={() => setShowConfirm(false)}
        >
          Batal
        </button>
      </div>
    </div>
  </div>
)}

      <h2 className="admin-title">Manajemen Berita <br />Desa Sumbersari</h2>

      {/* Form Tambah Berita */}
<div className="form-card full-width">
  <h4>Tambah Berita Baru</h4>
  <div className="form-add-berita">
    <input
      type="text"
      placeholder="Judul Berita"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="field-judul"
    />
    <textarea
      placeholder="Isi Berita"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    <input type="file" onChange={handleImageChange} className="field-gambar" />
    {imagePreview && <img src={imagePreview} className="thumb-preview" alt="Preview" />}
    <button className="btn btn-submit btn-full" onClick={handleSubmit}>
      Tambah Berita
    </button>
  </div>
</div>

        

      {/* Table Berita */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Gambar</th>
            <th>Judul</th>
            <th>Isi Berita</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {berita.map((b, i) => (
            <tr key={b.id}>
              <td>{i + 1}</td>
              <td>{b.image ? <img src={`http://127.0.0.1:8000/storage/${b.image}`} className="thumb" /> : "–"}</td>
              <td>{b.title}</td>
              <td>{truncateContent(b.content, 80)}</td>
              <td className="aksi">
                <div className="action-group">
                  <button className="icon-btn edit" onClick={() => openEditModal(b)} title="Edit Berita">
                    <svg viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25z"/>
                      <path d="M20.7 7.04a1 1 0 000-1.41L18.37 3.3a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.82-1.84z"/>
                    </svg>
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDeleteClick(b.id)}
                      title="Hapus Berita">
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

      {/* Modal Edit Berita */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)}>✖</button>
            <h3>Edit Berita</h3>
            <input type="text" placeholder="Judul Berita" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
            <textarea placeholder="Isi Berita" value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} />
            <input type="file" onChange={handleEditImageChange} />
            {editData.imagePreview && <img src={editData.imagePreview} className="thumb-preview" alt="Preview" />}
            <div className="btn-group right">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn btn-success" onClick={handleUpdate}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
