import { useEffect, useState } from "react";
import "./KalenderEvent.css";
import { Search } from "lucide-react";

export default function KalenderEvent() {
  const [showHeroText, setShowHeroText] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const sliderImages = [
    "/images/desa1.jpg",
    "/images/desa2.jpg",
    "/images/desa3.jpg",
  ];

  /* ================= SORT ================= */
  const sortByDateAsc = (data) =>
    [...data].sort((a, b) => {
      if (!a.event_date) return 1;
      if (!b.event_date) return -1;
      return new Date(a.event_date) - new Date(b.event_date);
    });

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("https://backendpemerintah.24tia6.com/api/events")
      .then((res) => res.json())
      .then((data) => {
        const rawEvents = data.data || data;
        const sorted = sortByDateAsc(rawEvents);
        setAllEvents(sorted);
        setEvents(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  /* ================= SLIDER ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ================= HERO TEXT ================= */
  useEffect(() => {
    const t = setTimeout(() => setShowHeroText(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    if (!search.trim()) {
      setEvents(allEvents);
      return;
    }

    const filtered = allEvents.filter((ev) =>
      `${ev.title} ${ev.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setEvents(sortByDateAsc(filtered));
  }, [search, allEvents]);

  /* ================= UTILS ================= */
  const formatTanggal = (dateString) => {
    if (!dateString || dateString === "0000-00-00") {
      return "Tanggal belum ditentukan";
    }
    const date = new Date(dateString);
    if (isNaN(date)) return "Tanggal belum ditentukan";

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getMonthClass = (dateString) => {
    if (!dateString) return "month-default";
    return `month-${new Date(dateString).getMonth() + 1}`;
  };

  /* ================= RENDER ================= */
  return (
    <div className="kalender-container">
      {/* HERO */}
      <header
        className="event-hero"
        style={{ backgroundImage: `url(${sliderImages[currentSlide]})` }}
      >
        <div className="event-hero-overlay">
          <h1 style={{ opacity: showHeroText ? 1 : 0 }}>
            Kalender Event Desa Sumbersari
          </h1>
          <p style={{ opacity: showHeroText ? 1 : 0 }}>
            Jadwal kegiatan & acara desa yang akan datang
          </p>
        </div>
      </header>

      {/* SEARCH */}
      <div className="kalender-filter">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Cari event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="event-search"
          />
          <Search size={20} className="search-icon" />
        </div>
      </div>

      {/* LIST */}
      <section className="kalender-section">
        <div className="kalender-list">
          {events.length ? (
            events.map((ev) => (
              <div
                key={ev.id}
                className={`event-card ${getMonthClass(ev.event_date)}`}
              >
                {ev.image && (
                  <img
                    src={`https://backendpemerintah.24tia6.com/storage/${ev.image}`}
                    alt={ev.title}
                    className="event-image"
                  />
                )}
                <div className="event-date">
                  {formatTanggal(ev.event_date)}
                </div>
                <h3 className="event-title">{ev.title}</h3>
                <p className="event-desc">{ev.description}</p>
              </div>
            ))
          ) : (
            <p className="no-events">Tidak ada event.</p>
          )}
        </div>
      </section>
    </div>
  );
}
