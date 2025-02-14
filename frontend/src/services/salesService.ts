import axios from "axios";
import { Sale } from "../types/Sale";

const API_BASE_URL = process.env.API_URL || "http://localhost:5000"; 


export const getSales = async (): Promise<Sale[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/sales`);

  return response.data.map((sale: Sale) => ({
    ...sale,
    date: sale.date ? new Date(sale.date) : null, // Ensure it's a Date object
  }));
};

export const addSale = async (item: string, price: number, type: string) => {
  console.log("Adding Sale:", { item, price, type });

  try {
    const response = await axios.post(`${API_BASE_URL}/api/sales`, { item, price, type });
    console.log("Sale added successfully:", response.data);
    return response.data; // Return the new sale
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error adding sale:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
