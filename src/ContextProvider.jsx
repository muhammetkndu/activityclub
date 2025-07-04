import { createContext, useState, useContext } from "react";

const ConserContext = createContext();

export const ConserProvider = ({ children }) => {
    const [consers, setConsers] = useState([]);
    const [loading, setLoading] = useState(false);

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
            const response = await fetch(`${BaseUrl}/events.json?apikey=${API_KEY}&&countryCode=TR&segmentId=KZFzniwnSyZfZ7v7na`);
            const data = await response.json();
            setConsers(data._embedded ? data._embedded.events : []);
        } catch (error) {
            setConsers([]);
        }
        setLoading(false);
    }

    return (
        <ConserContext.Provider value={{ consers, loading, fetchConsers, fetchTiyatros }}>
            {children}
        </ConserContext.Provider>
    );
}
export const useConser = () => useContext(ConserContext);