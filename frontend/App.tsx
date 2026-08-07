import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

import { OnboardingProvider } from "./src/context/OnboardingContext";

import { PlannerProvider } from "./src/context/PlannerContext";

import { UserProvider } from "./src/context/UserContext";

export default function App() {
  return (
    <OnboardingProvider>
      <UserProvider>
        <PlannerProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PlannerProvider>
      </UserProvider>
    </OnboardingProvider>
  );
}
