// AQI color logic
export const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return "text-green-600";
  if (aqi <= 100) return "text-yellow-600";
  if (aqi <= 150) return "text-orange-600";
  return "text-red-600";
};

// Card background color based on weather and day/night
export const getCardBg = (condition: string, isNight: boolean) => {
  const cond = condition.toLowerCase();

  if (isNight) {
    switch (cond) {
      case "clear":
        return "from-blue-900 to-slate-800";
      case "thunderstorm":
        return "from-purple-900 to-slate-800";
      case "drizzle":
        return "from-blue-800 to-slate-800";
      case "rain":
        return "from-blue-900 to-gray-800";
      case "snow":
        return "from-blue-700 to-slate-700";
      case "clouds":
      case "haze":
      case "fog":
        return "from-gray-800 to-slate-700";
      default:
        return "bg-slate-800";
    }
  } else {
    switch (cond) {
      case "clear":
        return "from-yellow-100 to-white";
      case "thunderstorm":
        return "from-purple-200 to-white";
      case "drizzle":
        return "from-blue-200 to-white";
      case "rain":
        return "from-blue-300 to-white";
      case "snow":
        return "from-blue-50 to-white";
      case "clouds":
      case "haze":
      case "fog":
        return "from-gray-100 to-white";
      default:
        return "bg-white";
    }
  }
};
