import { api } from "./client";

export interface HydrationResponse {
  goal: number;
}

export async function getWaterGoal(planId: number): Promise<HydrationResponse> {
  const response = await api.get<HydrationResponse>(
    `/api/plans/${planId}/water`,
  );

  return response.data;
}
