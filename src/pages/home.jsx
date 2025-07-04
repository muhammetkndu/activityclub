import '../css dosyaları/home.css'
import { useConser } from '../ContextProvider';
import { useWeather } from '../weatherProvider';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const { consers, loading, fetchConsers, artists, fetchArtists } = useConser();
  const { handleEventClick } = useWeather();
  const navigate = useNavigate();
  const [showArtistsDropdown, setShowArtistsDropdown] = useState(false);

  useEffect(() => {
    fetchConsers();
    fetchArtists();
  }, []);

  const handleEventCardClick = async (event) => {
    // Önce hava durumunu çekiyoruz
    await handleEventClick(event);
    // Sonra detay sayfasına yönlendiriyoruz
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <div className="home-page-container">
      {/* Ekstra Navbar: Kategoriler */}
      <nav className="category-navbar">
        <ul>
          <li>Konserler</li>
          <li><Link to="/Theatre">Tiyatrolar</Link></li>
          <li><Link to="/festival">Festivaller</Link></li>
          <li><Link to="/stand-up">Stand-up</Link></li>
          <li
            className="artists-dropdown"
            onMouseEnter={() => setShowArtistsDropdown(true)}
            onMouseLeave={() => setShowArtistsDropdown(false)}
          >
            Sanatçılar
            {showArtistsDropdown && (
              <div className="artists-dropdown-content">
                <div className="artists-grid">
                  <div className="artist-category">
                    <h3>🎵 Pop</h3>
                    <div className="artist-list">
                      {artists.pop?.map((artist, index) => (
                        <div key={index} className="artist-item">
                          <img src={artist.image} alt={artist.name} />
                          <span>{artist.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="artist-category">
                    <h3>🎤 Rap</h3>
                    <div className="artist-list">
                      {artists.rap?.map((artist, index) => (
                        <div key={index} className="artist-item">
                          <img src={artist.image} alt={artist.name} />
                          <span>{artist.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="artist-category">
                    <h3>🎸 Rock</h3>
                    <div className="artist-list">
                      {artists.rock?.map((artist, index) => (
                        <div key={index} className="artist-item">
                          <img src={artist.image} alt={artist.name} />
                          <span>{artist.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="artist-category">
                    <h3>🎼 Folk</h3>
                    <div className="artist-list">
                      {artists.folk?.map((artist, index) => (
                        <div key={index} className="artist-item">
                          <img src={artist.image} alt={artist.name} />
                          <span>{artist.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
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
        <h2>Yaklaşan Etkinlikler</h2>
        {loading && <div>Yükleniyor...</div>}
        {!loading && consers.length === 0 && <div>Etkinlik bulunamadı.</div>}
        <div className="event-list">
          {consers.map(event => (
            <div
              className="event-card"
              key={event.id}
              onClick={() => handleEventCardClick(event)}
              style={{ cursor: 'pointer' }}
            >
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