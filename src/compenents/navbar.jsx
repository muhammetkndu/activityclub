import "bootstrap-icons/font/bootstrap-icons.css"
import '../css dosyaları/navbar.css'
export default function Navbar() {
    return (
        <>
            <nav>
                <div className="navabar">
                    <div className="logo">
                        <h2>Etkinlik</h2>
                    </div>
                    <div className="search">
                        <input type="search" id="search" placeholder="Search" />
                        <button><i className="bi bi-search"></i></button>
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