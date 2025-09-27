import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/ExpensesContext";
import ExpenseForm from "../components/ExpenseForm";
import { storeExpense, updateExpenseApi, deleteExpenseApi } from "../util/http";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const context = useContext(ExpensesContext);

  const selectedExpense = context.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpense() {
    setIsLoading(true);
    try {
      await deleteExpenseApi(expenseId);
      context.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        context.updateExpense(expenseId, expenseData);
        updateExpenseApi(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        context.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (!isLoading && error)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;

  if (isLoading) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={28}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
