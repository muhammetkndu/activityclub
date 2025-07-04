import { useEffect } from "react";
import { useConser } from "./ContextProvider";
import { useWeather } from "./weatherProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Festival(){
    const {consers, loading, fetchFestival} = useConser();
    const { handleEventClick } = useWeather();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFestival();
    },[]);

    const handleEventCardClick = async (event) => {
      // Önce hava durumunu çekiyoruz
      await handleEventClick(event);
      // Sonra detay sayfasına yönlendiriyoruz
      navigate(`/event/${event.id}`, { state: { event } });
    };

    return (
        <div className="home-page-container">
            <nav className="category-navbar">
            <ul>
              <li><Link to="/">Konserler</Link></li>
              <li><Link to= "/theatre">Tiyatrolar</Link></li>
              <li><Link to="/festival">Festivaller</Link></li>
              <li><Link to="/stand-up">Stand-up</Link></li>
              <li><Link to="">Sanatçılar</Link></li>

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
    
          <h2>Festival Etkinlikleri</h2>
          {loading && <div>Yükleniyor...</div>}
          {!loading && consers.length === 0 && <div>Festival etkinliği bulunamadı.</div>}
          <div className="event-list">
            {consers.map(event => (
              <div className="event-card" key={event.id}
              onClick={() => handleEventCardClick(event)}>
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
        </div>
      )
}
