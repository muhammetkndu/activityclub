// src/pages/home.jsx
import '../css dosyaları/home.css'
function Home() {
  return (
    <div className="home-container">
      {/* Sol Sütun: Kategoriler veya Filtreler */}
      <aside className="sidebar">
        <h3>Kategoriler</h3>
        <ul>
          <li>Konserler</li>
          <li>Tiyatrolar</li>
          <li>Festivaller</li>
          <li>Stand-up</li>
          <li>Çocuk Etkinlikleri</li>
        </ul>
      </aside>

      {/* Orta Sütun: Etkinlikler Listesi */}
      <main className="main-content">
        <h2>Yaklaşan Etkinlikler</h2>
        <div className="event-list">
          {/* Modern etkinlik kartları */}
          <div className="event-card">
            <div className="event-image">
              <img src="" alt="Etkinlik Görseli" />
            </div>
            <div className="event-details">
              <h4>Mor ve Ötesi Konseri</h4>
              <p className="event-date">Tarih: 12 Temmuz 2024</p>
              <p className="event-location">Şehir: İstanbul</p>
              <span className="event-type">Konser</span>
            </div>
          </div>
          <div className="event-card">
            <div className="event-image">
              <img src="" alt="Etkinlik Görseli" />
            </div>
            <div className="event-details">
              <h4>Şehir Tiyatrosu: Hamlet</h4>
              <p className="event-date">Tarih: 18 Temmuz 2024</p>
              <p className="event-location">Şehir: Ankara</p>
              <span className="event-type">Tiyatro</span>
            </div>
          </div>
          <div className="event-card">
            <div className="event-image">
              <img src="" alt="Etkinlik Görseli" />
            </div>
            <div className="event-details">
              <h4>Yaz Festivali</h4>
              <p className="event-date">Tarih: 25 Temmuz 2024</p>
              <p className="event-location">Şehir: İzmir</p>
              <span className="event-type">Festival</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;