import { useState } from "react";
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";

interface AppInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
}

export default function AppInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  returnKeyType = "done",
  onSubmitEditing,
  autoCapitalize = "sentences",
  autoCorrect = true,
}: AppInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.subtitle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        selectionColor={Colors.coral}
        cursorColor={Colors.coral}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",

    height: 58,

    marginHorizontal: 10,

    borderRadius: 18,

    backgroundColor: "rgba(255,255,255,0.82)",

    borderWidth: 1,
    borderColor: Colors.border,

    justifyContent: "center",
  },

  focusedContainer: {
    borderColor: Colors.coral,
  },

  input: {
    width: "100%",
    height: 58,

    paddingHorizontal: 18,

    fontSize: 16,
    fontWeight: "500",

    color: Colors.text,
  },
});
