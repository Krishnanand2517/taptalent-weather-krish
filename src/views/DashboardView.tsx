import { mockWeatherData } from "../data/mockData";
import WeatherCard from "../components/WeatherCard";

const DashboardView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockWeatherData.map((city) => (
        <WeatherCard key={city.id} cityData={city} />
      ))}
    </div>
  );
};

export default DashboardView;
