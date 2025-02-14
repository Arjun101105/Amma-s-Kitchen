import axios from "axios";
import { Expense } from "../types/Expense";
const API_BASE_URL = process.env.API_URL || "http://localhost:5000"; 


export const getExpenses = async (month?: number, year?: number): Promise<Expense[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/expenses`, {
      params: month && year ? { month, year } : {}, // Send params only if valid
    });

    return response.data.map((expense: Expense) => ({
      ...expense,
      date: new Date(expense.date).toISOString(), // Ensure date format
    }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to fetch expenses");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unknown error occurred while fetching expenses.");
    }
  }
};

export const addExpense = async (category: string, amount: number) => {
  await axios.post(`${API_BASE_URL}/api/expenses`, { category, amount });
};
