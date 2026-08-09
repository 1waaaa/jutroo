import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
  const [pickerOpen, setPickerOpen] = useState(false);

  if (!activity) {
    return null;
  }

  function handleSave(config: ConfiguredActivity) {
    onSave(config);
    onClose();
  }

  function handlePickerChange(open: boolean) {
    setPickerOpen(open);
  }

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {!pickerOpen && (
          <View style={styles.header}>
            <Text style={styles.emoji}>{activity.emoji}</Text>

            <Text style={styles.title}>{activity.title}</Text>

            <Text style={styles.subtitle}>Configure today's activity</Text>
          </View>
        )}

        <ActivityForm
          activity={activity}
          initialConfiguration={configuration}
          onSave={handleSave}
          onPickerChange={handlePickerChange}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  emoji: {
    fontSize: 48,
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginTop: 4,
  },

  subtitle: {
    fontSize: 15,
    color: Colors.subtitle,
    textAlign: "center",
    marginTop: 7,
  },
});
