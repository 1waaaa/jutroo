import { api } from "./client";

export interface PlannerActivity {
  type: string;
  duration: number;
  earliest: string;
  latest: string;
  fixed: boolean;
}

export interface GeneratePlanRequest {
  userId: number;
  activities: PlannerActivity[];
}

export interface ScheduleItem {
  id: number;
  emoji: string;
  title: string;
  start: string;
  end: string;
}

export interface PlanResponse {
  items: ScheduleItem[];
}

export async function generatePlan(request: GeneratePlanRequest) {
  console.log("========== GENERATE PLAN ==========");
  console.log(request);

  // Kasnije:
  // return (await api.post("/api/plans/generate", request)).data;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { success: true };
}

export async function getPlan(userId: number) {
  const response = await api.get<PlanResponse>(`/api/plans/${userId}`);

  return response.data;
}
