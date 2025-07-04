import { useLocation } from 'react-router-dom';
import { useWeather } from './weatherProvider';
import './css dosyaları/eventDetail.css';

export default function EventDetail() {
    const location = useLocation();
    const { weather } = useWeather();

    // Etkinlik verisi location.state'den alıyoruz
    const event = location.state?.event;

    if (!event) {
        return <div className="event-detail-container">Etkinlik bulunamadı</div>;
    }

    return (
        <div className="event-detail-container">
            <div className="event-detail-content">
                {/* Sol taraf - Etkinlik Detayları */}
                <div className="event-info-section">
                    <div className="event-header">
                        <h1>{event.name}</h1>
                        <span className="event-category">
                            {event.classifications?.[0]?.segment?.name || "Etkinlik"}
                        </span>
                    </div>

                    <div className="event-image-container">
                        <img
                            src={event.images?.[0]?.url || ""}
                            alt={event.name}
                            className="event-detail-image"
                        />
                    </div>

                    <div className="event-details">
                        <div className="detail-item">
                            <h3>📅 Tarih & Saat</h3>
                            <p>{event.dates?.start?.localDate || "Bilinmiyor"}</p>
                            <p>{event.dates?.start?.localTime || "Saat belirtilmemiş"}</p>
                        </div>

                        <div className="detail-item">
                            <h3>📍 Konum</h3>
                            <p className="venue-name">{event._embedded?.venues?.[0]?.name || "Mekan bilgisi yok"}</p>
                            <p className="venue-address">
                                {event._embedded?.venues?.[0]?.address?.line1 || ""}
                                {event._embedded?.venues?.[0]?.city?.name && `, ${event._embedded?.venues?.[0]?.city?.name}`}
                            </p>
                        </div>

                        {event.info && (
                            <div className="detail-item">
                                <h3>ℹ️ Bilgi</h3>
                                <p>{event.info}</p>
                            </div>
                        )}

                        {event.priceRanges && (
                            <div className="detail-item">
                                <h3>💰 Fiyat</h3>
                                <p>
                                    {event.priceRanges[0]?.min} - {event.priceRanges[0]?.max} {event.priceRanges[0]?.currency}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sağ taraf - Hava Durumu */}
                <div className="weather-section">
                    <h2>🌤️ Hava Durumu</h2>
                    {weather ? (
                        <div className="weather-card">
                            <div className="weather-header">
                                <h3>{weather.name}</h3>
                                <p className="weather-description">
                                    {weather.weather?.[0]?.description || "Bilinmiyor"}
                                </p>
                            </div>

                            <div className="weather-details">
                                <div className="weather-item">
                                    <span className="weather-label">Sıcaklık:</span>
                                    <span className="weather-value">{Math.round(weather.main?.temp)}°C</span>
                                </div>

                                <div className="weather-item">
                                    <span className="weather-label">Hissedilen:</span>
                                    <span className="weather-value">{Math.round(weather.main?.feels_like)}°C</span>
                                </div>

                                <div className="weather-item">
                                    <span className="weather-label">Nem:</span>
                                    <span className="weather-value">%{weather.main?.humidity}</span>
                                </div>

                                <div className="weather-item">
                                    <span className="weather-label">Rüzgar:</span>
                                    <span className="weather-value">{Math.round(weather.wind?.speed)} km/s</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="weather-card">
                            <p>Hava durumu bilgisi yükleniyor...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}