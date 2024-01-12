import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Checklist2 from "./Checklist2.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/checklist2" element = {<Checklist2 />} />
      
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
