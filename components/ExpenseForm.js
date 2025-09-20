import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "../ui/Input";
import { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../constants/styles";

function ExpenseForm({ defaultValues, onCancel, onSubmit, submitButtonLabel }) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, value) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: value, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("Invalid input", "Please check your values");
      setInputValues((curInputValues) => {
        return {
          amount: {
            value: curInputValues.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: curInputValues.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: curInputValues.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => {
              const normalized = text.replace(",", ".");
              inputChangeHandler("amount", normalized);
            },
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values, please check the data
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        <PrimaryButton mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </PrimaryButton>
        <PrimaryButton onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </PrimaryButton>
      </View>
    </View>
  );
}

export default ExpenseForm;
const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error50,
    margin: 8,
  },
});
