import { useState } from "react";
import { addExpense } from "../services/expenseService";
import { Form, Button, Card } from "react-bootstrap";

export default function ExpenseForm({ onExpenseAdded }: { onExpenseAdded: () => void }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = async () => {
    if (!category || !amount) return;
    await addExpense(category, parseFloat(amount));
    setCategory("");
    setAmount("");
    onExpenseAdded(); // Refresh expense list
  };

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <Card.Title>Add Expense</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter category" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}