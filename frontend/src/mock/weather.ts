import { WeatherResponse } from "../api/weatherApi";

export const mockWeather: WeatherResponse = {
  temperature: 25,
  feelsLike: 12,
  condition: "Sunny",
  description: "Clear sky",

  humidity: 48,
  uv: 6,
  windSpeed: 3.2,

  sunrise: "05:31",
  sunset: "20:04",

  city: "Šabac",
};
