export interface FavoriteCity {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export type TemperatureUnit = "celsius" | "fahrenheit";

// ------ OneCall 3.0 API --------
export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MinutelyData = {
  dt: number;
  precipitation: number;
};

export type HourlyData = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  pop: number; // Probability of precipitation
};

export type DailyTemp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

export type DailyFeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type DailyData = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary?: string;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
};

export type WeatherAlert = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
};

export type WeatherData = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherCondition[];
  };
  minutely?: MinutelyData[];
  hourly?: HourlyData[];
  daily?: DailyData[];
  alerts?: WeatherAlert[];
};

// -------- Reverse Geocoding API ---------
export type LocalNames = {
  [languageCode: string]: string;
};

export type CityLocation = {
  name: string;
  local_names?: LocalNames;
  lat: number;
  lon: number;
  country: string;
};

// ------ Current Weather API ----------
export type CityData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
