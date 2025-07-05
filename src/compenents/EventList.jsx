import { useConser } from '../ContextProvider';
import { useWeather } from '../weatherProvider';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EventList({ title, fetchFunction, eventType }) {
    const { consers, loading, filteredEvents, applyFilters, resetFilters } = useConser();
    const { handleEventClick } = useWeather();
    const [cityFilter, setCityFilter] = useState('');
    const navigate = useNavigate();

    const handleApplyFilter = () => {
        applyFilters(cityFilter);
    };

    const handleResetFilter = () => {
        setCityFilter('');
        resetFilters();
    };

    const handleEventCardClick = async (event) => {
        await handleEventClick(event);
        navigate(`/event/${event.id}`, { state: { event } });
    };

    return (
        <div className="home-page-container">
            <nav className="category-navbar">
                <ul>
                    <li><Link to="/">Konserler</Link></li>
                    <li><Link to="/Theatre">Tiyatrolar</Link></li>
                    <li><Link to="/festival">Festivaller</Link></li>
                    <li><Link to="/stand-up">Stand-up</Link></li>
                </ul>
            </nav>

            <div className="filter-button">
                <select
                    name="city"
                    id="city-filter"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                >
                    <option value="">Şehir Seçiniz</option>
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Antalya">Antalya</option>
                </select>
                <button className="apply-filter" onClick={handleApplyFilter}>
                    Filtrele
                </button>
                <button className="reset-filter" onClick={handleResetFilter}>
                    Sıfırla
                </button>
            </div>

            {filteredEvents && filteredEvents.length > 0 && (
                <div className="filter-results">
                    <p>🎯 {filteredEvents.length} {eventType} etkinliği bulundu</p>
                </div>
            )}

            <h2>{title}</h2>
            {loading && <div>Yükleniyor...</div>}
            {!loading && consers.length === 0 && <div>{eventType} etkinliği bulunamadı.</div>}
            <div className="event-list">
                {(filteredEvents && filteredEvents.length > 0 ? filteredEvents : consers).map(event => (
                    <div className="event-card" key={event.id} onClick={() => handleEventCardClick(event)}>
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
    );
} 