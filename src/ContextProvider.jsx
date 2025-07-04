import { createContext, useState, useContext } from "react";

const ConserContext = createContext();

export const ConserProvider = ({ children }) => {
    const [consers, setConsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState({});

    const API_KEY = "e32uh26BbgJoAHvOjKovrgJLyo1lomX8";
    const BaseUrl = "https://app.ticketmaster.com/discovery/v2";

    const fetchConsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/events.json?apikey=${API_KEY}&countryCode=TR`);
            const data = await response.json();
            setConsers(data._embedded ? data._embedded.events : []);
        } catch (error) {
            setConsers([]);
        }
        setLoading(false);
    }

    const fetchTiyatros = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/events.json?apikey=${API_KEY}&countryCode=TR&segmentId=KZFzniwnSyZfZ7v7na`);
            const data = await response.json();
            setConsers(data._embedded ? data._embedded.events : []);
        } catch (error) {
            setConsers([]);
        }
        setLoading(false);
    }

    const fetchFestival = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/events.json?apikey=${API_KEY}&countryCode=TR&keyword=festival`);
            const data = await response.json();
            setConsers(data._embedded ? data._embedded.events : []);
        } catch (error) {
            setConsers([]);
        }
        setLoading(false);
    }

    const fetchStandUp = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/events.json?apikey=${API_KEY}&countryCode=TR&keyword=stand-up`);
            const data = await response.json();
            setConsers(data._embedded ? data._embedded.events : []);
        } catch (error) {
            setConsers([]);
        }
        setLoading(false);
    }

    const fetchArtists = async () => {
        const turkishArtists = {
            pop: ["Tarkan", "Sezen Aksu", "Ajda Pekkan", "Ebru Gündeş", "Mustafa Ceceli"],
            rap: ["Ceza", "Sagopa Kajmer", "Contra", "Şanışer", "Ezhel"],
            rock: ["Duman", "Mor ve Ötesi", "Manga", "Teoman", "Athena"],
            folk: ["Barış Manço", "Cem Karaca", "Erkin Koray", "Fikret Kızılok", "Moğollar"]
        };

        const artistsData = {};

        for (const [category, artistList] of Object.entries(turkishArtists)) {
            artistsData[category] = [];

            for (const artistName of artistList) {
                try {
                    const response = await fetch(`${BaseUrl}/attractions.json?apikey=${API_KEY}&keyword=${encodeURIComponent(artistName)}&countryCode=TR`);
                    const data = await response.json();

                    if (data._embedded && data._embedded.attractions.length > 0) {
                        const artist = data._embedded.attractions[0];
                        artistsData[category].push({
                            name: artist.name,
                            image: artist.images?.[0]?.url || `https://via.placeholder.com/80x80/27ae60/FFFFFF?text=${artistName.charAt(0)}`,
                            id: artist.id
                        });
                    } else {
                        // API'den veri gelmezse placeholder kullanıyoruz
                        artistsData[category].push({
                            name: artistName,
                            image: `https://via.placeholder.com/80x80/27ae60/FFFFFF?text=${artistName.charAt(0)}`,
                            id: null
                        });
                    }
                } catch (error) {
                    // Hata durumunda placeholder kullanıyoruz
                    artistsData[category].push({
                        name: artistName,
                        image: `https://via.placeholder.com/80x80/27ae60/FFFFFF?text=${artistName.charAt(0)}`,
                        id: null
                    });
                }
            }
        }

        setArtists(artistsData);
    };

    return (
        <ConserContext.Provider value={{ consers, loading, fetchConsers, fetchTiyatros, fetchFestival, fetchStandUp, artists, fetchArtists }}>
            {children}
        </ConserContext.Provider>
    );
}
export const useConser = () => useContext(ConserContext);