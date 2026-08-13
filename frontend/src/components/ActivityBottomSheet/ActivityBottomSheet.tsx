import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";

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
            <Pressable style={styles.backButton} onPress={onClose}>
              <ChevronLeft size={23} color={Colors.text} strokeWidth={2.4} />
            </Pressable>

            <View style={styles.headerContent}>
              <Text style={styles.title}>{activity.title}</Text>
            </View>
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
    position: "relative",

    alignItems: "center",

    marginBottom: 28,

    paddingTop: 4,
  },

  backButton: {
    position: "absolute",

    left: 0,
    top: 0,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: Colors.mist,

    justifyContent: "center",
    alignItems: "center",
  },

  headerContent: {
    alignItems: "center",

    paddingHorizontal: 50,
  },

  title: {
    fontSize: 30,

    fontWeight: "800",

    color: Colors.text,

    textAlign: "center",

    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 15,

    color: Colors.subtitle,

    textAlign: "center",

    marginTop: 6,
  },
});
