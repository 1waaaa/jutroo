import { WeatherResponse } from "../api/weatherApi";

export const mockWeather: WeatherResponse = {
  temperature: 24,
  feelsLike: 26,
  condition: "Sunny",
  description: "Clear sky",

  humidity: 48,
  uv: 7,
  windSpeed: 3.2,

  sunrise: "05:31",
  sunset: "20:04",

  city: "Šabac",
};
