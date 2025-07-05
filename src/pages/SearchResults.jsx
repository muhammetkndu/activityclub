import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useConser } from '../ContextProvider';
import '../css dosyaları/searchResults.css';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const { searchResults, loading, searchAll } = useConser();
    const navigate = useNavigate();
    const searchTerm = searchParams.get('q');

    useEffect(() => {
        if (searchTerm) {
            searchAll(searchTerm);
        }
    }, [searchTerm]);

    const handleEventClick = (event) => {
        navigate(`/event/${event.id}`, { state: { event } });
    };

    const handleArtistClick = (artist) => {
        navigate(`/artist/${artist.id}`, { state: { artist } });
    };

    return (
        <div className="search-results-container">
            <h2>"{searchTerm}" için arama sonuçları</h2>

            {loading && <div>Yükleniyor...</div>}

            {/* Etkinlikler */}
            {searchResults?.events?.length > 0 && (
                <div className="results-section">
                    <h3>Etkinlikler ({searchResults.events.length})</h3>
                    <div className="events-grid">
                        {searchResults.events.map(event => (
                            <div
                                key={event.id}
                                className="event-card"
                                onClick={() => handleEventClick(event)}
                            >
                                <img src={event.images?.[0]?.url} alt={event.name} />
                                <h4>{event.name}</h4>
                                <p>{event.dates?.start?.localDate}</p>
                                <p>{event._embedded?.venues?.[0]?.city?.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sanatçılar */}
            {searchResults?.artists?.length > 0 && (
                <div className="results-section">
                    <h3>Sanatçılar ({searchResults.artists.length})</h3>
                    <div className="artists-grid">
                        {searchResults.artists.map(artist => (
                            <div
                                key={artist.id}
                                className="artist-card"
                                onClick={() => handleArtistClick(artist)}
                            >
                                <img src={artist.images?.[0]?.url} alt={artist.name} />
                                <h4>{artist.name}</h4>
                                <p>{artist.classifications?.[0]?.segment?.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loading && (!searchResults?.events || searchResults.events.length === 0) && (!searchResults?.artists || searchResults.artists.length === 0) && (
                <div className="no-results">
                    <p>"{searchTerm}" için sonuç bulunamadı.</p>
                </div>
            )}
        </div>
    );
} 