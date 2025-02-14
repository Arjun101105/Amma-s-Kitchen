export interface Sale {
  _id: string;
  item: string;
  price: number;
  type: string;
  date: string; // Ensure the backend sends this field
}
