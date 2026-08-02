import * as Location from "expo-location";

export interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export async function getUserLocation(): Promise<UserLocation> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission denied");
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  const addresses = await Location.reverseGeocodeAsync({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    city: addresses[0]?.city ?? "",
    country: addresses[0]?.country ?? "",
  };
}
