import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { Colors } from "../../theme/colors";

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

function snapTo30(minutes: number) {
  return Math.round(minutes / 30) * 30;
}

export default function TimeInput({ label, value, onChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  function handleFocus() {
    setDraft(value.replace(":", ""));
    setEditing(true);
  }

  function handleBlur() {
    setEditing(false);

    if (!draft) {
      return;
    }

    const numeric = draft.replace(/\D/g, "");

    let hours = 0;
    let minutes = 0;

    if (numeric.length <= 2) {
      hours = Number(numeric);
      minutes = 0;
    } else {
      hours = Number(numeric.slice(0, -2));
      minutes = Number(numeric.slice(-2));
    }

    if (hours > 23 || minutes > 59) {
      setDraft("");
      return;
    }

    const totalMinutes = hours * 60 + minutes;
    const snapped = snapTo30(totalMinutes);
    const safeMinutes = Math.min(snapped, 23 * 60 + 30);

    onChange(formatTime(safeMinutes));
  }

  if (editing) {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TextInput
          autoFocus
          value={draft}
          onChangeText={(text) => {
            setDraft(text.replace(/\D/g, ""));
          }}
          onBlur={handleBlur}
          keyboardType="numeric"
          maxLength={4}
          selectTextOnFocus
          placeholder="0930"
          placeholderTextColor={Colors.subtitle}
          style={styles.input}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        onPress={handleFocus}
      >
        <Text style={styles.time}>{value}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: Colors.subtitle,
    marginBottom: 5,
    textAlign: "center",
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 13,
    alignItems: "center",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  time: {
    fontSize: 21,
    fontWeight: "800",
    color: Colors.ink,
  },

  input: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.water,
    paddingVertical: 11,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "800",
    color: Colors.ink,
  },
});
