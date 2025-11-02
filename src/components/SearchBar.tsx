import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { CityLocation } from "../types";
import { setCurrentCity } from "../slices/currentCitySlice";
import { fetchWeather } from "../slices/weatherSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { IconLoader2, IconSearch } from "@tabler/icons-react";

const API_KEY = import.meta.env.VITE_OWM_KEY;

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CityLocation[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Debounced API call
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setIsFetchingSuggestions(true);
        setError("");

        const cached = sessionStorage.getItem(`geo-${query.toLowerCase()}`);
        if (cached) {
          setSuggestions(JSON.parse(cached));
          return;
        }

        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setSuggestions(data);
        sessionStorage.setItem(
          `geo-${query.toLowerCase()}`,
          JSON.stringify(data)
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch suggestions");
      } finally {
        setIsFetchingSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = async (city: CityLocation) => {
    try {
      setIsFetchingWeather(true);
      setError("");

      setQuery(city.name);
      setSuggestions([]);

      const weatherResult = await dispatch(
        fetchWeather({ lat: city.lat, lon: city.lon })
      ).unwrap();

      dispatch(setCurrentCity(weatherResult));
      navigate(`/city-${weatherResult.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to load weather data");
    } finally {
      setIsFetchingWeather(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    }
  };

  // Keep active item in view when navigating with keyboard
  useEffect(() => {
    if (listRef.current && activeIndex >= 0) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full max-w-md mx-auto mr-2">
      <div className="relative flex gap-1 items-center">
        <IconSearch className="hidden md:block w-5 h-5 text-gray-400" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 pr-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isFetchingWeather ? "opacity-70" : ""
          }`}
        />

        {/* Spinner inside input */}
        {(isFetchingSuggestions || isFetchingWeather) && (
          <IconLoader2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-300 animate-spin" />
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && !isFetchingWeather && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full bg-white dark:bg-gray-800 shadow-md rounded-lg mt-1 max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700"
        >
          {suggestions.map((city, idx) => (
            <li
              key={idx}
              className={`px-3 py-2 cursor-pointer text-gray-800 dark:text-gray-200 transition-colors ${
                activeIndex === idx
                  ? "bg-blue-100 dark:bg-blue-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => handleSelect(city)}
            >
              <div className="font-medium">{city.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {city.state ? `${city.state}, ` : ""}
                {city.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
