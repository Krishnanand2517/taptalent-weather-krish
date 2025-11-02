import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconCloud,
  IconCloudRain,
  IconPin,
  IconTemperature,
  IconTemperatureSnow,
  IconTrendingUp,
  IconWind,
} from "@tabler/icons-react";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchDetailedWeather } from "../slices/detailedWeatherSlice";
import {
  addFavoriteAsync,
  removeFavoriteAsync,
} from "../slices/favoritesSlice";
import {
  selectDetailedWeather,
  selectDetailedWeatherLoading,
  selectIsFavorite,
  selectTemperatureUnit,
} from "../selectors";
import {
  formatDate,
  formatTime,
  getRelativeTime,
} from "../utils/timeFormatting";
import { getCardBg } from "../utils/colors";
import { getTemperatureDisplay } from "../utils/tempConversion";
import AlertBox from "../components/AlertBox";
import DetailsGrid from "../components/DetailsGrid";
import SunTimings from "../components/SunTimings";
import HourlyChart from "../components/HourlyChart";
import HourlyScroll from "../components/HourlyScroll";
import RainChart from "../components/RainChart";
import DailyChart from "../components/DailyChart";
import WindChart from "../components/WindChart";
import { getWindDirection } from "../utils/windDirection";
import WindCompass from "../components/WindCompass";
import DailyPrediction from "../components/DailyPrediction";
import { setCurrentCity } from "../slices/currentCitySlice";

const DetailedView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.currentCity.city);
  const detailedWeather = useAppSelector(selectDetailedWeather);
  const loading = useAppSelector(selectDetailedWeatherLoading);
  const unit = useAppSelector(selectTemperatureUnit);

  const isPinned = useAppSelector((state) =>
    currentCity ? selectIsFavorite(currentCity.id)(state) : false
  );

  const [lastUpdated, setLastUpdated] = useState(() =>
    currentCity ? getRelativeTime(currentCity.dt) : ""
  );

  useEffect(() => {
    if (!currentCity) return;

    const interval = setInterval(() => {
      setLastUpdated(getRelativeTime(currentCity.dt));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentCity]);

  useEffect(() => {
    if (currentCity) {
      dispatch(
        fetchDetailedWeather({
          lat: currentCity.coord.lat,
          lon: currentCity.coord.lon,
        })
      );

      // Set up polling for detailed weather (every 1 minute)
      const interval = setInterval(() => {
        dispatch(
          fetchDetailedWeather({
            lat: currentCity.coord.lat,
            lon: currentCity.coord.lon,
          })
        );
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [currentCity, dispatch]);

  // Clear current city when component unmounts (navigating back)
  useEffect(() => {
    return () => {
      dispatch(setCurrentCity(null));
    };
  }, [dispatch]);

  const handleBackNavigation = () => {
    dispatch(setCurrentCity(null));
    navigate("/");
  };

  const handleTogglePin = () => {
    if (!currentCity) return;

    if (isPinned) {
      dispatch(removeFavoriteAsync(currentCity.id));
    } else {
      dispatch(
        addFavoriteAsync({
          id: currentCity.id,
          name: currentCity.name,
          country: currentCity.sys.country,
          lat: currentCity.coord.lat,
          lon: currentCity.coord.lon,
        })
      );
    }
  };

  if (!currentCity) {
    navigate("/");
    return null;
  }

  if (loading || !detailedWeather) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading detailed weather...
          </p>
        </div>
      </div>
    );
  }

  const { weather } = currentCity;
  const { current, hourly, daily, alerts } = detailedWeather;

  const condition = weather[0].main ?? "Unknown";
  const icon = weather[0].icon ?? "";

  // Convert temperatures based on selected unit
  const temperature = getTemperatureDisplay(current.temp, unit);
  const feelsLike = getTemperatureDisplay(current.feels_like, unit);
  const dewPoint = getTemperatureDisplay(current.dew_point, unit);

  const isNight = icon.endsWith("n");

  const hourlyChartData =
    hourly?.slice(0, 12).map((h) => ({
      time: formatTime(h.dt),
      temp: getTemperatureDisplay(h.temp, unit).value,
      feelsLike: getTemperatureDisplay(h.feels_like, unit).value,
      pop: Math.round(h.pop * 100),
    })) || [];

  const dailyTempData =
    daily?.map((day) => ({
      date: formatDate(day.dt),
      max: getTemperatureDisplay(day.temp.max, unit).value,
      min: getTemperatureDisplay(day.temp.min, unit).value,
      avg: getTemperatureDisplay((day.temp.max + day.temp.min) / 2, unit).value,
    })) || [];

  const windData =
    hourly?.slice(0, 12).map((h) => ({
      time: formatTime(h.dt),
      speed: h.wind_speed,
      direction: getWindDirection(h.wind_deg),
      deg: h.wind_deg,
    })) || [];

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleBackNavigation}
          className="flex items-center space-x-1 text-sm cursor-pointer transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
        >
          <IconArrowLeft className="w-4 h-4" />
          <span className="font-semibold md:text-lg">Back</span>
        </button>
      </div>

      <div className="space-y-12 text-gray-800 dark:text-gray-100">
        <AlertBox alerts={alerts} />

        {/* Current Weather - Hero Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-white/20">
          <div
            className={`absolute inset-0 bg-linear-to-br ${getCardBg(
              condition,
              isNight
            )} opacity-20`}
          ></div>

          <div className="relative backdrop-blur-xl p-8 transition-all duration-500 text-gray-900 dark:text-gray-100">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <IconCloud className="w-20 h-20 text-neutral-800 dark:text-white" />
                  <div>
                    <div className="text-7xl font-bold text-neutral-800 dark:text-white">
                      {temperature.value}°
                    </div>
                    <p className="text-2xl text-gray-700 dark:text-blue-100 capitalize mt-2">
                      {current.weather[0].description}
                    </p>
                  </div>
                </div>
                <div className="text-neutral-900 dark:text-white/80 text-lg">
                  Feels like {feelsLike.formatted}
                </div>

                <button
                  onClick={handleTogglePin}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 ${
                    isPinned
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/50"
                      : "bg-neutral-900/20 text-neutral-800 hover:bg-neutral-900/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30 backdrop-blur-sm border border-white/30"
                  }`}
                >
                  <IconPin
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isPinned ? "-rotate-45" : ""
                    }`}
                  />
                  {isPinned ? "Pinned" : "Pin to Dashboard"}
                </button>
              </div>

              <DetailsGrid
                wind_speed={current.wind_speed}
                wind_deg={current.wind_deg}
                humidity={current.humidity}
                visibility={current.visibility}
                pressure={current.pressure}
                dewPoint={dewPoint.value}
                uvi={current.uvi}
                unit={unit}
              />
            </div>

            <SunTimings
              sunrise={current.sunrise}
              sunset={current.sunset}
              lastUpdated={lastUpdated}
            />
          </div>
        </div>

        <div className="space-y-12">
          {/* Hourly Forecast Chart */}
          <div className="bg-neutral-800/10 dark:bg-white/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconTemperature className="w-6 h-6" />
              12-Hour Forecast
            </h2>
            <div className="h-64">
              <HourlyChart hourlyChartData={hourlyChartData} unit={unit} />
            </div>
            <HourlyScroll hourly={hourly} unit={unit} />
          </div>

          {/* Precipitation Chart */}
          <div className="bg-blue-800/10 dark:bg-blue-200/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconCloudRain className="w-6 h-6" />
              Rain Probability
            </h2>
            <div className="h-48">
              <RainChart hourlyChartData={hourlyChartData} />
            </div>
          </div>

          {/* Wind Chart */}
          <div className="bg-neutral-800/10 dark:bg-white/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconWind className="w-6 h-6" />
              Wind Speed & Direction
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <WindCompass
                wind_deg={current.wind_deg}
                wind_speed={current.wind_speed}
                wind_gust={current.wind_gust}
              />

              {/* 12-hour wind speed chart */}
              <div className="flex flex-col">
                <h3 className="text-neutral-900 dark:text-white text-lg font-semibold mb-3">
                  12-Hour Wind Speed
                </h3>
                <div className="flex-1" style={{ minHeight: "280px" }}>
                  <WindChart windData={windData} />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Temperature Chart */}
          <div className="bg-amber-800/10 dark:bg-amber-200/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconTrendingUp className="w-6 h-6" />
              Daily Temperature
            </h2>
            <div className="h-64">
              <DailyChart dailyTempData={dailyTempData} unit={unit} />
            </div>
          </div>

          {/* 7-Day Prediction */}
          <div className="bg-blue-800/10 dark:bg-blue-200/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconTemperatureSnow className="w-6 h-6" />
              7-Day Forecast
            </h2>

            <div className="space-y-3 md:p-6">
              {daily?.map((day, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm border border-neutral-900/20 dark:border-white/20 rounded-xl p-4 hover:bg-neutral-900/20 dark:hover:bg-white/20 transition-all duration-300"
                  >
                    <DailyPrediction day={day} idx={idx} unit={unit} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
