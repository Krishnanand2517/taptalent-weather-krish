import { useEffect, useMemo, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { selectFavoriteCities } from "./selectors";
import { fetchFavorites } from "./slices/favoritesSlice";
import { fetchWeather } from "./slices/weatherSlice";
import Header from "./components/Header";

const POLLING_INTERVAL = 60000; // 1 minute

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const favoriteCities = useAppSelector(selectFavoriteCities);
  const currentCity = useAppSelector((state) => state.currentCity.city);

  const pollingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (currentCity) {
      dispatch(
        fetchWeather({ lat: currentCity.coord.lat, lon: currentCity.coord.lon })
      );
    }
  }, [currentCity, dispatch]);

  // Poll weather every minute
  useEffect(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    if (currentCity) {
      const pollWeather = () => {
        dispatch(
          fetchWeather({
            lat: currentCity.coord.lat,
            lon: currentCity.coord.lon,
          })
        );
      };
      pollingIntervalRef.current = setInterval(pollWeather, POLLING_INTERVAL);

      return () => {
        if (pollingIntervalRef.current)
          clearInterval(pollingIntervalRef.current);
      };
    }
  }, [currentCity, dispatch]);

  const pageName = useMemo(() => {
    if (location.pathname === "/") return "Dashboard";
    if (currentCity) return `${currentCity.name}, ${currentCity.sys.country}`;
    return "Weather View";
  }, [location.pathname, currentCity]);

  const isNight = currentCity?.weather?.[0].icon.endsWith("n") ?? false;

  useEffect(() => {
    if (isNight) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isNight]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 text-gray-900 dark:text-gray-100 p-8 md:p-16 lg:px-32 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto">
        <Header pageName={pageName} />
        <main>
          <Outlet context={{ currentCity, favoriteCities }} />
        </main>
      </div>
    </div>
  );
};

export default App;
