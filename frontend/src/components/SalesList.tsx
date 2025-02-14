import { useState, useEffect } from "react";
import { getSales } from "../services/salesService";
import { Sale } from "../types/Sale";
import { Table, Container, Card } from "react-bootstrap";

const SalesList = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();
      console.log("Fetched sales data:", data);
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <Card.Title>Sales List</Card.Title>
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
              {sales.map((sale) => {
                console.log("Sale Raw Date from API:", sale.date);

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
