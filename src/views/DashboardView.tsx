import WeatherCard from "../components/WeatherCard";
import { useWeatherContext } from "../hooks/useWeatherContext";

const DashboardView = () => {
  const { weatherData } = useWeatherContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {weatherData.map((city) => (
        <WeatherCard key={city.id} cityData={city} />
      ))}
    </div>
  );
};

export default DashboardView;
