import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./SalesForm.css";

const SalesForm = () => {
  const [formData, setFormData] = useState({
    cliente: "",
    tipoElevador: "",
    capacidade: "",
    observacoes: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="sales-form-container d-flex flex-column">
      <div className="sales-header mb-3">
        <h4 className="mb-0">📋 Registro de Venda</h4>
      </div>
      <div className="sales-form-content flex-grow-1 overflow-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              placeholder="Nome do cliente"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Elevador</Form.Label>
            <Form.Select
              name="tipoElevador"
              value={formData.tipoElevador}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
              <option value="Carga">Carga</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacidade (kg)</Form.Label>
            <Form.Control
              type="number"
              name="capacidade"
              value={formData.capacidade}
              onChange={handleChange}
              placeholder="Ex: 600"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              name="observacoes"
              rows={3}
              value={formData.observacoes}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button type="submit">Registrar Venda</Button>
          </div>
        </Form>

        {sent && (
          <Alert variant="success" className="mt-4">
            Venda registrada com sucesso!
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SalesForm;
