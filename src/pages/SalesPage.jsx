import React from "react";
import SalesMetrics from "../components/SalesMetrics";
import SalesForm from "../components/SalesForm";
import "./SalesPage.css";

const SalesPage = () => {
  return (
    <main className="sales-page">
      <section className="sales-metrics-section">
        <SalesMetrics />
      </section>

      <section className="sales-form-section">
        <SalesForm />
      </section>
    </main>
  );
};

export default SalesPage;
