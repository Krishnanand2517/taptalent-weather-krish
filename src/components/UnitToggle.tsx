import { useState } from "react";

const UnitToggle = () => {
  const [unit, setUnit] = useState("C");
  return (
    <div className="relative flex items-center bg-gray-200 rounded-full p-1">
      {/* Animated sliding background */}
      <div
        className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white rounded-full shadow transition-transform duration-300 ease-out"
        style={{
          transform:
            unit === "F" ? "translateX(calc(100% + 0.25rem))" : "translateX(0)",
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
  );
};

export default UnitToggle;
