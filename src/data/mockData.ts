import type { CityData } from "../types";

export const mockWeatherData: CityData[] = [
  {
    coord: {
      lon: 77.6033,
      lat: 12.9762,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02n",
      },
    ],
    base: "stations",
    main: {
      temp: 294.79,
      feels_like: 294.94,
      temp_min: 293.95,
      temp_max: 295.38,
      pressure: 1014,
      humidity: 74,
      sea_level: 1014,
      grnd_level: 917,
    },
    visibility: 6000,
    wind: {
      speed: 4.02,
      deg: 270,
      gust: 8.94,
    },
    clouds: {
      all: 20,
    },
    dt: 1762020931,
    sys: {
      type: 2,
      id: 2105374,
      country: "IN",
      sunrise: 1761957790,
      sunset: 1761999783,
    },
    timezone: 19800,
    id: 1277333,
    name: "Bengaluru",
    cod: 200,
  },
  {
    coord: { lon: 72.8777, lat: 19.076 },
    weather: [
      { id: 802, main: "Clear", description: "scattered clouds", icon: "03d" },
    ],
    base: "stations",
    main: {
      temp: 298.12,
      feels_like: 299.2,
      temp_min: 297.15,
      temp_max: 299.15,
      pressure: 1010,
      humidity: 78,
    },
    visibility: 7000,
    wind: { speed: 3.5, deg: 250 },
    clouds: { all: 40 },
    dt: 1762020931,
    sys: {
      country: "IN",
      sunrise: 1761956790,
      sunset: 1761999783,
    },
    timezone: 19800,
    id: 1275339,
    name: "Mumbai",
    cod: 200,
  },
];
