import '../css dosyaları/home.css'
import { Link } from 'react-router-dom';
export default function Navbar2() {
    return(
        <>
    <nav className="category-navbar">
        <ul>
          <li>Konserler</li>
          <li><Link to= "/theatre">Tiyatrolar</Link></li>
          <li>Festivaller</li>
          <li>Stand-up</li>
          <li>Çocuk Etkinlikleri</li>
        </ul>
    </nav>

        </>
    )
}