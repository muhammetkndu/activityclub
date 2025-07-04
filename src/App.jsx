import Navbar from "./compenents/navbar"
import { ConserProvider } from "./ContextProvider"
import { WeatherProvider } from "./weatherProvider"
import Home from "./pages/home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Theatre from "./theatre";
import EventDetail from "./eventDetail";
import Festival from "./festival.jsx";
import Standup from "./stand-up.jsx";


function App() {
  return (
    <ConserProvider>
      <WeatherProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Theatre" element={<Theatre />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/festival" element={<Festival />} />
            <Route path="/stand-up" element={<Standup />} />
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </ConserProvider>
  )
}

export default App