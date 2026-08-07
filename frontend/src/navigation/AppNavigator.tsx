import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartupScreen from "../screens/Startup/StartupScreen";
import SplashScreen from "../screens/Splash/SplashScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import LocationScreen from "../screens/Location/LocationScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import CameraScreen from "../screens/Camera/CameraScreen";
import AboutYouScreen from "../screens/AboutYou/AboutYouScreen";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ActivitiesScreen from "../screens/Activities/ActivitiesScreen";
import ReviewPlanScreen from "../screens/ReviewPlan/ReviewPlanScreen";
import GeneratingPlanScreen from "../screens/GeneratingPlan/GeneratingPlanScreen";
import GeneratedSchedule from "../screens/GeneratedSchedule/GeneratedSchedule";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Startup" component={StartupScreen} />

      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      <Stack.Screen name="Location" component={LocationScreen} />

      <Stack.Screen name="Notifications" component={NotificationsScreen} />

      <Stack.Screen name="Camera" component={CameraScreen} />

      <Stack.Screen name="AboutYou" component={AboutYouScreen} />

      <Stack.Screen name="Loading" component={LoadingScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Activities" component={ActivitiesScreen} />

      <Stack.Screen name="ReviewPlan" component={ReviewPlanScreen} />

      <Stack.Screen name="GeneratingPlan" component={GeneratingPlanScreen} />

      <Stack.Screen name="GeneratedSchedule" component={GeneratedSchedule} />
    </Stack.Navigator>
  );
}
