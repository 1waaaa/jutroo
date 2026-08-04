import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import LocationScreen from "../screens/Location/LocationScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import CameraScreen from "../screens/Camera/CameraScreen";
import AboutYouScreen from "../screens/AboutYou/AboutYouScreen";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ActivitiesScreen from "../screens/Activities/ActivitiesScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="AboutYou" component={AboutYouScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
    </Stack.Navigator>
  );
}
