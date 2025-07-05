import { createContext, useState, useContext } from "react";

const ConserContext = createContext();

export const ConserProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState({ events: [], artists: [] });
    const [artistDetails, setArtistDetails] = useState(null);
    const [consers, setConsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const API_KEY = "e32uh26BbgJoAHvOjKovrgJLyo1lomX8";
    const BaseUrl = "https://app.ticketmaster.com/discovery/v2";

    const fetchEvents = async (params = {}) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                apikey: API_KEY,
                countryCode: 'TR',
                ...params
            });

            const response = await fetch(`${BaseUrl}/events.json?${queryParams}`);
            const data = await response.json();
            setConsers(data._embedded ? data._embedded.events : []);
        } catch (error) {
            setConsers([]);
        }
        setLoading(false);
    }

    const fetchConsers = () => fetchEvents();
    const fetchTiyatros = () => fetchEvents({ segmentId: 'KZFzniwnSyZfZ7v7na' });
    const fetchFestival = () => fetchEvents({ keyword: 'festival' });
    const fetchStandUp = () => fetchEvents({ keyword: 'stand-up' });

    const searchAll = async (searchTerm) => {
        setLoading(true);
        try {
            const eventsResponse = await fetch(`${BaseUrl}/events.json?apikey=${API_KEY}&countryCode=TR&keyword=${encodeURIComponent(searchTerm)}`);
            const eventsData = await eventsResponse.json();

            const artistsResponse = await fetch(`${BaseUrl}/attractions.json?apikey=${API_KEY}&keyword=${encodeURIComponent(searchTerm)}&countryCode=TR`);
            const artistsData = await artistsResponse.json();

            setSearchResults({
                events: eventsData._embedded ? eventsData._embedded.events : [],
                artists: artistsData._embedded ? artistsData._embedded.attractions : []
            });
        } catch (error) {
            setSearchResults({ events: [], artists: [] });
        }
        setLoading(false);
    };

    const getArtistDetails = async (artistId) => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/attractions/${artistId}.json?apikey=${API_KEY}`);
            const data = await response.json();
            setArtistDetails(data);
        } catch (error) {
            setArtistDetails(null);
        }
        setLoading(false);
    };

    const applyFilters = (cityFilter) => {
        let filtered = [...consers];

        if (cityFilter && cityFilter.trim() !== '') {
            filtered = filtered.filter(event => {
                const eventCity = event._embedded?.venues?.[0]?.city?.name;
                return eventCity && eventCity.toLowerCase() === cityFilter.toLowerCase();
            });
        }

        setFilteredEvents(filtered);
    };

    const resetFilters = () => {
        setFilteredEvents([]);
    }

    return (
        <ConserContext.Provider value={{
            consers,
            loading,
            fetchConsers,
            fetchTiyatros,
            fetchFestival,
            fetchStandUp,
            searchResults,
            searchAll,
            artistDetails,
            getArtistDetails,
            resetFilters,
            applyFilters,
            filteredEvents
        }}>
            {children}
        </ConserContext.Provider>
    );
}
export const useConser = () => useContext(ConserContext);