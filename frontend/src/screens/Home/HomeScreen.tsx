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

import Footer from "../../components/home/Footer";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const WEATHER_REFRESH_INTERVAL = 60 * 60 * 1000;

/*
 * Fallback weather.
 *
 * Koristi se samo ako weather još nije učitan
 * ili backend trenutno nije dostupan.
 *
 * Kada API vrati pravi weather,
 * Home će automatski koristiti stvarne podatke.
 */
const fallbackWeather: WeatherResponse = {
  temperature: 24,
  uvIndex: 3,
  condition: "Partly cloudy",
  weatherCode: 2,
  isDay: 1,
  hourly: [],
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { outfit } = useOutfit();

  const { userId } = useUser();

  const { schedule, hasSchedule } = usePlanner();

  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const weatherLoading = useRef(false);

  /*
   * Ako pravi weather postoji,
   * koristi njega.
   *
   * Ako ne postoji, koristi fallback.
   */
  const displayWeather = weather ?? fallbackWeather;

  /*
   * WEATHER
   */

  const refreshWeather = useCallback(async () => {
    if (weatherLoading.current || !userId) {
      return;
    }

    weatherLoading.current = true;

    try {
      const weatherData = await getCurrentWeather(userId);

      setWeather(weatherData);
    } catch (error) {
      console.log("Weather refresh failed:", error);

      /*
       * Namerno ne brišemo postojeći weather.
       *
       * Ako je prethodni API poziv uspeo,
       * zadržavamo njegove podatke.
       *
       * Ako nikada nije uspeo,
       * displayWeather koristi fallback.
       */
    } finally {
      weatherLoading.current = false;
    }
  }, [userId]);

  /*
   * Initial weather load.
   *
   * Home više ne čeka weather da bi se prikazao.
   * Weather će se učitati u pozadini.
   */

  useEffect(() => {
    refreshWeather();
  }, [refreshWeather]);

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
   * Refresh weather when app becomes active.
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
   * HOME
   */

  return (
    <DayThemeProvider>
      <DayBackground>
        <ScrollScreenContainer>
          <WeatherCard
            temperature={displayWeather.temperature}
            condition={displayWeather.condition}
            uv={displayWeather.uvIndex}
            isDay={displayWeather.isDay}
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

          <HydrationCard waterGoal={2.3} />

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
