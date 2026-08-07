import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import GreetingCard from "../../components/GreetingCard/GreetingCard";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import HydrationCard from "../../components/HydrationCard/HydrationCard";
import TodayScheduleCard from "../../components/home/TodayScheduleCard";
import CTAActionCard from "../../components/CTAActionCard/CTAActionCard";
import AppLoader from "../../components/AppLoader/AppLoader";

import { useOnboarding } from "../../context/OnboardingContext";
import { usePlanner } from "../../context/PlannerContext";
import { useUser } from "../../context/UserContext";

import { WeatherResponse, getCurrentWeather } from "../../api/weatherApi";

import { HydrationResponse, getWaterGoal } from "../../api/hydrationApi";

// import { getPlan } from "../../api/plannerApi";

import { mockWeather } from "../../mock/weather";
import { mockHydration } from "../../mock/hydration";
import { mockSchedule } from "../../mock/schedule";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const USE_MOCK_DATA = true;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { data } = useOnboarding();

  const { userId } = useUser();

  const { schedule, setSchedule, hasSchedule } = usePlanner();

  const [loading, setLoading] = useState(true);

  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [hydration, setHydration] = useState<HydrationResponse | null>(null);

  useEffect(() => {
    async function loadHome() {
      try {
        if (USE_MOCK_DATA) {
          setWeather(mockWeather);

          setHydration(mockHydration);

          if (!hasSchedule) {
            setSchedule(mockSchedule);
          }

          return;
        }

        if (!userId) {
          console.log("User ID not found.");

          return;
        }

        const weatherData = await getCurrentWeather(userId);

        const hydrationData = await getWaterGoal(userId);

        setWeather(weatherData);

        setHydration(hydrationData);

        // kasnije
        // const plan = await getPlan(userId);
        // setSchedule(plan.items);
      } catch (error) {
        console.log(error);

        setWeather(mockWeather);

        setHydration(mockHydration);

        if (!hasSchedule) {
          setSchedule(mockSchedule);
        }
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, []);

  if (loading || !weather || !hydration) {
    return <AppLoader text="Loading your morning..." />;
  }

  return (
    <ScrollScreenContainer>
      <GreetingCard username={data.username} />

      <WeatherCard
        temperature={weather.temperature}
        condition={weather.condition}
        feelsLike={weather.feelsLike}
        uv={weather.uv}
      />

      <HydrationCard waterGoal={hydration.goal} />

      <TodayScheduleCard
        schedule={schedule}
        onPress={() => navigation.navigate("GeneratedSchedule")}
      />

      <CTAActionCard
        title={
          hasSchedule
            ? "Want to update your schedule?"
            : "Start planning your day"
        }
        subtitle={
          hasSchedule
            ? "Generate a brand new optimized schedule."
            : "Tell us what you need to accomplish today."
        }
        buttonTitle={
          hasSchedule ? "Regenerate Schedule" : "Create Today's Plan"
        }
        onPress={() => navigation.navigate("Activities")}
      />
    </ScrollScreenContainer>
  );
}
