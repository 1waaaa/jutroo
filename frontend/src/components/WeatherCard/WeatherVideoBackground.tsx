import { StyleSheet, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  condition: string;
}

function getVideo(condition: string) {
  const normalized = condition.toLowerCase();

  if (normalized.includes("rain") || normalized.includes("drizzle")) {
    return require("../../../assets/weather/rain.mp4");
  }

  if (normalized.includes("cloud") || normalized.includes("overcast")) {
    return require("../../../assets/weather/cloudy.mp4");
  }

  if (normalized.includes("night") || normalized.includes("moon")) {
    return require("../../../assets/weather/night.mp4");
  }

  return require("../../../assets/weather/sunny.mp4");
}

export default function WeatherVideoBackground({ condition }: Props) {
  const source = getVideo(condition);

  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <LinearGradient
            colors={[
              "#000000",
              "#000000",
              "#000000",
              "rgba(0,0,0,0.9)",
              "rgba(0,0,0,0.55)",
              "rgba(0,0,0,0.15)",
              "rgba(0,0,0,0)",
            ]}
            locations={[0, 0.45, 0.6, 0.72, 0.84, 0.94, 1]}
            style={StyleSheet.absoluteFill}
          />
        }
      >
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
        />
      </MaskedView>
    </View>
  );
}
