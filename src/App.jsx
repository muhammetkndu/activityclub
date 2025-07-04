import Navbar from "./compenents/navbar"
import { ConserProvider } from "./ContextProvider"
import Home from "./pages/home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Theatre from "./theatre.jsx";

function App() {
  return (
   <ConserProvider>
     <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Theatre" element={<Theatre />} />
       </Routes>
     </BrowserRouter>
   </ConserProvider>
  )
}

export default App