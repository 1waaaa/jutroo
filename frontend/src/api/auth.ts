import { api } from "./client";

export interface RegisterUserRequest {
  username: string;
  height: number;
  weight: number;
  city: string;
  latitude: number;
  longitude: number;
}

export interface UserResponse {
  id: number;
  username: string;
  height: number;
  weight: number;
  city: string;
  latitude: number;
  longitude: number;
}

export async function registerUser(data: RegisterUserRequest) {
  const response = await api.post<UserResponse>("/api/auth/register", data);

  return response.data;
}
