import React from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faUserTie, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InstallCard = ({ installation, advanceStep }) => {
  const progressPercent = Math.floor(
    ((installation.currentStep + 1) / installation.steps.length) * 100
  );

  return (
    <Card className="install-card">
      <Card.Body>
        <h5 className="card-title">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="card-icon" />
          {installation.location}
        </h5>

        <p className="responsible">
          <FontAwesomeIcon icon={faUserTie} /> {installation.responsible}
        </p>

        <p className="current-step">
          <strong>Etapa atual:</strong> {installation.steps[installation.currentStep]}
        </p>

        <ProgressBar now={progressPercent} label={`${progressPercent}%`} className="mb-3"/>

        <Button
          className="next-step-btn"
          onClick={() => advanceStep(installation.id)}
          disabled={installation.currentStep >= installation.steps.length - 1}
        >
          Avançar Etapa
          <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default InstallCard;
