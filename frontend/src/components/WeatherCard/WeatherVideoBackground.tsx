import { StyleSheet, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
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
    <View pointerEvents="none" style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Blago posvetljava ceo video */}
      <View style={styles.lightOverlay} />

      {/* Smooth gradient dole */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,0)",
          "rgba(248,251,255,0.12)",
          "rgba(248,251,255,0.55)",
        ]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  lightOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(255,255,255,0.12)",
  },
});
