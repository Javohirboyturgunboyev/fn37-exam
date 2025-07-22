import  { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaShoppingCart, FaExchangeAlt, FaHeart } from "react-icons/fa";
import Logo from "../assets/uzum.png";
import Search from "./search";

function Header() {
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white">
      <Link to="/" className="hidden sm:flex items-center px-4">
      <img src={Logo} alt="" />
      </Link>

      <Link to="/exchange" className="hidden sm:flex bg-gray-200 items-center text-[#7F4DFF] px-4 py-2 rounded-md">
        <FaExchangeAlt className="mr-2" /> Katalog
      </Link>

      <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
        <Search onSearch={setSearchTerm} />
      </div>

      <div className="flex space-x-2 mt-2 sm:mt-0">
        <Link to="/register" className="flex items-center text-[#7F4DFF] px-3 py-2 sm:px-4  hover:bg-purple-300 rounded-4xl">
          <FaUserPlus className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Kirish</span>
        </Link>
        <Link to="/statistika" className="flex items-center text-[#f03312] px-3 py-2 sm:px-4  hover:bg-red-300 rounded-4xl">
          <FaHeart className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Saralanganlar</span>
        </Link>
        <Link to="/karzinka" className="flex items-center text-[#0cf718] px-3 py-2 sm:px-4 hover:bg-purple-400 rounded-4xl">
          <FaShoppingCart className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">Savat</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
