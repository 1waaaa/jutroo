import { ConfiguredActivity } from "../constants/activities";
import { ScheduleItem } from "../api/plannerApi";

export type RootStackParamList = {
  Startup: undefined;
  Splash: undefined;
  Welcome: undefined;
  Location: undefined;
  Notifications: undefined;
  Camera: undefined;
  AboutYou: undefined;
  Loading: undefined;
  Home: undefined;
  Activities: undefined;

  ReviewPlan: {
    activities: ConfiguredActivity[];
  };
  GeneratingPlan: undefined;
  GeneratedSchedule: undefined;
};
