import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors } from "../../theme/colors";

interface Props {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

export default function TimePicker({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  function format(date: Date) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.time}>{format(value)}</Text>
      </Pressable>

      {open && (
        <DateTimePicker
          mode="time"
          value={value}
          display="spinner"
          onChange={(_, selected) => {
            setOpen(false);

            if (selected) {
              onChange(selected);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  label: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600",
    marginBottom: 10,
  },

  button: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 18,
    alignItems: "center",
  },

  time: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "700",
  },
});
