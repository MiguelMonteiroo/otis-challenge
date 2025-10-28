import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const ManufacturingMetrics = ({ stages }) => {
  const total = stages.length;
  const completed = stages.filter((s) => s.status === "Concluído").length;
  const inProgress = stages.filter((s) => s.status === "Em andamento").length;
  const pending = stages.filter((s) => s.status === "Pendente").length;

  return (
    <Row className="metrics-container mb-4">
      <Col md={4}>
        <Card className="metric-card completed">
          <Card.Body>
            <h6>Concluídas</h6>
            <h3>{completed}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="metric-card inprogress">
          <Card.Body>
            <h6>Em Andamento</h6>
            <h3>{inProgress}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="metric-card pending">
          <Card.Body>
            <h6>Pendentes</h6>
            <h3>{pending}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ManufacturingMetrics;
