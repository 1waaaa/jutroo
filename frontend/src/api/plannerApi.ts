import { api } from "./client";

export interface PlannerActivity {
  type: string;
  fixed: boolean;
  outdoor: boolean;

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

export interface BackendPlanItem {
  type: string;
  start: string;
  end: string;
  duration: number;
  fixed: boolean;
  outdoor: boolean;
  score?: number;
}

export interface PlanResponse {
  userId: number;

  plan: BackendPlanItem[];

  weather: {
    temperature: number;
    uvIndex: number;
    condition: string;
    weatherCode: number;
    isDay: number;
  };
}

export interface ScheduleItem {
  id: number;
  title: string;
  start: string;
  end: string;
}

const ACTIVITY_TITLES: Record<string, string> = {
  UNIVERSITY: "University",
  WORK: "Work",
  GYM: "Gym",
  WALK: "Walk",
  SHOPPING: "Shopping",
  CAFE: "Cafe",
  DINNER: "Dinner",
  DATE: "Date",
};

export async function generatePlan(
  request: GeneratePlanRequest,
): Promise<PlanResponse> {
  const response = await api.post<PlanResponse>(
    "/api/planner/generate",
    request,
  );

  return response.data;
}

export function mapPlanToSchedule(plan: BackendPlanItem[]): ScheduleItem[] {
  return plan.map((item, index) => ({
    id: index + 1,

    title: ACTIVITY_TITLES[item.type] ?? item.type,

    start: item.start,

    end: item.end,
  }));
}
