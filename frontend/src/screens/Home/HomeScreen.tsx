import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import HydrationCard from "../../components/HydrationCard/HydrationCard";
import TodayScheduleCard from "../../components/home/TodayScheduleCard";
import OutfitAdvisorCard from "../../components/home/OutfitAdvisorCard";
import TodayOutfitCard from "../../components/home/TodayOutfitCard";
import CTAActionCard from "../../components/CTAActionCard/CTAActionCard";
import DayBackground from "../../components/DayBackground/DayBackground";

import { DayThemeProvider } from "../../context/DayThemeContext";

import { usePlanner } from "../../context/PlannerContext";
import { useUser } from "../../context/UserContext";
import { useOutfit } from "../../context/OutfitContext";

import { WeatherResponse, getCurrentWeather } from "../../api/weatherApi";

import { HydrationResponse, getWaterGoal } from "../../api/hydrationApi";

import { mockWeather } from "../../mock/weather";
import { mockHydration } from "../../mock/hydration";
import { mockSchedule } from "../../mock/schedule";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// false kada backend bude spreman.
const USE_MOCK_DATA = true;

const WEATHER_REFRESH_INTERVAL = 60 * 60 * 1000;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { outfit } = useOutfit();

  const { userId } = useUser();

  const { schedule, setSchedule, hasSchedule } = usePlanner();

  const [loading, setLoading] = useState(true);

  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [hydration, setHydration] = useState<HydrationResponse | null>(null);

  /*
   * Prevent multiple weather requests
   * from running at the same time.
   */
  const weatherLoading = useRef(false);

  /*
   * Fetch current weather.
   *
   * This is separate from the initial
   * Home loading because weather can refresh
   * without reloading the whole screen.
   */
  const refreshWeather = useCallback(async () => {
    if (weatherLoading.current) {
      return;
    }

    weatherLoading.current = true;

    try {
      if (USE_MOCK_DATA) {
        setWeather(mockWeather);
        return;
      }

      if (!userId) {
        console.log("User ID not found.");
        return;
      }

      const weatherData = await getCurrentWeather(userId);

      setWeather(weatherData);
    } catch (error) {
      console.log("Weather refresh failed.", error);

      /*
       * If weather already exists,
       * keep showing it.
       */
      if (!weather) {
        setWeather(mockWeather);
      }
    } finally {
      weatherLoading.current = false;
    }
  }, [userId, weather]);

  /*
   * Initial Home loading.
   */
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

          setWeather(mockWeather);
          setHydration(mockHydration);

          return;
        }

        const weatherData = await getCurrentWeather(userId);

        const hydrationData = await getWaterGoal(userId);

        setWeather(weatherData);
        setHydration(hydrationData);

        /*
         * Later:
         *
         * const plan = await getPlan(userId);
         * setSchedule(plan.items);
         */
      } catch (error) {
        console.log("Home loading failed.", error);

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
  }, [userId, hasSchedule, setSchedule]);

  /*
   * Refresh weather every hour.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      refreshWeather();
    }, WEATHER_REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [refreshWeather]);

  /*
   * Refresh weather whenever the app
   * becomes active again.
   */
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        refreshWeather();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [refreshWeather]);

  if (loading || !weather || !hydration) {
    return null;
  }

  return (
    <DayThemeProvider>
      <DayBackground>
        <ScrollScreenContainer>
          <WeatherCard
            temperature={weather.temperature}
            condition={weather.condition}
            feelsLike={weather.feelsLike}
            uv={weather.uv}
          />

          <TodayScheduleCard
            schedule={schedule}
            onPress={() => navigation.navigate("GeneratedSchedule")}
          />

          <HydrationCard waterGoal={hydration.goal} />

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

          {outfit ? (
            <TodayOutfitCard
              outfit={outfit}
              onPress={() => navigation.navigate("OutfitResult")}
            />
          ) : (
            <OutfitAdvisorCard
              onPress={() => navigation.navigate("OutfitActivity")}
            />
          )}
        </ScrollScreenContainer>
      </DayBackground>
    </DayThemeProvider>
  );
}
