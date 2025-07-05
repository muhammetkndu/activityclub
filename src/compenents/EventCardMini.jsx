import React from 'react';

export default function EventCardMini({ event, onClick }) {
    return (
        <div className="event-card-mini" onClick={() => onClick(event)}>
            <img src={event.images?.[0]?.url || ''} alt={event.name} />
            <div className="event-card-mini-info">
                <h4>{event.name}</h4>
                <p>{event.dates?.start?.localDate}</p>
                <p>{event._embedded?.venues?.[0]?.city?.name}</p>
            </div>
        </div>
    );
} 