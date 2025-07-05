import Navbar from "./compenents/navbar"
import { ConserProvider } from "./ContextProvider"
import { WeatherProvider } from "./weatherProvider"
import Home from "./pages/home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Theatre from "./pages/theatre";
import EventDetail from "./eventDetail";
import Festival from "./pages/festival";
import Standup from "./pages/stand-up";
import SearchResults from "./pages/SearchResults";
import ArtistDetail from "./pages/ArtistDetail";

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
            <Route path="/search" element={<SearchResults />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </ConserProvider>
  )
}

export default App