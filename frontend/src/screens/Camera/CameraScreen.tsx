import { useState } from "react";

import { Camera } from "lucide-react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../navigation/types";

import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import PermissionCard from "../../components/PermissionCard/PermissionCard";
import SuccessCard from "../../components/SuccessCard/SuccessCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

import { Colors } from "../../theme/colors";

import { requestCameraPermission } from "../../services/cameraService";
import { useOnboarding } from "../../context/OnboardingContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Camera">;

export default function CameraScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { updateData } = useOnboarding();

  const [enabled, setEnabled] = useState(false);

  async function handleCamera() {
    const granted = await requestCameraPermission();

    updateData({
      cameraEnabled: granted,
    });

    setEnabled(granted);
  }

  return (
    <ScreenContainer>
      <ProgressBar step={4} total={5} />

      {!enabled ? (
        <PermissionCard
          icon={<Camera size={82} color={Colors.coral} strokeWidth={1.7} />}
          title="Need outfit advice later?"
          subtitle="We'll only use your camera when you ask for outfit recommendations."
          buttonTitle="Allow Camera"
          footer="Only used when you take a photo."
          onPress={handleCamera}
        />
      ) : (
        <SuccessCard
          icon={<Camera size={60} color={Colors.coral} strokeWidth={1.7} />}
          title="Awesome!"
          subtitle="Camera is ready."
          buttonTitle="Continue"
          onPress={() => navigation.navigate("AboutYou")}
        />
      )}
    </ScreenContainer>
  );
}
