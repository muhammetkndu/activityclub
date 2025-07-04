import '../css dosyaları/home.css'
export default function FilterButton() {
    return(
        <>
        <div className="filter-button">
        <select name="city" id="city-filter">
          <option value="">Şehir Seçiniz</option>
          <option value="İstanbul">İstanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="İzmir">İzmir</option>
          <option value="Bursa">Bursa</option>
          <option value="Antalya">Antalya</option>
        </select>
        <input type="date" name="date" id="date-filter" />
        <button className="apply-filter">Filtrele</button>
        <button className="reset-filter">Sıfırla</button>
      </div>
        </>
    )
}