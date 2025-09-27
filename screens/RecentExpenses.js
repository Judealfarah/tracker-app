import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

function RecentExpenses() {
  const context = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        context.setExpenses(expenses);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (!isLoading && error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) return <LoadingOverlay />;

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
