import "bootstrap/dist/css/bootstrap.min.css";
import Expenses from "./expenses";
import Sales from "./sales";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Home() {
  return (
    <Container fluid className="min-vh-100 d-flex flex-column align-items-center py-4 bg-light">
      <h1 className="mb-4 text-center">Amma&apos;s Kitchen Dashboard</h1>
      <Row className="w-100 justify-content-center">
        <Col md={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Expenses />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Sales />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}