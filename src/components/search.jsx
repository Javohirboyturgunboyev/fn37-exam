import { useState } from "react";

function Search({ onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

  
    if (typeof onSearch === "function") {
      if (newValue.trim().length >= 3) {
        onSearch(newValue);
      } else {
        onSearch(""); 
      }
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Mahsulot qidiring..."
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F4DFF]"
    />
  );
}

export default Search;
