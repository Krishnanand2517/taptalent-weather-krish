// AQI color logic
export const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return "text-green-600";
  if (aqi <= 100) return "text-yellow-600";
  if (aqi <= 150) return "text-orange-600";
  return "text-red-600";
};

// Card background color based on weather
export const getCardBg = (condition: string) => {
  switch (condition) {
    case "sunny":
      return "from-yellow-100 to-white";
    case "rainy":
      return "from-blue-100 to-white";
    case "snowy":
      return "from-blue-50 to-white";
    case "cloudy":
    case "partly-cloudy":
      return "from-gray-100 to-white";
    default:
      return "bg-white";
  }
};
