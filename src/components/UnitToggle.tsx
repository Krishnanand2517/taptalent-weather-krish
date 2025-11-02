import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { toggleTemperatureUnit } from "../slices/settingsSlice";
import { selectTemperatureUnit } from "../selectors";

const UnitToggle = () => {
  const dispatch = useAppDispatch();
  const unit = useAppSelector(selectTemperatureUnit);

  const handleToggle = (newUnit: "celsius" | "fahrenheit") => {
    if (unit !== newUnit) {
      dispatch(toggleTemperatureUnit());
    }
  };

  return (
    <div className="relative flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
      {/* Animated sliding background */}
      <div
        className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white dark:bg-gray-900 rounded-full shadow transition-transform duration-300 ease-out"
        style={{
          transform:
            unit === "fahrenheit"
              ? "translateX(calc(100% + 0.25rem))"
              : "translateX(0)",
        }}
      />

      <button
        onClick={() => handleToggle("celsius")}
        className={`relative z-10 px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
          unit === "celsius"
            ? "text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-400"
        }`}
        aria-label="Switch to Celsius"
      >
        °C
      </button>

      <button
        onClick={() => handleToggle("fahrenheit")}
        className={`relative z-10 px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
          unit === "fahrenheit"
            ? "text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-400"
        }`}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
