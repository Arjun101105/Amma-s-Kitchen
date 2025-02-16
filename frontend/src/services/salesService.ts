import axios from "axios";
import { Sale } from "../types/Sale";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("❌ API URL is undefined! Check .env file.");
} else {
  console.log("✅ API URL in frontend:", API_BASE_URL);
}


export const getSales = async (): Promise<Sale[]> => {
  try {
    console.log("Fetching from:", `${API_BASE_URL}/api/sales`);
    const response = await axios.get(`${API_BASE_URL}/api/sales`);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw error;
  }
};



export const addSale = async (item: string, price: number, type: string, date: string) => {
  console.log("Adding Sale:", { item, price, type, date });

  try {
    const response = await axios.post(`${API_BASE_URL}/api/sales`, { item, price, type, date });
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

