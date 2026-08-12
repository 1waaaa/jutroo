import { useState } from "react";
import { Alert } from "react-native";
import { MapPin } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import PermissionCard from "../../components/PermissionCard/PermissionCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import LocationCard from "../../components/LocationCard/LocationCard";

import { Colors } from "../../theme/colors";

import { getUserLocation } from "../../services/locationService";
import { useOnboarding } from "../../context/OnboardingContext";

import { RootStackParamList } from "../../navigation/types";

type LocationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Location"
>;

export default function LocationScreen() {
  const navigation = useNavigation<LocationNavigationProp>();

  const { updateData } = useOnboarding();

  const [loading, setLoading] = useState(false);
  const [locationFound, setLocationFound] = useState(false);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  async function handleLocation() {
    setLoading(true);

    try {
      const location = await getUserLocation();

      setCity(location.city);
      setCountry(location.country);

      updateData({
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        country: location.country,
      });

      setLocationFound(true);
    } catch {
      Alert.alert(
        "Location Permission",
        "Please allow location access so we can personalize your daily plan.",
        [
          {
            text: "Got it",
            style: "default",
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      {!locationFound ? (
        <>
          <ProgressBar step={2} total={5} />

          <PermissionCard
            icon={<MapPin size={82} color={Colors.coral} strokeWidth={1.7} />}
            title="Where does your day begin?"
            subtitle="We'll use your location to create weather-aware daily plans."
            buttonTitle={
              loading ? "Finding Location..." : "Use Current Location"
            }
            footer="Only used to personalize your experience."
            onPress={handleLocation}
          />
        </>
      ) : (
        <LocationCard
          city={city}
          country={country}
          onConfirm={() => navigation.navigate("Notifications")}
        />
      )}
    </ScreenContainer>
  );
}
