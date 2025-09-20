import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const context = useContext(ExpensesContext);

  const recentExpenses = context.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses from the last 7 days."
    />
  );
}

export default RecentExpenses;
