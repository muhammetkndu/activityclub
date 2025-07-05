import React from 'react';

export default function DetailHeader({ image, name, category, link, linkLabel }) {
    return (
        <div className="detail-header">
            <img src={image} alt={name} className="detail-image" />
            <div className="detail-info">
                <h1>{name}</h1>
                {category && <p>{category}</p>}
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {linkLabel || 'Detay Linki'}
                    </a>
                )}
            </div>
        </div>
    );
} 