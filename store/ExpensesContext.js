import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Shoes",
    amount: 59.99,
    date: new Date("2025-09-17"),
  },
  {
    id: "e2",
    description: "Bananas",
    amount: 5.99,
    date: new Date("2025-09-15"),
  },
  {
    id: "e3",
    description: "Book",
    amount: 9.99,
    date: new Date("2025-09-01"),
  },
  {
    id: "e4",
    description: "Jacket",
    amount: 159.99,
    date: new Date("2025-09-03"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const itemIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const item = state[itemIndex];
      const updatedItem = { ...item, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[itemIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
