import React, { useState } from "react";
import { Button, Form, Card, Row, Col, Table } from "react-bootstrap";
import "./SalesForm.css";

const defaultProducts = [
  { name: "Elevador OTIS Gen2", price: 250000 },
  { name: "Painel de Controle", price: 15000 },
  { name: "Motor de Tração", price: 40000 },
  { name: "Cabina de Passageiros", price: 60000 },
  { name: "Sistema de Segurança", price: 12000 },
];

const SalesForm = () => {
  const [products, setProducts] = useState([{ name: "", quantity: 1, price: "" }]);

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;

    // If user selects from dropdown, auto-fill default price
    if (field === "name") {
      const selected = defaultProducts.find((p) => p.name === value);
      if (selected) updated[index].price = selected.price;
    }

    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: "" }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Venda confirmada com sucesso!");
  };

  return (
    <Card className="sales-form-card shadow">
      <Card.Header className="sales-form-header">
        <h5>Registrar Nova Venda</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Customer & Seller Info */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Cliente</Form.Label>
                <Form.Control type="text" placeholder="Nome do cliente" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Vendedor</Form.Label>
                <Form.Control type="text" placeholder="Nome do vendedor" required />
              </Form.Group>
            </Col>
          </Row>

          {/* Product List */}
          <h6 className="mt-4 mb-2">Produtos</h6>
          <Table bordered hover responsive className="mb-3 align-middle">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço (R$)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td>
                    <Form.Select
                      value={p.name}
                      onChange={(e) => handleProductChange(i, "name", e.target.value)}
                      required
                    >
                      <option value="">Selecione o produto...</option>
                      {defaultProducts.map((prod, idx) => (
                        <option key={idx} value={prod.name}>
                          {prod.name}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={p.quantity}
                      onChange={(e) => handleProductChange(i, "quantity", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      value={p.price}
                      onChange={(e) => handleProductChange(i, "price", e.target.value)}
                      required
                    />
                  </td>
                  <td className="text-center">
                    {products.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        className="otis-btn otis-btn-danger"
                        onClick={() => removeProduct(i)}
                      >
                        Remover
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Buttons */}
          <Button
            type="button"
            className="otis-btn otis-btn-outline me-2"
            onClick={addProduct}
          >
            + Adicionar Produto
          </Button>

          <div className="text-end mt-4">
            <Button type="submit" className="otis-btn otis-btn-primary">
              Confirmar Venda
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SalesForm;
