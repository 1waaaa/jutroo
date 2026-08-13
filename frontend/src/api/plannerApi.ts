import { api } from "./client";

export interface PlannerActivity {
  type: string;
  fixed: boolean;
  duration?: number;
  earliest?: string;
  latest?: string;
  start?: string;
  end?: string;
}

export interface GeneratePlanRequest {
  userId: number;
  activities: PlannerActivity[];
}

export interface PlannerResponse {
  message: string;
  activities: PlannerActivity[];
}

export async function generatePlan(request: GeneratePlanRequest) {
  const response = await api.post<PlannerResponse>("/api/planner/", request);

  return response.data;
}
