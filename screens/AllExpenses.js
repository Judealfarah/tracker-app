import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";

function AllExpenses() {
  const context = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={context.expenses}
      periodName="Total"
      fallbackText="Start by adding your expenses."
    />
  );
}

export default AllExpenses;
