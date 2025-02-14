import { useState } from "react";
import { addSale } from "../services/salesService";
import { Form, Button, Container, Card } from "react-bootstrap";

const SalesForm = ({ onSaleAdded }: { onSaleAdded: () => void }) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("parcel");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSale(item, price, type);
      setItem("");
      setPrice(0);
      setType("parcel");
      onSaleAdded(); // Refresh the sales list
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title>Add Sale</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Item name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter price"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sale Type</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="parcel">Parcel</option>
                <option value="counter">Counter</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Sale
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SalesForm;
