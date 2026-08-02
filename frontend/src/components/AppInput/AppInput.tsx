import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from "react-native";

import { Colors } from "../../theme/colors";

interface AppInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
}

export default function AppInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  returnKeyType = "done",
  onSubmitEditing,
}: AppInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },

  focusedContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  input: {
    height: 58,
    paddingHorizontal: 18,
    fontSize: 17,
    color: "#1F2937",
  },
});
