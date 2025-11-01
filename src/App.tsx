import { useMemo } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

import Header from "./components/Header";
import { mockWeatherData } from "./data/mockData";

const App = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const location = useLocation();

  const pageName = useMemo(() => {
    if (location.pathname === "/") {
      return "Dashboard";
    }

    if (cityId) {
      const idMatch = cityId.match(/^city-(\d+)$/);
      if (idMatch) {
        const cityIdNumber = Number(idMatch[1]);
        const city = mockWeatherData.find((city) => city.id === cityIdNumber);
        return city?.name || "City Not Found";
      }
    }

    return "Weather View";
  }, [location.pathname, cityId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900 p-8 md:p-16 lg:px-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Header pageName={pageName} />

        <main>
          <Outlet context={{ weatherData: mockWeatherData }} />
        </main>
      </div>
    </div>
  );
};

export default App;
