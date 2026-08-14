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

import { WeatherResponse, getCurrentWeather } from "../../api/weatherApi";

import { HydrationResponse, getWaterGoal } from "../../api/hydrationApi";

import Footer from "../../components/home/Footer";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const WEATHER_REFRESH_INTERVAL = 60 * 60 * 1000;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { outfit } = useOutfit();

  const { userId } = useUser();

  const { schedule, hasSchedule } = usePlanner();

  const [loading, setLoading] = useState(true);

  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [hydration, setHydration] = useState<HydrationResponse | null>(null);

  const weatherLoading = useRef(false);

  const refreshWeather = useCallback(async () => {
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

  useEffect(() => {
    async function loadHome() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      refreshWeather();
    }, WEATHER_REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [refreshWeather]);

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
            uv={weather.uvIndex}
            isDay={weather.isDay}
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
