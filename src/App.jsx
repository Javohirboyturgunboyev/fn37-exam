
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Fullproduct from "./pages/fullproduct.jsx";
import Karzinka from "./pages/karzinka.jsx";
import Statistika from "./pages/statistika.jsx";
import Register from "./pages/register.jsx";
import Layaut from "./Layaut/Layaut.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container mx-auto">   
     <Toaster position="top-right" reverseOrder={false} />
    <Layaut> 
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/fullproduct/:id" element={<Fullproduct />} />
        <Route path="/home" element={<Home />} />
        <Route path="/karzinka" element={<Karzinka />} />
        <Route path="/statistika" element={<Statistika />} />
      </Routes>
    </Layaut>
    </div>

  );
}

export default App;
