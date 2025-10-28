import React, { useState } from "react";
import ManufacturingStages from "../components/ManufacturingStages";
import ManufacturingMetrics from "../components/ManufacturingMetrics";
import "./ManufacturingPage.css";

const ManufacturingPage = () => {
  const [stages, setStages] = useState([
    { id: 1, name: "Montagem", status: "Em andamento", updated: new Date() },
    { id: 2, name: "Controle de Qualidade", status: "Pendente", updated: null },
    { id: 3, name: "Liberação para Instalação", status: "Pendente", updated: null },
  ]);

  const updateStageStatus = (id, newStatus) => {
    setStages((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: newStatus, updated: new Date() }
          : s
      )
    );
  };

  return (
    <div className="manufacturing-page-container">
      <h2 className="page-title">Acompanhamento da Fabricação</h2>
      <ManufacturingMetrics stages={stages} />
      <ManufacturingStages stages={stages} onUpdate={updateStageStatus} />
    </div>
  );
};

export default ManufacturingPage;
