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
      <View style={styles.iconWrapper}>
        <MapPin size={34} color={Colors.coral} strokeWidth={1.8} />
      </View>

      <Text style={styles.eyebrow}>YOUR LOCATION</Text>

      <Text style={styles.city}>{city}</Text>

      <Text style={styles.country}>{country}</Text>

      <View style={styles.divider} />

      <Text style={styles.description}>
        We'll use this location to personalize your weather-aware day.
      </Text>

      <View style={styles.button}>
        <PrimaryButton
          title="Confirm Location"
          onPress={onConfirm}
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: "rgba(255,255,255,0.72)",

    borderRadius: 28,

    paddingHorizontal: 24,

    paddingTop: 28,

    paddingBottom: 24,

    alignItems: "center",

    borderWidth: 1,

    borderColor: "rgba(217,130,114,0.14)",

    shadowColor: Colors.ink,

    shadowOpacity: 0.06,

    shadowRadius: 24,

    shadowOffset: {
      width: 0,
      height: 12,
    },

    elevation: 4,
  },

  iconWrapper: {
    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: Colors.softCoral,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 18,
  },

  eyebrow: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 2,

    color: Colors.coral,

    marginBottom: 7,
  },

  city: {
    fontSize: 28,

    fontWeight: "800",

    letterSpacing: -0.5,

    color: Colors.ink,
  },

  country: {
    marginTop: 4,

    fontSize: 15,

    fontWeight: "500",

    color: Colors.subtitle,
  },

  divider: {
    width: 44,

    height: 1,

    backgroundColor: Colors.champagne,

    marginVertical: 20,
  },

  description: {
    maxWidth: 270,

    fontSize: 14,

    lineHeight: 21,

    textAlign: "center",

    color: Colors.subtitle,

    marginBottom: 22,
  },

  button: {
    width: "100%",
  },
});
