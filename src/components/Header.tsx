import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

interface HeaderProps {
  pageName: string;
}

const Header = ({ pageName }: HeaderProps) => {
  const [unit, setUnit] = useState("C");

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        {pageName}
      </h1>

      <div className="flex items-center space-x-4 w-full sm:w-auto">
        {/* Search Bar */}
        <div className="relative grow sm:grow-0">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800"
          />
          <IconSearch className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* C/F Toggle */}
        <div className="relative flex items-center bg-gray-200 rounded-full p-1">
          {/* Animated sliding background */}
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white rounded-full shadow transition-transform duration-300 ease-out"
            style={{
              transform:
                unit === "F"
                  ? "translateX(calc(100% + 0.25rem))"
                  : "translateX(0)",
            }}
          />

          <button
            onClick={() => setUnit("C")}
            className={`relative z-10 px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              unit === "C" ? "bg-white text-gray-900 shadow" : "text-gray-600"
            }`}
            aria-label="Switch to Celsius"
          >
            °C
          </button>

          <button
            onClick={() => setUnit("F")}
            className={`relative z-10 px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              unit === "F" ? "bg-white text-gray-900 shadow" : "text-gray-600"
            }`}
            aria-label="Switch to Fahrenheit"
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
