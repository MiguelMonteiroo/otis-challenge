import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faIndustry,
  faHistory,
  faChartLine,
  faTools,
  faHandshake,
  faCommentDots,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const modules = [
    { name: "Venda", path: "/venda", icon: faShoppingCart },
    { name: "Fabricação", path: "/fabricacao", icon: faIndustry },
    { name: "Histórico", path: "/historico", icon: faHistory },
    { name: "Indicadores", path: "/indicadores", icon: faChartLine },
    { name: "Instalação", path: "/instalacao", icon: faTools },
    { name: "Pós-venda", path: "/posvenda", icon: faHandshake },
    { name: "Feedback", path: "/feedback", icon: faCommentDots },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Close button for mobile */}
      <div className="d-md-none text-end">
        <button className="btn btn-sm btn-light m-2" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <h4 className="text-white mb-4 d-none d-md-block text-center">
        OTIS Manager
      </h4>

      <nav className="nav flex-column p-3">
        {modules.map((mod) => (
          <NavLink
            to={mod.path}
            key={mod.path}
            className="nav-link text-white"
            onClick={onClose} // close on mobile
          >
            <FontAwesomeIcon icon={mod.icon} className="me-2" />
            {mod.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
