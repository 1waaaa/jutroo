import { FlatList, StyleSheet, View } from "react-native";

import SelectionCard from "./SelectionCard";

interface Props {
  value: string;
  onChange: (time: string) => void;
}

const TIMES: string[] = [];

for (let hour = 6; hour <= 23; hour++) {
  TIMES.push(`${hour.toString().padStart(2, "0")}:00`);
  TIMES.push(`${hour.toString().padStart(2, "0")}:30`);
}

export default function TimeSelector({ value, onChange }: Props) {
  return (
    <FlatList
      horizontal
      data={TIMES}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <SelectionCard
          title={item}
          selected={item === value}
          onPress={() => onChange(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 6,
    paddingRight: 24,
  },
});
