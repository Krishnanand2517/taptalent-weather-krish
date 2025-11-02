import type { TemperatureUnit } from "../types";

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const convertTemperature = (
  temp: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number => {
  if (fromUnit === toUnit) return temp;

  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    return celsiusToFahrenheit(temp);
  }

  if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    return fahrenheitToCelsius(temp);
  }

  return temp;
};

export const formatTemperature = (
  temp: number,
  unit: TemperatureUnit,
  decimals: number = 0
): string => {
  const convertedTemp =
    unit === "fahrenheit" ? celsiusToFahrenheit(temp) : temp;

  const rounded =
    decimals > 0 ? convertedTemp.toFixed(decimals) : Math.round(convertedTemp);

  const symbol = unit === "celsius" ? "°C" : "°F";

  return `${rounded}${symbol}`;
};

export const getTemperatureDisplay = (
  tempCelsius: number,
  unit: TemperatureUnit
): { value: number; symbol: string; formatted: string } => {
  const value =
    unit === "fahrenheit"
      ? Math.round(celsiusToFahrenheit(tempCelsius))
      : Math.round(tempCelsius);

  const symbol = unit === "celsius" ? "°C" : "°F";
  const formatted = `${value}${symbol}`;

  return { value, symbol, formatted };
};
