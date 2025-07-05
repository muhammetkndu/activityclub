import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useConser } from '../ContextProvider';
import '../css dosyaları/artistDetails.css';
import DetailHeader from '../compenents/DetailHeader';
import EventCardMini from '../compenents/EventCardMini';

export default function ArtistDetail() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { artistDetails, loading, getArtistDetails } = useConser();
    const [artistEvents, setArtistEvents] = useState([]);
    
    const artist = location.state?.artist;
    useEffect(() => {
        if (id) {
            getArtistDetails(id);
        }
    }, [id]);

    const handleEventClick = (event) => {
        navigate(`/event/${event.id}`, { state: { event } });
    };

    return (
        <div className="artist-detail-container">
            {loading && <div>Yükleniyor...</div>}

            {artistDetails && (
                <>
                    <DetailHeader
                        image={artistDetails.images?.[0]?.url}
                        name={artistDetails.name}
                        category={artistDetails.classifications?.[0]?.segment?.name}
                        link={artistDetails.url}
                        linkLabel="Ticketmaster'da Görüntüle"
                    />

                    <div className="artist-content">
                        {artistDetails.externalLinks && (
                            <div className="social-links">
                                <h3>Sosyal Medya</h3>
                                {Object.entries(artistDetails.externalLinks).map(([platform, links]) => (
                                    <div key={platform}>
                                        <h4>{platform}</h4>
                                        {links.map((link, index) => (
                                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                                {link.url}
                                            </a>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}

                        {artistEvents.length > 0 && (
                            <div className="artist-events">
                                <h3>Yaklaşan Etkinlikler</h3>
                                <div className="events-grid">
                                    {artistEvents.map(event => (
                                        <EventCardMini key={event.id} event={event} onClick={handleEventClick} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
} 