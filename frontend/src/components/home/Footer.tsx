import { Image, StyleSheet, View } from "react-native";
import { useDayTheme } from "../../context/DayThemeContext";

export default function Footer() {
  const { isDark } = useDayTheme();

  return (
    <View style={styles.container}>
      <Image
        source={
          isDark
            ? require("../../../assets/logo/jutro-logo-dark.png")
            : require("../../../assets/logo/jutro-logo-light.png")
        }
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 18,
  },

  logo: {
    height: 50,
  },
});
