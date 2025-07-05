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
        <>
            <nav>
                <div className="navabar">
                    <div className="logo">
                        <h2>Etkinlik</h2>
                    </div>
                    <div className="search">
                        <form onSubmit={handleSearch}>
                            <input
                                type="search"
                                id="search"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </form>
                    </div>
                    <div className="profile">
                        <h2>Muhammet Kondu</h2>
                        <img src="/mami.jpeg" alt="" />
                    </div>
                </div>
            </nav>
        </>
    )
}