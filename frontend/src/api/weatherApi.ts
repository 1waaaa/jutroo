import { api } from "./client";

export interface WeatherResponse {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;

  humidity: number;
  uv: number;
  windSpeed: number;

  sunrise: string;
  sunset: string;

  city: string;
}

export async function getCurrentWeather(userId: number) {
  const response = await api.get<WeatherResponse>(
    `/api/weather/current/${userId}`,
  );

  return response.data;
}
