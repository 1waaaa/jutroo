import { StyleSheet, Text } from "react-native";

import BottomSheet from "../BottomSheet/BottomSheet";

import TimeRangeForm from "./forms/TimeRangeForm";

import { Activity, ConfiguredActivity } from "../../constants/activities";

import { Colors } from "../../theme/colors";

interface Props {
  activity: Activity | null;

  visible: boolean;

  configuration?: ConfiguredActivity;

  onClose: () => void;

  onSave: (configuration: ConfiguredActivity) => void;
}

export default function ActivityBottomSheet({
  activity,
  visible,
  configuration,
  onClose,
  onSave,
}: Props) {
  if (!activity) return null;

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.emoji}>{activity.emoji}</Text>

      <Text style={styles.title}>{activity.title}</Text>

      <Text style={styles.subtitle}>Configure activity</Text>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: 54,

    textAlign: "center",

    marginTop: 6,
  },

  title: {
    fontSize: 30,

    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",

    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,

    color: Colors.subtitle,

    textAlign: "center",

    marginBottom: 28,

    marginTop: 8,
  },
});
