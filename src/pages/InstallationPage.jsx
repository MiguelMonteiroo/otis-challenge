import React, { useState } from "react";
import "./InstallationPage.css";

const initialInstallations = [
  {
    id: 1,
    customer: "Shopping Center Rio",
    product: "Elevador Gen2",
    currentStep: 0,
    steps: ["Conexão logística", "Entrega no local", "Instalação técnica", "Teste final", "Concluído"],
  },
  {
    id: 2,
    customer: "Hospital Municipal",
    product: "Escada Rolante",
    currentStep: 1,
    steps: ["Conexão logística", "Entrega no local", "Instalação técnica", "Teste final", "Concluído"],
  },
];

export default function InstallationPage() {
  const [installations, setInstallations] = useState(initialInstallations);

  const handleNextStep = (id) => {
    setInstallations((prev) =>
      prev.map((inst) =>
        inst.id === id && inst.currentStep < inst.steps.length - 1
          ? { ...inst, currentStep: inst.currentStep + 1 }
          : inst
      )
    );
  };

  const total = installations.length;
  const completed = installations.filter(i => i.currentStep === i.steps.length - 1).length;
  const inProgress = installations.filter(i => i.currentStep > 0 && i.currentStep < i.steps.length - 1).length;
  const pending = total - completed - inProgress;

  return (
    <div className="installation-container">
      <h2 className="page-title">📍 Acompanhamento de Instalações</h2>

      {/* ✅ MÉTRICAS */}
      <div className="installation-metrics">
        <div className="metric-card">
          <span>Total</span>
          <strong>{total}</strong>
        </div>
        <div className="metric-card in-progress">
          <span>Em andamento</span>
          <strong>{inProgress}</strong>
        </div>
        <div className="metric-card pending">
          <span>Pendentes</span>
          <strong>{pending}</strong>
        </div>
        <div className="metric-card completed">
          <span>Concluídas</span>
          <strong>{completed}</strong>
        </div>
      </div>

      {/* ✅ LISTA DE INSTALAÇÕES */}
      <div className="installation-list">
        {installations.map((inst) => (
          <div key={inst.id} className="installation-card">
            <h4>{inst.customer}</h4>
            <p><strong>Produto:</strong> {inst.product}</p>

            {/* 🎯 Barra de progresso */}
            <div className="progress-track">
              {inst.steps.map((step, index) => (
                <div
                  key={index}
                  className={`progress-step ${
                    index <= inst.currentStep ? "active" : ""
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* ✅ NEXT STEP BUTTON */}
            <button
              className="next-step-btn"
              onClick={() => handleNextStep(inst.id)}
              disabled={inst.currentStep === inst.steps.length - 1}
            >
              {inst.currentStep === inst.steps.length - 1
                ? "✔ Finalizado"
                : "Próxima etapa →"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
