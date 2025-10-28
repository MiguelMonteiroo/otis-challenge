import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Sidebar from "./components/Sidebar";
import SalesPage from "./pages/SalesPage";
import ManufacturingPage from "./pages/ManufacturingPage";
import HistoricoPage from "./pages/HistoricoPage";
import IndicadoresPage from "./pages/IndicadoresPage";
import InstalacaoPage from "./pages/InstalacaoPage";
import PosVendaPage from "./pages/PosVendaPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="app-layout d-flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="main-content flex-grow-1">
          {/* Mobile top bar with hamburger */}
          <div className="topbar d-md-none p-2 d-flex align-items-center bg-primary text-white">
            <button
              className="btn btn-dark"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h5 className="ms-3 mb-0">OTIS Manager</h5>
          </div>

          <Routes>
            <Route path="/" element={<SalesPage />} />
            <Route path="/venda" element={<SalesPage />} />
            <Route path="/fabricacao" element={<ManufacturingPage />} />
            <Route path="/historico" element={<HistoricoPage />} />
            <Route path="/indicadores" element={<IndicadoresPage />} />
            <Route path="/instalacao" element={<InstalacaoPage />} />
            <Route path="/posvenda" element={<PosVendaPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
