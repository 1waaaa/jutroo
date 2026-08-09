import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

import { OnboardingProvider } from "./src/context/OnboardingContext";

import { PlannerProvider } from "./src/context/PlannerContext";

import { UserProvider } from "./src/context/UserContext";

import { OutfitProvider } from "./src/context/OutfitContext";

export default function App() {
  return (
    <OnboardingProvider>
      <UserProvider>
        <PlannerProvider>
          <OutfitProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </OutfitProvider>
        </PlannerProvider>
      </UserProvider>
    </OnboardingProvider>
  );
}
