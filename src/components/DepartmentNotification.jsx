import React from "react";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndustry, faTools, faHandshake } from "@fortawesome/free-solid-svg-icons";

const DepartmentNotification = () => {
  const departments = [
    { name: "Fabricação", icon: faIndustry },
    { name: "Instalação", icon: faTools },
    { name: "Pós-venda", icon: faHandshake },
  ];

  return (
    <div className="mt-4">
      <h5>Setores Notificados:</h5>
      <ListGroup>
        {departments.map((dep) => (
          <ListGroup.Item key={dep.name}>
            <FontAwesomeIcon icon={dep.icon} className="me-2 text-success" />
            {dep.name} recebeu as especificações.
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default DepartmentNotification;
