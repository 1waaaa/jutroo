import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import ScrollScreenContainer from "../../components/ScrollScreenContainer/ScrollScreenContainer";
import GreetingCard from "../../components/GreetingCard/GreetingCard";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import HydrationCard from "../../components/HydrationCard/HydrationCard";
import CTAActionCard from "../../components/CTAActionCard/CTAActionCard";
import AppLoader from "../../components/AppLoader/AppLoader";

import { useOnboarding } from "../../context/OnboardingContext";

import { WeatherResponse, getCurrentWeather } from "../../api/weatherApi";

import { mockWeather } from "../../mock/weather";
import { getWaterGoal, HydrationResponse } from "../../api/hydrationApi";

import { mockHydration } from "../../mock/hydration";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// Promeni na false za backend podatke.
const USE_MOCK_DATA = true;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { data } = useOnboarding();

  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [hydration, setHydration] = useState<HydrationResponse | null>(null);

  useEffect(() => {
    async function loadHome() {
      try {
        if (USE_MOCK_DATA) {
          setWeather(mockWeather);
          setHydration(mockHydration);
          return;
        }

        let id = data.userId;

        if (!id) {
          const storedId = await AsyncStorage.getItem("userId");

          if (storedId) {
            id = Number(storedId);
          }
        }

        if (!id) {
          console.log("User ID not found.");

          setWeather(mockWeather);
          setHydration(mockHydration);
          return;
        }

        const weatherData = await getCurrentWeather(id);

        setWeather(weatherData);
        const hydrationData = await getWaterGoal(id);

        setHydration(hydrationData);
      } catch (error) {
        console.log("Weather API unavailable.");

        console.log(error);

        // Ako backend nije gotov ili padne,
        // nastavljamo sa mock podacima.
        setWeather(mockWeather);
        setHydration(mockHydration);
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

      {weather && (
        <WeatherCard
          temperature={weather.temperature}
          condition={weather.condition}
          feelsLike={weather.feelsLike}
          uv={weather.uv}
        />
      )}

      <HydrationCard waterGoal={hydration.goal} />

      <CTAActionCard onPress={() => navigation.navigate("Activities")} />
    </ScrollScreenContainer>
  );
}
