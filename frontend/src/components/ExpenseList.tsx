import { useState, useEffect, useCallback } from "react";
import { getExpenses } from "../services/expenseService";
import { Expense } from "../types/Expense";
import { Table, Form, Alert, Spinner, Container, Row, Col, Card } from "react-bootstrap";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetchExpenses function
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExpenses(month, year);
      setExpenses(data);
    } catch {
      setError("Failed to fetch expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  // Fetch expenses when month or year changes
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3 text-center">Expenses</Card.Title>

          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Month</Form.Label>
                <Form.Select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
              </Form.Group>
            </Col>
          </Row>

          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" />
              <p>Loading expenses...</p>
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {/* Responsive Table */}
          <div className="table-responsive">
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>{expense.category}</td>
                    <td>{expense.description}</td>
                    <td>₹{expense.amount}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExpensesList;
