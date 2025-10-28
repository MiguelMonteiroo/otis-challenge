import React from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";

const ManufacturingStages = ({ stages, onUpdate }) => {
  const handleProgress = (stage) => {
    if (stage.status === "Pendente") onUpdate(stage.id, "Em andamento");
    else if (stage.status === "Em andamento") onUpdate(stage.id, "Concluído");
  };

  const getProgress = (status) => {
    switch (status) {
      case "Pendente":
        return 0;
      case "Em andamento":
        return 50;
      case "Concluído":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="stages-container">
      {stages.map((stage) => (
        <Card key={stage.id} className="stage-card shadow-sm">
          <Card.Body>
            <div className="stage-header">
              <h5>{stage.name}</h5>
              <span className={`status ${stage.status.replace(" ", "").toLowerCase()}`}>
                {stage.status}
              </span>
            </div>
            <ProgressBar
              now={getProgress(stage.status)}
              label={`${getProgress(stage.status)}%`}
              className="progress-otis"
            />
            <p className="mt-2 small text-muted">
              Última atualização:{" "}
              {stage.updated
                ? stage.updated.toLocaleString("pt-BR")
                : "—"}
            </p>
            {stage.status !== "Concluído" && (
              <Button
                onClick={() => handleProgress(stage)}
                className="otis-btn otis-btn-primary mt-2"
              >
                {stage.status === "Pendente" ? "Iniciar Etapa" : "Concluir Etapa"}
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ManufacturingStages;
