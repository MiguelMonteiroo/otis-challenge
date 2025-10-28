import React from "react";
import "./SalesMetrics.css";

const SalesMetrics = () => {
  return (
    <div className="sales-metrics-container">
      <div className="metric-card">
        <h5>Total de Vendas</h5>
        <p className="metric-value">128</p>
      </div>

      <div className="metric-card">
        <h5>Vendas Pendentes</h5>
        <p className="metric-value warning">5</p>
      </div>

      <div className="metric-card">
        <h5>Receita Total</h5>
        <p className="metric-value success">R$ 542.000</p>
      </div>
    </div>
  );
};

export default SalesMetrics;
