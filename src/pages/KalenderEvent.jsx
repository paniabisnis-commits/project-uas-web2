import { useEffect, useState } from "react";
import "./KalenderEvent.css";
import { Search } from "lucide-react";


export default function KalenderEvent() {
  const [showHeroText, setShowHeroText] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
    const sliderImages = [
    "/images/desa1.jpg",
    "/images/desa2.jpg",
    "/images/desa3.jpg",
  ];
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const sortByDateAsc = (data) => {
    return [...data].sort((a, b) => {
      if (!a.event_date) return 1;
      if (!b.event_date) return -1;
      return new Date(a.event_date) - new Date(b.event_date);
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const rawEvents = data.data || data; 
        const sorted = sortByDateAsc(rawEvents);

        setAllEvents(sorted);
        setEvents(sorted);
      })
      .catch((err) => console.error("ERROR FETCH EVENTS:", err));
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

  const formatTanggal = (dateString) => {
  if (!dateString || dateString === "0000-00-00") {
    return "Tanggal belum ditentukan";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Tanggal belum ditentukan";
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};


  const getMonthClass = (dateString) => {
  if (!dateString) return "month-default";
  const month = new Date(dateString).getMonth() + 1; // 1–12
  return `month-${month}`;
};


  return (
  <div className="kalender-container">
    {/* ================= HERO ================= */}
    <header
      className="event-hero"
      style={{
        backgroundImage: `url(${sliderImages[currentSlide]})`,
      }}
    >
      <div className="event-hero-overlay">
        <h1
          style={{
            opacity: showHeroText ? 1 : 0,
            transform: showHeroText ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          Kalender Event Desa Sumbersari
        </h1>

        <p
          style={{
            opacity: showHeroText ? 1 : 0,
            transform: showHeroText ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease-out",
            transitionDelay: "0.2s",
          }}
        >
          Jadwal kegiatan & acara desa yang akan datang — festival, seminar,
          kegiatan masyarakat, dan lainnya
        </p>
      </div>
    </header>

    {/* ================= FILTER ================= */}
    <section className="kalender-section">
      <div className="kalender-filter">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Cari event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="event-search"
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>
    </section>

    {/* ================= LIST EVENT ================= */}
    <section className="kalender-section alt">
      <div className="kalender-list">
        {events.length ? (
          events.map((ev) => (
            <div
              key={ev.id}
              className={`event-card ${getMonthClass(ev.event_date)}`}
            >
              {ev.image && (
                <img
                  src={`http://127.0.0.1:8000/storage/${ev.image}`}
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