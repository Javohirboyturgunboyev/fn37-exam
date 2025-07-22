
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaShoppingCart, FaExchangeAlt, FaHeart } from "react-icons/fa";
import Logo from "../assets/uzum.png";
import Search from "./search";

function Header() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleProtectedClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white">
      <div onClick={() => handleProtectedClick("/home")} className="cursor-pointer hidden sm:flex items-center px-4">
        <img src={Logo} alt="Logo" />
      </div>

      <button onClick={() => handleProtectedClick("/exchange")} className="hidden sm:flex bg-gray-200 items-center text-[#7F4DFF] px-4 py-2 rounded-md">
        <FaExchangeAlt className="mr-2" /> Katalog
      </button>

      <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
        {isLoggedIn ? (
          <Search onSearch={setSearchTerm} />
        ) : (
          <input
            onFocus={() => navigate("/login")}
            className="border w-full p-2 rounded"
            placeholder="Search uchun login qiling"
          />
        )}
      </div>

      <div className="flex space-x-2 mt-2 sm:mt-0">
        <button onClick={() => handleProtectedClick("/register")} className="flex items-center text-[#7F4DFF] px-3 py-2 sm:px-4 hover:bg-purple-300 rounded-4xl">
          <FaUserPlus className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Kirish</span>
        </button>
        <button onClick={() => handleProtectedClick("/statistika")} className="flex items-center text-[#f03312] px-3 py-2 sm:px-4 hover:bg-red-300 rounded-4xl">
          <FaHeart className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Saralanganlar</span>
        </button>
        <button onClick={() => handleProtectedClick("/karzinka")} className="flex items-center text-[#0cf718] px-3 py-2 sm:px-4 hover:bg-purple-400 rounded-4xl">
          <FaShoppingCart className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Savat</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
