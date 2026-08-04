import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "user_onboarding_completed";

export async function completeOnboarding() {
  await AsyncStorage.setItem(KEY, "true");
}

export async function hasCompletedOnboarding() {
  const value = await AsyncStorage.getItem(KEY);
  return value === "true";
}

export async function resetOnboarding() {
  await AsyncStorage.removeItem(KEY);
}
