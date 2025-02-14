export interface Expense {
  _id: string;
  category: string;
  description: string;
  amount: number;
  date: string; // Stored as an ISO string in MongoDB
}
