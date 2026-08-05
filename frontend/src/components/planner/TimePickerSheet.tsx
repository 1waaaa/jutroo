import { ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { Colors } from "../../theme/colors";

interface Props {
  title: string;

  min: string;

  max: string;

  value: string;

  onSelect: (time: string) => void;
}

function generateTimes(min: string, max: string) {
  const result: string[] = [];

  const [startHour, startMinute] = min.split(":").map(Number);
  const [endHour, endMinute] = max.split(":").map(Number);

  let current = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  while (current <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;

    result.push(
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
    );

    current += 30;
  }

  return result;
}

export default function TimePickerSheet({
  title,
  min,
  max,
  value,
  onSelect,
}: Props) {
  const times = generateTimes(min, max);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backRow}>
        <ArrowLeft size={22} color={Colors.primary} />

        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {times.map((time) => {
          const selected = value === time;

          return (
            <Pressable
              key={time}
              style={[styles.chip, selected && styles.selectedChip]}
              onPress={() => onSelect(time)}
            >
              <Text
                style={[styles.chipText, selected && styles.selectedChipText]}
              >
                {time}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 500,
  },

  backRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 22,

    gap: 8,
  },

  backText: {
    fontSize: 16,

    fontWeight: "600",

    color: Colors.primary,
  },

  title: {
    fontSize: 28,

    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",

    marginBottom: 28,
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    paddingBottom: 40,
  },

  chip: {
    width: "48%",

    height: 58,

    marginBottom: 12,

    borderRadius: 18,

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    justifyContent: "center",

    alignItems: "center",
  },

  selectedChip: {
    backgroundColor: Colors.primary,

    borderColor: Colors.primary,
  },

  chipText: {
    fontSize: 18,

    fontWeight: "600",

    color: Colors.text,
  },

  selectedChipText: {
    color: "white",
  },
});
