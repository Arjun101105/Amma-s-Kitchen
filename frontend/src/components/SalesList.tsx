import { useState, useEffect } from "react";
import { getSales } from "../services/salesService";
import { Sale } from "../types/Sale";
import { Table, Container, Card, Form } from "react-bootstrap";

const SalesList = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  // Filter sales based on selected date
  const filteredSales = sales.filter((sale) => {
    if (!selectedDate) return true; // If no date selected, show all sales

    const saleDate = new Date(sale.date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
    return saleDate === selectedDate;
  });

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title>Sales List</Card.Title>

          {/* Date Filter Input */}
          <Form.Group className="mb-3">
            <Form.Label>Filter by Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Form.Group>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price (₹)</th>
                <th>Type</th>
                <th>Sold At</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => {
                let formattedDate = "N/A";

                if (sale.date) {
                  const dateObj = new Date(sale.date);
                  if (!isNaN(dateObj.getTime())) {
                    formattedDate = dateObj.toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    });
                  } else {
                    console.error("Invalid Date:", sale.date);
                  }
                }

                return (
                  <tr key={sale._id}>
                    <td>{sale.item}</td>
                    <td>₹{sale.price}</td>
                    <td>{sale.type}</td>
                    <td>{formattedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SalesList;
