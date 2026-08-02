import { api } from "./client";

export function registerUser(data: any) {
  return api.post("/users/register", data);
}
