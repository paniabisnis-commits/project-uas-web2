import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "../../styles/admin.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // MODAL EDIT USER
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // FETCH DATA
  const fetchUsers = async () => {
    try {
      const res = await apiClient.get("/admin/users");
      setUsers(res.data.data);
    } catch (err) {
      setErrorMsg("Gagal memuat data pengguna");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  // OPEN MODAL
  const openEditModal = (user) => {
    setEditId(user.id);
    setEditData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowModal(true);
  };

  // UPDATE USER
  const handleUpdate = async () => {
    try {
      await apiClient.post(`/admin/users/${editId}?_method=PUT`, editData);
      setSuccessMsg("Data pengguna berhasil diperbarui");
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setErrorMsg("Gagal memperbarui pengguna");
      console.error(err);
    }
  };

  // DELETE USER
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/admin/users/${deleteId}`);
      setSuccessMsg("Pengguna berhasil dihapus");
      setShowDeleteConfirm(false);
      setDeleteId(null);
      fetchUsers();
    } catch (err) {
      setErrorMsg("Gagal menghapus pengguna");
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="admin-container admin-event">
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
              <strong>Hapus pengguna ini?</strong>
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

      <h2 className="admin-title">Manajemen Pengguna</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="aksi">
                <div className="action-group">
                  <button
                    className="icon-btn edit"
                    onClick={() => openEditModal(user)}
                    title="Edit Pengguna"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25z"/>
                      <path d="M20.7 7.04a1 1 0 000-1.41L18.37 3.3a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.82-1.84z"/>
                    </svg>
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(user.id)}
                    title="Hapus Pengguna"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 14H5L4 7z"/>
                      <path d="M9 4h6l1 2H8l1-2z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "16px" }}>
                Belum ada data pengguna
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL EDIT USER */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.3 5.71L12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z"
                />
              </svg>
            </button>

            <h3>Edit Pengguna</h3>

            <input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="Nama"
            />

            <input
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              placeholder="Email"
            />

            <select
              value={editData.role}
              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

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
