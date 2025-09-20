import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Input({ label, invalid, textInputConfig, style }) {
  let inputStyles = [styles.textInput];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 14,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 10,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error50,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
