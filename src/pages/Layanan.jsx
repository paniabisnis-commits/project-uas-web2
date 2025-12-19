import { useState, useEffect } from "react";
import "./Layanan.css";

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/layanan")
    .then((res) => res.json())
    .then((data) => {
      console.log("RESPONSE API:", data); 
      setLayanan(data.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("ERROR FETCH:", err);
      setLoading(false);
    });
}, []);


  return (
    <section className="layanan-page">
      <h1 className="page-title">Layanan Publik Desa Sumbersari</h1>
      <p className="page-subtitle">
        Berikut adalah seluruh layanan publik yang tersedia di Desa Sumbersari
      </p>

      {loading && <p>Memuat layanan...</p>}

      <div className="layanan-grid">
        {layanan.map((l) => (
          <div key={l.id} className="layanan-card">
            {l.gambar && (
              <img
                src={`http://127.0.0.1:8000/storage/${l.gambar}`}
                alt={l.nama_layanan}
              />
            )}

            <h3>{l.nama_layanan}</h3>
            <p>{l.deskripsi}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
