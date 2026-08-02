import { View, Text, StyleSheet } from "react-native";
import { MapPin } from "lucide-react-native";

import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Colors } from "../../theme/colors";

interface LocationCardProps {
  city: string;
  country: string;
  onConfirm: () => void;
}

export default function LocationCard({
  city,
  country,
  onConfirm,
}: LocationCardProps) {
  return (
    <View style={styles.container}>
      <MapPin size={42} color={Colors.primary} />

      <Text style={styles.city}>{city}</Text>

      <Text style={styles.country}>{country}</Text>

      <PrimaryButton title="Confirm Location" onPress={onConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 24,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 8,
  },

  city: {
    marginTop: 12,

    fontSize: 24,

    fontWeight: "700",

    color: "#1F2937",
  },

  country: {
    marginTop: 4,

    fontSize: 16,

    color: "#6B7280",

    marginBottom: 12,
  },
});
