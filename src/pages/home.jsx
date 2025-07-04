import '../css dosyaları/home.css'
import { useConser } from '../ContextProvider';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { consers, loading, fetchConsers } = useConser();

  useEffect(() => {
    fetchConsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-page-container">
      {/* Ekstra Navbar: Kategoriler */}
      <nav className="category-navbar">
        <ul>
          <li>Konserler</li>
          <li><Link to= "/theatre">Tiyatrolar</Link></li>
          <li>Festivaller</li>
          <li>Stand-up</li>
          <li>Çocuk Etkinlikleri</li>
        </ul>
      </nav>

      <div className="filter-button">
        <select name="city" id="city-filter">
          <option value="">Şehir Seçiniz</option>
          <option value="İstanbul">İstanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="İzmir">İzmir</option>
          <option value="Bursa">Bursa</option>
          <option value="Antalya">Antalya</option>
        </select>
        <input type="date" name="date" id="date-filter" />
        <button className="apply-filter">Filtrele</button>
        <button className="reset-filter">Sıfırla</button>
      </div>

      {/* Etkinlikler */}
      <main className="main-content">
        <h2>Yaklaşan Konserler</h2>
        {loading && <div>Yükleniyor...</div>}
        {!loading && consers.length === 0 && <div>Etkinlik bulunamadı.</div>}
        <div className="event-list">
          {consers.map(event => (
            <div className="event-card" key={event.id}>
              <div className="event-image">
                <img src={event.images?.[0]?.url || ""} alt={event.name} />
              </div>
              <div className="event-details">
                <h4>{event.name}</h4>
                <p className="event-date">
                  Tarih: {event.dates?.start?.localDate || "Bilinmiyor"}
                </p>
                <p className="event-location">
                  Şehir: {event._embedded?.venues?.[0]?.city?.name || "Bilinmiyor"}
                </p>
                <span className="event-type">
                  {event.classifications?.[0]?.segment?.name || "Etkinlik"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}