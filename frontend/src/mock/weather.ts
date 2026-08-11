import { WeatherResponse } from "../api/weatherApi";

export const mockWeather: WeatherResponse = {
  temperature: 15,
  feelsLike: 12,
  condition: "Nightly",
  description: "Clear sky",

  humidity: 48,
  uv: 3,
  windSpeed: 3.2,

  sunrise: "05:31",
  sunset: "20:04",

  city: "Šabac",
};
