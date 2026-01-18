import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AdminEvent() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    const res = await apiClient.get("/events");
    setEvents(res.data.data);
  };

  useEffect(() => {
    fetchEvents();
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


  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleCreate = async () => {
  if (!title || !eventDate || !description) {
    setErrorMsg("Semua field wajib diisi");
    return;
  }

  await apiClient.post("/events", {
    title,
    event_date: eventDate,
    description,
  });

  setSuccessMsg("Event berhasil ditambahkan");

  resetForm();
  fetchEvents();
};


  const openEditModal = (event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(event.event_date);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      event_date: eventDate,
    };

    if (editingId) {
  await apiClient.put(`/events/${editingId}`, payload);
  setSuccessMsg("Event berhasil diperbarui");
} else {
  await apiClient.post("/events", payload);
  setSuccessMsg("Event berhasil ditambahkan");
}

fetchEvents();
setShowModal(false);
resetForm();
  };

 const handleDeleteClick = (id) => {
  setDeleteId(id);
  setShowConfirm(true);
};

const confirmDelete = async () => {
  await apiClient.delete(`/events/${deleteId}`);
  setSuccessMsg("Event berhasil dihapus");
  fetchEvents();
  setShowConfirm(false);
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

      <h2 className="admin-title">Manajemen Event <br /> Desa Sumbersari</h2>
       <div className="form-card full-width">
        <h4>Tambah Event Baru</h4>

        <div className="form-grid">
          <input
            placeholder="Judul Event"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Deskripsi Event"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="btn-center">
          <button
            className="btn btn-submit"
            onClick={handleCreate}
          >
            Tambah Event
          </button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Judul</th>
            <th>Tanggal</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={e.id}>
              <td>{i + 1}</td>
              <td className="event-title">{e.title}</td>
              <td className="event-date">{e.event_date}</td>
              <td>{e.description}</td>
              <td>
                <div className="action-group">
                  {/* EDIT */}
                  <button
                    className="icon-btn edit"
                    onClick={() => openEditModal(e)}
                    title="Edit Event"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25z"/>
                      <path d="M20.7 7.04a1 1 0 000-1.41L18.37 3.3a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.82-1.84z"/>
                    </svg>
                  </button>

                  {/* DELETE */}
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDeleteClick(e.id)}
                    title="Hapus Event"
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
        </tbody>
      </table>

      {/* ===== MODAL ===== */}
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

            <h3>{editingId ? "Edit Event" : "Tambah Event"}</h3>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Judul Event"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Deskripsi Event"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />

              <div className="btn-group right">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-success">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}