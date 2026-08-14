import { api } from "./client";

import { ConfiguredActivity } from "../constants/activities";

/*
|--------------------------------------------------------------------------
| REQUEST
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| BACKEND RESPONSE
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| FRONTEND SCHEDULE
|--------------------------------------------------------------------------
|
| Ovo je format koji koristi PlannerContext,
| HomeScreen i GeneratedScheduleScreen.
|
*/

export interface ScheduleItem {
  id: number;

  title: string;

  start: string;

  end: string;
}

/*
|--------------------------------------------------------------------------
| ACTIVITY TITLES
|--------------------------------------------------------------------------
|
| Backend vraća type, npr. "UNIVERSITY".
| Frontend želi da prikaže "University".
|
*/

export const ACTIVITY_TITLES: Record<string, string> = {
  UNIVERSITY: "University",

  WORK: "Work",

  GYM: "Gym",

  WALK: "Walk",

  SHOPPING: "Shopping",

  CAFE: "Cafe",

  DINNER: "Dinner",

  DATE: "Date",
};

/*
|--------------------------------------------------------------------------
| GENERATE PLAN
|--------------------------------------------------------------------------
*/

export async function generatePlan(
  request: GeneratePlanRequest,
): Promise<PlanResponse> {
  console.log("========== GENERATE PLAN ==========");
  console.log(request);

  const response = await api.post<PlanResponse>(
    "/api/planner/generate",
    request,
  );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| MAP BACKEND PLAN → FRONTEND SCHEDULE
|--------------------------------------------------------------------------
*/

export function mapPlanToSchedule(plan: BackendPlanItem[]): ScheduleItem[] {
  return plan.map((item, index) => ({
    id: index + 1,

    title: ACTIVITY_TITLES[item.type] ?? item.type,

    start: item.start,

    end: item.end,
  }));
}
