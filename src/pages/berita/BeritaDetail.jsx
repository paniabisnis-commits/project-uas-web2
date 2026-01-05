import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BeritaDetail.css";

export default function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/berita/${slug}`)
      .then((res) => res.json())
      .then((data) => setBerita(data))
      .catch(() => setBerita(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p style={{ textAlign: "center" }}>Memuat berita...</p>;
  if (!berita) return <p style={{ textAlign: "center" }}>Berita tidak ditemukan</p>;

  return (
    <section className="berita-detail">
      <div className="berita-detail-container">
        <h1 className="berita-detail-title">{berita.title}</h1>

        <small className="berita-detail-date">
          {new Date(berita.created_at).toLocaleDateString("id-ID")}
        </small>

        {berita.image && (
          <img
            src={`http://127.0.0.1:8000/storage/${berita.image}`}
            alt={berita.title}
            className="berita-detail-image"
          />
        )}

        <div
          className="berita-detail-content"
          dangerouslySetInnerHTML={{ __html: berita.content }}
        />
      </div>
    </section>
  );
}
