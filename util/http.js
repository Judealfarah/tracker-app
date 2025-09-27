import axios from "axios";
import { rootApiUrl } from "./constants";

export async function storeExpense(expenseData) {
  const response = await axios.post(rootApiUrl + "expenses.json", expenseData);
  return response.data.name;
}

export async function fetchExpenses() {
  const response = await axios.get(rootApiUrl + "expenses.json");
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpenseApi(id, expenseData) {
  return axios.put(rootApiUrl + `expenses/${id}.json`, expenseData);
}

export function deleteExpenseApi(id) {
  return axios.delete(rootApiUrl + `expenses/${id}.json`);
}
