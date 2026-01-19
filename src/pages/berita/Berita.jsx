import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Berita.css";

export default function Berita() {
  const [showHeroText, setShowHeroText] = useState(false);
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
  "/images/desa1.jpg",
  "/images/desa2.jpg",
  "/images/desa3.jpg",
];
  useEffect(() => {
    fetch("https://backendpemerintah.24tia6.com/api/berita")
      .then((res) => res.json())
      .then((data) => setBerita(data.data))
      .catch((err) => console.error("ERROR FETCH:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const timeout = setTimeout(() => setShowHeroText(true), 300);
  return () => clearTimeout(timeout);
}, []);


  return (
    <>
      <header
  className="berita-hero"
  style={{
    backgroundImage: `url(${sliderImages[currentSlide]})`,
  }}
>
  <div className="berita-hero-overlay">
    <h1
      style={{
        opacity: showHeroText ? 1 : 0,
        transform: showHeroText ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease-out",
      }}
    >
      Berita
    </h1>

    <p
      style={{
        opacity: showHeroText ? 1 : 0,
        transform: showHeroText ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s ease-out",
        transitionDelay: "0.2s",
      }}
    >
      Informasi terbaru seputar Desa Sumbersari
    </p>
  </div>
</header>


      <section className="berita-page">
        {loading && <p>Memuat berita...</p>}

        <div className="berita-grid">
{Array.isArray(berita) && berita.map((item) => (

    <article className="berita-card" key={item.id}>
      <div className="berita-image">
        {item.image ? (
          <img
            src={
              item.image.startsWith("http")
                ? item.image
                : `https://backendpemerintah.24tia6.com/storage/${item.image}`
            }
            alt={item.title}
          />
        ) : (
          <span className="berita-placeholder">📰</span>
        )}
      </div>
      <div className="berita-content">
        <small className="berita-date">
          {item.created_at
            ? new Date(item.created_at).toLocaleDateString("id-ID")
            : "-"}
        </small>

        <h3 className="berita-title">{item.title}</h3>

        <p className="berita-excerpt">
          {item.content
            ? item.content.replace(/<[^>]+>/g, "").slice(0, 140) + "..."
            : ""}
        </p>
        {item.slug && (
          <Link to={`/berita/${item.slug}`} className="berita-readmore">
          Baca Selengkapnya →
        </Link>

)}

      </div>
    </article>
  ))}
</div>

      </section>
    </>
  );
}
