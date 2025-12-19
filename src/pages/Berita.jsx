import { useEffect, useState } from "react";
import "./Berita.css";

export default function Berita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/berita")
      .then((res) => res.json())
      .then((data) => setBerita(data.data))
      .finally(() => setLoading(false))
      .catch((err) => console.error("ERROR FETCH:", err));
  }, []);

  return (
    <section className="berita-page">
      <header className="berita-header">
        <h1>Berita</h1>
        <p>Informasi terbaru seputar Desa Sumbersari</p>
      </header>
      {loading && <p>Memuat berita...</p>}
      <div className="berita-grid">
        {berita.map((item) => (
          <article className="berita-card" key={item.id}>
            {/* Gambar */}
            <div className="berita-image">
              {/* Jika sudah ada gambar dari backend */}
              {/* 
              <img
                src={`http://127.0.0.1:8000/storage/${item.gambar}`}
                alt={item.judul}
              />
              */}
              <span className="berita-placeholder">📰</span>
            </div>

            {/* Konten */}
            <div className="berita-content">
              <small className="berita-date">
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString("id-ID")
                  : "-"}
              </small>


              <h3 className="berita-title">{item.judul}</h3>

              <p className="berita-excerpt">
                {item.isi ? item.isi.slice(0, 140) : ""}
              </p>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
