import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import WeatherCard from "../../components/home/WeatherCard/WeatherCard";
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
import { useOnboarding } from "../../context/OnboardingContext";

import { WeatherResponse, getCurrentWeather } from "../../api/weatherApi";

import { HydrationResponse, getWaterGoal } from "../../api/hydrationApi";

import { mockWeather } from "../../mock/weather";
import { mockHydration } from "../../mock/hydration";
import { mockSchedule } from "../../mock/schedule";

import Footer from "../../components/home/Footer";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

/*
 * ============================================================
 * DEVELOPMENT ONLY
 * ============================================================
 *
 * true  -> Home can be previewed without onboarding/backend user
 * false -> Home uses real backend data only
 *
 * Kada zavrsimo testiranje UI-ja:
 *
 * const TEST_HOME = false;
 *
 * ============================================================
 */
const TEST_HOME = false;

const WEATHER_REFRESH_INTERVAL = 60 * 60 * 1000;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { outfit } = useOutfit();

  const { userId } = useUser();

  const { data } = useOnboarding();

  const { schedule, hasSchedule } = usePlanner();

  const [loading, setLoading] = useState(true);

  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [hydration, setHydration] = useState<HydrationResponse | null>(null);

  const weatherLoading = useRef(false);

  /*
   * ============================================================
   * WEATHER REFRESH
   * ============================================================
   */

  const refreshWeather = useCallback(async () => {
    /*
     * In test mode we don't need backend refresh.
     */
    if (TEST_HOME) {
      return;
    }

    if (weatherLoading.current || !userId) {
      return;
    }

    weatherLoading.current = true;

    try {
      const weatherData = await getCurrentWeather(userId);

      setWeather(weatherData);
    } catch (error) {
      console.log("Weather refresh failed.", error);
    } finally {
      weatherLoading.current = false;
    }
  }, [userId]);

  /*
   * ============================================================
   * LOAD HOME
   * ============================================================
   */

  useEffect(() => {
    async function loadHome() {
      /*
       * --------------------------------------------------------
       * TEST MODE
       * --------------------------------------------------------
       *
       * Use mock data only to preview the Home UI.
       * This does NOT affect the real backend flow.
       */
      if (TEST_HOME) {
        setWeather(mockWeather);
        setHydration(mockHydration);

        setLoading(false);

        return;
      }

      /*
       * --------------------------------------------------------
       * REAL BACKEND MODE
       * --------------------------------------------------------
       */

      if (!userId) {
        setLoading(false);

        return;
      }

      try {
        const [weatherData, hydrationData] = await Promise.all([
          getCurrentWeather(userId),
          getWaterGoal(userId),
        ]);

        setWeather(weatherData);

        setHydration(hydrationData);
      } catch (error) {
        console.log("Home loading failed.", error);
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, [userId]);

  /*
   * ============================================================
   * REFRESH WEATHER EVERY HOUR
   * ============================================================
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
   * ============================================================
   * REFRESH WEATHER WHEN APP BECOMES ACTIVE
   * ============================================================
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

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading || !weather || !hydration) {
    return null;
  }

  /*
   * ============================================================
   * HOME
   * ============================================================
   */

  return (
    <DayThemeProvider>
      <DayBackground>
        <ScrollScreenContainer>
          <WeatherCard
            temperature={weather.temperature}
            condition={weather.condition}
            uv={weather.uvIndex}
          />

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

          <HydrationCard waterGoal={hydration.goal} />

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

          <Footer />
        </ScrollScreenContainer>
      </DayBackground>
    </DayThemeProvider>
  );
}
