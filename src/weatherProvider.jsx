import { createContext, useState, useContext } from "react";
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(null);

    const API_KEY = "4c18398bbc081393640cc6740781d35c";
    const Base_Url = "https://api.openweathermap.org/data/2.5";

    const fetchWeatherCity = async (cityName) => {
        try {
            const response = await fetch(`${Base_Url}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=tr`)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('weather api error', error);
            return null;
        }
    }

    const handleEventClick = async (eventData) => {
        const cityName = eventData._embedded?.venues?.[0]?.city?.name;

        if (cityName) {
            const weatherData = await fetchWeatherCity(cityName);
            console.log('weather for', cityName, ':', weatherData);
            setWeather(weatherData);
        }
    }

    return (
        <WeatherContext.Provider value={{ weather, fetchWeatherCity, handleEventClick }}>
            {children}
        </WeatherContext.Provider>
    )
}
export const useWeather = () => useContext(WeatherContext);