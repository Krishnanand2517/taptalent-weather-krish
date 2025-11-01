import { useEffect, useMemo } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

import Header from "./components/Header";
import { mockWeatherData } from "./data/mockData";
import type { CityData } from "./types";

const App = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const location = useLocation();

  const currentCity: CityData | null = useMemo(() => {
    if (cityId) {
      const idMatch = cityId.match(/^city-(\d+)$/);
      if (idMatch) {
        const cityIdNumber = Number(idMatch[1]);
        return mockWeatherData.find((city) => city.id === cityIdNumber) || null;
      }
    }

    return null;
  }, [cityId]);

  const pageName = useMemo(() => {
    if (location.pathname === "/") {
      return "Dashboard";
    }

    if (currentCity) {
      return `${currentCity.name}, ${currentCity.sys.country}`;
    }

    return "Weather View";
  }, [location.pathname, currentCity]);

  const isNight = currentCity?.weather?.[0].icon.endsWith("n") ?? false;

  useEffect(() => {
    if (isNight) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isNight]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-neutral-900 dark:via-gray-900 dark:to-neutral-900 text-gray-900 dark:text-gray-100 p-8 md:p-16 lg:px-32 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto">
        <Header pageName={pageName} />

        <main>
          <Outlet context={{ weatherData: mockWeatherData, currentCity }} />
        </main>
      </div>
    </div>
  );
};

export default App;
