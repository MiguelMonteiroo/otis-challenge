import React from "react";
import SalesForm from "../components/SalesForm";
import "./PageLayout.css";

const SalesPage = () => {
  return (
    <section className="page-section d-flex justify-content-center align-items-center">
      <div className="page-container shadow p-4 bg-white rounded">
        <SalesForm />
      </div>
    </section>
  );
};

export default SalesPage;
