import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { Container, Card } from "react-bootstrap";

export default function ExpensesPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Container className="min-vh-100 d-flex flex-column align-items-center py-4">
      <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title className="text-center">Expenses</Card.Title>
          <ExpenseForm onExpenseAdded={() => setRefresh(!refresh)} />
          <ExpenseList key={refresh.toString()} />
        </Card.Body>
      </Card>
    </Container>
  );
}
