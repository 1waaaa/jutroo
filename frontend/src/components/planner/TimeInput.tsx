import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useState } from "react";

import { Colors } from "../../theme/colors";

interface Props {
  label: string;
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
    /*
     * Remove ":" so the user can simply
     * type numbers.
     *
     * 0930
     * 1415
     * 2000
     */
    setDraft(value.replace(":", ""));

    setEditing(true);
  }

  function handleBlur() {
    setEditing(false);

    if (!draft) {
      return;
    }

    /*
     * Allow:
     *
     * 9
     * 09
     * 930
     * 0930
     * 1430
     */
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

    /*
     * Invalid time.
     */
    if (hours > 23 || minutes > 59) {
      setDraft("");
      return;
    }

    const totalMinutes = hours * 60 + minutes;

    /*
     * Snap to nearest 30 min.
     */
    const snapped = snapTo30(totalMinutes);

    /*
     * 23:45 → 24:00
     * We don't want 24:00.
     */
    const safeMinutes = Math.min(snapped, 23 * 60 + 30);

    const formatted = formatTime(safeMinutes);

    onChange(formatted);
  }

  if (editing) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          autoFocus
          value={draft}
          onChangeText={(text) => {
            /*
             * Numbers only.
             */
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
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.card} onPress={handleFocus}>
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

  time: {
    fontSize: 21,

    fontWeight: "800",

    color: Colors.text,
  },

  input: {
    backgroundColor: Colors.surface,

    borderRadius: 18,

    borderWidth: 1.5,

    borderColor: Colors.primary,

    paddingVertical: 11,

    textAlign: "center",

    fontSize: 21,

    fontWeight: "800",

    color: Colors.text,
  },
});
