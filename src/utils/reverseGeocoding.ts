import { mockGeocodingData } from "../data/mockData";

export const getCityNameFromCoords = (
  lat: number,
  lon: number
): string | null => {
  const city = mockGeocodingData.find(
    (c) => Math.abs(c.lat - lat) < 0.05 && Math.abs(c.lon - lon) < 0.05
  );
  return city?.name || null;
};
