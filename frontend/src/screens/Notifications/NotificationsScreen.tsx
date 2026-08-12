import { useState } from "react";
import { Bell } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import PermissionCard from "../../components/PermissionCard/PermissionCard";
import SuccessCard from "../../components/SuccessCard/SuccessCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

import { Colors } from "../../theme/colors";

import { requestNotificationPermission } from "../../services/notificationService";

import { useOnboarding } from "../../context/OnboardingContext";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type NotificationsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Notifications"
>;

export default function NotificationsScreen() {
  const navigation = useNavigation<NotificationsNavigationProp>();

  const { updateData } = useOnboarding();

  const [enabled, setEnabled] = useState(false);

  async function handleNotifications() {
    const granted = await requestNotificationPermission();

    updateData({
      notificationsEnabled: granted,
    });

    setEnabled(granted);
  }

  return (
    <ScreenContainer>
      <ProgressBar step={3} total={5} />

      {!enabled ? (
        <PermissionCard
          icon={<Bell size={82} color={Colors.coral} strokeWidth={1.7} />}
          title="Stay one step ahead."
          subtitle="Receive reminders for water, UV and your daily schedule."
          buttonTitle="Allow Notifications"
          footer="You can change this later."
          onPress={handleNotifications}
        />
      ) : (
        <SuccessCard
          icon={<Bell size={60} color={Colors.coral} strokeWidth={1.7} />}
          title="Great!"
          subtitle="Notifications are ready."
          buttonTitle="Continue"
          onPress={() => navigation.navigate("Camera")}
        />
      )}
    </ScreenContainer>
  );
}
