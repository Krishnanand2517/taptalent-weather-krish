import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { mockWeatherData } from "../data/mockData";

const Header = () => {
  const [unit, setUnit] = useState("C");

  const location = useLocation();
  const cityId = Number(location.pathname.slice(6));
  const pageName =
    location.pathname === "/"
      ? "Dashboard"
      : cityId
      ? mockWeatherData.find((city) => city.id === cityId)?.name
      : "Detailed View";

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
      <h1 className="text-4xl font-bold text-gray-900">{pageName}</h1>

      <div className="flex items-center space-x-4 w-full sm:w-auto">
        {/* Search Bar */}
        <div className="relative grow sm:grow-0">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <IconSearch className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* C/F Toggle */}
        <div className="flex items-center bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setUnit("C")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              unit === "C" ? "bg-white text-gray-900 shadow" : "text-gray-600"
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit("F")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              unit === "F" ? "bg-white text-gray-900 shadow" : "text-gray-600"
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
