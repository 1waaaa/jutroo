import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../theme/colors";

interface ProgressBarProps {
  step: number;
  total: number;
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const progress = (step / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${progress}%` as `${number}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.text}>
        Step {step} of {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },

  track: {
    width: "100%",
    height: 4,
    backgroundColor: Colors.mist,
    borderRadius: 999,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    backgroundColor: Colors.coral,
    borderRadius: 999,
  },

  text: {
    marginTop: 10,

    textAlign: "center",

    color: Colors.subtitle,

    fontSize: 12,

    fontWeight: "600",

    letterSpacing: 0.2,
  },
});
