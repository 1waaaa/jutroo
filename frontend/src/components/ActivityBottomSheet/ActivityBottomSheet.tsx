import { StyleSheet, Text } from "react-native";

import BottomSheet from "../BottomSheet/BottomSheet";

import ActivityForm from "../../components/planner/ActivityForm";

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

  function handleSave(config: ConfiguredActivity) {
    onSave(config);

    onClose();
  }

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.emoji}>{activity.emoji}</Text>

      <Text style={styles.title}>{activity.title}</Text>

      <Text style={styles.subtitle}>Configure today's activity</Text>

      <ActivityForm
        activity={activity}
        initialConfiguration={configuration}
        onSave={handleSave}
      />
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

    marginTop: 8,
  },

  subtitle: {
    fontSize: 15,

    color: Colors.subtitle,

    textAlign: "center",

    marginTop: 8,

    marginBottom: 26,
  },
});
