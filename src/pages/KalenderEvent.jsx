import { useEffect, useState } from "react";
import "./KalenderEvent.css";
import { Search } from "lucide-react";


export default function KalenderEvent() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  // SORT AMAN (event tanpa tanggal di bawah)
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
        const rawEvents = data.data || data; // aman untuk paginate & non-paginate
        const sorted = sortByDateAsc(rawEvents);

        setAllEvents(sorted);
        setEvents(sorted);
      })
      .catch((err) => console.error("ERROR FETCH EVENTS:", err));
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
    if (!dateString) return "Tanggal belum ditentukan";
    const date = new Date(dateString);
    return isNaN(date)
      ? "Format tanggal tidak valid"
      : date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  return (
    <div className="kalender-page">
      <header className="kalender-header">
        <h1>Kalender Event Desa Sumbersari</h1>
        <p>
          Jadwal kegiatan & acara desa yang akan datang — festival, seminar,
          kegiatan masyarakat, dan lainnya.
        </p>
      </header>

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



      <div className="kalender-list">
        {events.length ? (
          events.map((ev) => (
            <div key={ev.id} className="event-card">
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
    </div>
  );
}
