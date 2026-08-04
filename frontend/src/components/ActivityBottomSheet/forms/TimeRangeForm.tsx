import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import { Colors } from "../../../theme/colors";
import { ConfiguredActivity } from "../../../constants/activities";

interface Props {
  activityId: string;
  initialConfiguration?: ConfiguredActivity;
  onSave: (config: ConfiguredActivity) => void;
}

export default function TimeRangeForm({
  activityId,
  initialConfiguration,
  onSave,
}: Props) {
  const [startTime, setStartTime] = useState(
    initialConfiguration?.startTime
      ? stringToDate(initialConfiguration.startTime)
      : stringToDate("09:00"),
  );

  const [endTime, setEndTime] = useState(
    initialConfiguration?.endTime
      ? stringToDate(initialConfiguration.endTime)
      : stringToDate("13:00"),
  );

  function handleSave() {
    onSave({
      id: activityId,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
    });
  }

  return (
    <View>
      <Text style={styles.label}>Start time</Text>

      <DateTimePicker
        mode="time"
        display="spinner"
        value={startTime}
        onChange={(_, date) => {
          if (date) setStartTime(date);
        }}
      />

      <Text style={styles.label}>End time</Text>

      <DateTimePicker
        mode="time"
        display="spinner"
        value={endTime}
        onChange={(_, date) => {
          if (date) setEndTime(date);
        }}
      />

      <PrimaryButton
        title="Save Activity"
        onPress={handleSave}
        disabled={false}
      />
    </View>
  );
}

function stringToDate(time: string) {
  const date = new Date();

  const [hour, minute] = time.split(":").map(Number);

  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);

  return date;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 18,
    marginBottom: 10,
  },
});
