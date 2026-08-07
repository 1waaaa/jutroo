import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

import { Colors } from "../../theme/colors";
import { ScheduleItem } from "../../mock/schedule";

interface Props {
  schedule: ScheduleItem[];
  onPress: () => void;
}

export default function TodayScheduleCard({ schedule, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Schedule</Text>

        <ChevronRight size={20} color={Colors.subtitle} />
      </View>

      {schedule.length === 0 ? (
        <Text style={styles.empty}>No schedule generated yet.</Text>
      ) : (
        schedule.slice(0, 4).map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.time}>{item.start}</Text>

            <Text style={styles.activity}>
              {item.emoji} {item.title}
            </Text>
          </View>
        ))
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    borderRadius: 22,

    padding: 20,

    marginBottom: 22,

    borderWidth: 1,

    borderColor: "#EEF2F7",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: Colors.text,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 14,
  },

  time: {
    width: 60,

    fontSize: 15,

    fontWeight: "700",

    color: Colors.primary,
  },

  activity: {
    fontSize: 16,

    color: Colors.text,

    fontWeight: "600",
  },

  empty: {
    color: Colors.subtitle,

    fontSize: 16,

    textAlign: "center",

    paddingVertical: 20,
  },
});
