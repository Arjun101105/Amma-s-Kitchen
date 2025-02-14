import { useState } from "react";
import SalesForm from "../components/SalesForm";
import SalesList from "../components/SalesList";
import { Container, Card } from "react-bootstrap";

export default function SalesPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-4 bg-light">
      <h1 className="mb-4 text-center">Sales</h1>
      <Card className="shadow-sm w-100 p-3" style={{ maxWidth: "600px" }}>
        <SalesForm onSaleAdded={() => setRefresh(!refresh)} />
      </Card>
      <Card className="shadow-sm w-100 mt-4 p-3" style={{ maxWidth: "600px" }}>
        <SalesList key={refresh.toString()} />
      </Card>
    </Container>
  );
}
