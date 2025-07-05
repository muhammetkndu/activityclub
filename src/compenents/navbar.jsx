import "bootstrap-icons/font/bootstrap-icons.css"
import '../css dosyaları/navbar.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-brand">
                    Etkinlik
                </a>
                
                <div className="search-container">
                    <form onSubmit={handleSearch}>
                        <input
                            type="search"
                            className="search-input"
                            placeholder="Etkinlik veya sanatçı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="search-button">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>

                <div className="profile">
                    <h2>Muhammet Kondu</h2>
                    <img src="/mami.jpeg" alt="Profil" />
                </div>
            </div>
        </nav>
    )
}