import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./BeritaDetail.css";

export default function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/berita/slug/${slug}`)
      .then(res => {
        setBerita(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!berita) return <p>Berita tidak ditemukan</p>;

  return (
  <div className="berita-detail-wrapper">
    <article className="berita-detail">
      <header className="berita-detail-header">
        <h1>{berita.title}</h1>
        <p className="tanggal">
          {new Date(berita.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      {berita.image && (
        <div className="berita-detail-image">
          <img
            src={`http://127.0.0.1:8000/storage/${berita.image}`}
            alt={berita.title}
          />
        </div>
      )}

      <section className="berita-detail-content">
        {berita.content}
      </section>
    </article>
  </div>
);

}
