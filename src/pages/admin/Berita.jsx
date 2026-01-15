import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "./AdminBerita.css"; 

export default function AdminBerita() {
  const [berita, setBerita] = useState([]);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Fetch berita dari API
  const fetchBerita = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/admin/berita");
      if (res.data && res.data.data) {
        setBerita(res.data.data);
      } else {
        setBerita([]);
        showNotification("Data berita tidak ditemukan", "warning");
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
      showNotification("Gagal mengambil data berita", "error");
      setBerita([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // Menampilkan notifikasi
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 4000);
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData();
    formData.append("judul", judul.trim());
    formData.append("isi", isi.trim());
    if (gambar) formData.append("gambar", gambar);

    try {
      if (editingId) {
        await apiClient.post(`/admin/berita/${editingId}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("Berita berhasil diperbarui", "success");
      } else {
        await apiClient.post("/admin/berita", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showNotification("Berita berhasil ditambahkan", "success");
      }

      resetForm();
      fetchBerita();
    } catch (error) {
      console.error("Error saving berita:", error);
      showNotification(
        editingId ? "Gagal memperbarui berita" : "Gagal menambahkan berita",
        "error"
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit berita
  const handleEdit = (b) => {
    setEditingId(b.id);
    setJudul(b.judul);
    setIsi(b.isi);
    setGambarPreview(b.gambar_url || null);
    setGambar(null);
    
    // Scroll ke form
    document.getElementById("form-berita").scrollIntoView({ behavior: "smooth" });
  };

  // Handle delete berita
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    
    try {
      await apiClient.delete(`/admin/berita/${id}`);
      showNotification("Berita berhasil dihapus", "success");
      fetchBerita();
    } catch (error) {
      console.error("Error deleting berita:", error);
      showNotification("Gagal menghapus berita", "error");
    }
  };

  // Handle gambar preview
  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
      const previewUrl = URL.createObjectURL(file);
      setGambarPreview(previewUrl);
    }
  };

  // Reset form
  const resetForm = () => {
    setJudul("");
    setIsi("");
    setGambar(null);
    setGambarPreview(null);
    setEditingId(null);
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // Filter dan sort berita
  const filteredBerita = berita
    .filter((b) => 
      b.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isi.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "terbaru") {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      } else if (sortBy === "terlama") {
        return new Date(a.created_at || 0) - new Date(b.created_at || 0);
      } else {
        return a.judul.localeCompare(b.judul);
      }
    });

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="admin-berita-container">
      {/* Notifikasi */}
      {notification.show && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
          <button className="notification-close" onClick={() => setNotification({ show: false, message: "", type: "" })}>
            &times;
          </button>
        </div>
      )}

      <div className="admin-header">
        <h1 className="page-title">Manajemen Berita</h1>
        <p className="page-subtitle">Kelola berita website Anda di sini</p>
      </div>

      {/* Form untuk tambah/edit berita */}
      <div className="form-section" id="form-berita">
        <div className="section-header">
          <h2>{editingId ? "Edit Berita" : "Tambah Berita Baru"}</h2>
          {editingId && (
            <button className="btn-secondary" onClick={resetForm}>
              Batalkan Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="berita-form">
          <div className="form-group">
            <label htmlFor="judul">Judul Berita *</label>
            <input
              id="judul"
              type="text"
              placeholder="Masukkan judul berita"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              maxLength={200}
            />
            <div className="char-count">{judul.length}/200 karakter</div>
          </div>

          <div className="form-group">
            <label htmlFor="isi">Isi Berita *</label>
            <textarea
              id="isi"
              placeholder="Masukkan isi berita"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              rows={8}
              required
            />
            <div className="char-count">{isi.length} karakter</div>
          </div>

          <div className="form-group">
            <label htmlFor="gambar">Gambar Berita {!editingId && "*"}</label>
            <input
              id="gambar"
              type="file"
              accept="image/*"
              onChange={handleGambarChange}
              required={!editingId && !gambarPreview}
            />
            <p className="file-info">Format yang didukung: JPG, PNG, GIF. Maksimum 5MB.</p>
            
            {gambarPreview && (
              <div className="image-preview">
                <p>Preview:</p>
                <img src={gambarPreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={formLoading}
            >
              {formLoading ? (
                <span className="loading-spinner"></span>
              ) : editingId ? (
                "Perbarui Berita"
              ) : (
                "Simpan Berita"
              )}
            </button>
            
            <button 
              type="button" 
              className="btn-outline" 
              onClick={resetForm}
              disabled={formLoading}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>

      {/* Daftar berita */}
      <div className="berita-list-section">
        <div className="section-header">
          <h2>Daftar Berita ({filteredBerita.length})</h2>
          
          <div className="list-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="sort-control">
              <label htmlFor="sort">Urutkan:</label>
              <select 
                id="sort" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
                <option value="judul">Judul (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>Memuat data berita...</p>
          </div>
        ) : filteredBerita.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📰</div>
            <h3>Tidak ada berita ditemukan</h3>
            <p>{searchTerm ? "Coba dengan kata kunci lain" : "Mulai dengan menambahkan berita pertama Anda"}</p>
          </div>
        ) : (
          <div className="berita-grid">
            {filteredBerita.map((b) => (
              <div className="berita-card" key={b.id}>
                <div className="berita-card-header">
                  {b.gambar_url && (
                    <div className="berita-image">
                      <img src={b.gambar_url} alt={b.judul} />
                    </div>
                  )}
                  <div className="berita-meta">
                    <span className="berita-date">{formatDate(b.created_at)}</span>
                    {b.updated_at && b.updated_at !== b.created_at && (
                      <span className="berita-updated">(diedit)</span>
                    )}
                  </div>
                </div>
                
                <div className="berita-card-body">
                  <h3 className="berita-title">{b.judul}</h3>
                  <p className="berita-excerpt">
                    {b.isi.length > 150 ? `${b.isi.substring(0, 150)}...` : b.isi}
                  </p>
                </div>
                
                <div className="berita-card-footer">
                  <button 
                    className="btn-action edit"
                    onClick={() => handleEdit(b)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn-action delete"
                    onClick={() => handleDelete(b.id)}
                  >
                    🗑️ Hapus
                  </button>
                  <div className="berita-id">ID: {b.id}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="admin-footer">
        <p>
          <strong>Total Berita:</strong> {berita.length} | 
          <strong> Sedang diedit:</strong> {editingId ? "Ya" : "Tidak"} | 
          <strong> Ditampilkan:</strong> {filteredBerita.length}
        </p>
        <p className="footer-note">
          ⓘ Semua perubahan yang dilakukan akan langsung tersimpan di database.
        </p>
      </div>
    </div>
  );
}