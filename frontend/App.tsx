import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

import { OnboardingProvider } from "./src/context/OnboardingContext";

export default function App() {
  return (
    <OnboardingProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </OnboardingProvider>
  );
}
