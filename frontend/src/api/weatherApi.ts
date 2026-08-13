import { api } from "./client";

export interface WeatherHour {
  time: string;
  temperature: number;
  uvIndex: number;
  weatherCode: number;
}

export interface WeatherResponse {
  temperature: number;
  uvIndex: number;
  condition: string;
  weatherCode: number;
  isDay: number;
  hourly: WeatherHour[];
}

export async function getCurrentWeather(userId: number) {
  const response = await api.get<WeatherResponse>(
    `/api/weather/current/${userId}`,
  );

  return response.data;
}
