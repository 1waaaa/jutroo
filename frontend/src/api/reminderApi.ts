import { api } from "./client";

export interface Reminder {
  id: number;
  title: string;
  body: string;
  time: string;
}

export async function getReminders(planId: number): Promise<Reminder[]> {
  const response = await api.get<Reminder[]>(`/api/plans/${planId}/reminders`);

  return response.data;
}
