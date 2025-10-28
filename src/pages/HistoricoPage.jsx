import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert,
  Badge,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDownload,
  faChartLine,
  faDollarSign,
  faExclamationTriangle,
  faClock,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const HistoricoPage = () => {
  // Cores OFICIAIS da OTIS
  const OTIS_DARK = "#002855";
  const OTIS_GOLD = "#C5A572";
  const OTIS_RED = " #dc3545";
  // Mock de dados - substituir por chamadas à API
  const mockSites = [
    { id: 1, nome: "São Paulo", regiao: "BR-SP" },
    { id: 2, nome: "Santiago", regiao: "CL-RM" },
    { id: 3, nome: "Cidade do México", regiao: "MX-CDMX" },
  ];

  const mockEquipes = [
    { id: 1, nome: "Equipe Alpha", supervisor: "Carlos Silva" },
    { id: 2, nome: "Equipe Beta", supervisor: "Maria Santos" },
    { id: 3, nome: "Equipe Gamma", supervisor: "José Rodriguez" },
    { id: 4, nome: "Equipe Delta", supervisor: "Ana Martinez" },
  ];

  // Estado inicial com mais dados de exemplo
  const [historico, setHistorico] = useState([
    {
      id: 1,
      data: "2024-10-15",
      site_id: 1,
      equipe_id: 1,
      unidades: 12,
      horas: 96,
      custo: 48000,
      qualidade_indice: 0.92,
      prazo_status: "on_time",
      observacoes: "Produção normal",
    },
    {
      id: 2,
      data: "2024-10-20",
      site_id: 2,
      equipe_id: 2,
      unidades: 8,
      horas: 88,
      custo: 52000,
      qualidade_indice: 0.88,
      prazo_status: "late",
      observacoes: "Atraso por materiais",
    },
    {
      id: 3,
      data: "2024-10-25",
      site_id: 1,
      equipe_id: 3,
      unidades: 15,
      horas: 105,
      custo: 45000,
      qualidade_indice: 0.95,
      prazo_status: "on_time",
      observacoes: "Excelente desempenho",
    },
    {
      id: 4,
      data: "2024-11-01",
      site_id: 3,
      equipe_id: 1,
      unidades: 10,
      horas: 80,
      custo: 42000,
      qualidade_indice: 0.9,
      prazo_status: "on_time",
      observacoes: "Performance estável",
    },
    {
      id: 5,
      data: "2024-11-05",
      site_id: 1,
      equipe_id: 4,
      unidades: 14,
      horas: 98,
      custo: 47000,
      qualidade_indice: 0.93,
      prazo_status: "on_time",
      observacoes: "Bom ritmo",
    },
    {
      id: 6,
      data: "2024-11-10",
      site_id: 2,
      equipe_id: 2,
      unidades: 11,
      horas: 92,
      custo: 49000,
      qualidade_indice: 0.87,
      prazo_status: "late",
      observacoes: "Problemas técnicos",
    },
    {
      id: 7,
      data: "2024-11-15",
      site_id: 3,
      equipe_id: 3,
      unidades: 16,
      horas: 110,
      custo: 46000,
      qualidade_indice: 0.96,
      prazo_status: "on_time",
      observacoes: "Excelente produtividade",
    },
    {
      id: 8,
      data: "2024-11-20",
      site_id: 1,
      equipe_id: 1,
      unidades: 13,
      horas: 100,
      custo: 48500,
      qualidade_indice: 0.91,
      prazo_status: "on_time",
      observacoes: "Dentro do esperado",
    },
    {
      id: 9,
      data: "2024-11-25",
      site_id: 2,
      equipe_id: 4,
      unidades: 9,
      horas: 85,
      custo: 50000,
      qualidade_indice: 0.85,
      prazo_status: "late",
      observacoes: "Falta de pessoal",
    },
    {
      id: 10,
      data: "2024-12-01",
      site_id: 3,
      equipe_id: 2,
      unidades: 17,
      horas: 115,
      custo: 44000,
      qualidade_indice: 0.97,
      prazo_status: "on_time",
      observacoes: "Recorde de produção",
    },
  ]);

  const [filtros, setFiltros] = useState({
    from: "",
    to: "",
    site_id: "",
    equipe_id: "",
    prazo_status: "",
  });

  const [dadosFiltrados, setDadosFiltrados] = useState(historico);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  // Modal de novo registro
  const [showModal, setShowModal] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState({
    data: "",
    site_id: "",
    equipe_id: "",
    unidades: "",
    horas: "",
    custo: "",
    qualidade_indice: "",
    prazo_status: "on_time",
    observacoes: "",
  });
  const [erroFormulario, setErroFormulario] = useState("");
  const [sucessoFormulario, setSucessoFormulario] = useState(false);

  // Calcular KPIs
  const calcularKPIs = (data) => {
    if (data.length === 0) {
      return {
        produtividade: 0,
        custoPorUnidade: 0,
        taxaNC: 0,
        leadTimeMedio: "N/A",
      };
    }

    const totalUnidades = data.reduce((sum, item) => sum + item.unidades, 0);
    const totalHoras = data.reduce((sum, item) => sum + item.horas, 0);
    const totalCusto = data.reduce((sum, item) => sum + item.custo, 0);
    const mediaQualidade =
      data.reduce((sum, item) => sum + item.qualidade_indice, 0) / data.length;

    return {
      produtividade:
        totalHoras > 0 ? (totalUnidades / totalHoras).toFixed(2) : 0,
      custoPorUnidade:
        totalUnidades > 0 ? (totalCusto / totalUnidades).toFixed(2) : 0,
      taxaNC: ((1 - mediaQualidade) * 100).toFixed(1),
      leadTimeMedio: "N/A",
    };
  };

  const kpis = calcularKPIs(dadosFiltrados);

  const aplicarFiltros = () => {
    let resultado = [...historico];

    if (filtros.from) {
      resultado = resultado.filter((item) => item.data >= filtros.from);
    }
    if (filtros.to) {
      resultado = resultado.filter((item) => item.data <= filtros.to);
    }
    if (filtros.site_id) {
      resultado = resultado.filter(
        (item) => item.site_id === parseInt(filtros.site_id)
      );
    }
    if (filtros.equipe_id) {
      resultado = resultado.filter(
        (item) => item.equipe_id === parseInt(filtros.equipe_id)
      );
    }
    if (filtros.prazo_status) {
      resultado = resultado.filter(
        (item) => item.prazo_status === filtros.prazo_status
      );
    }

    setDadosFiltrados(resultado);
    setPaginaAtual(1);
  };

  const exportarCSV = () => {
    const headers = [
      "Data",
      "Site",
      "Equipe",
      "Unidades",
      "Horas",
      "Custo",
      "Qualidade",
      "Status",
      "Observações",
    ];
    const rows = dadosFiltrados.map((item) => [
      item.data,
      mockSites.find((s) => s.id === item.site_id)?.nome || "",
      mockEquipes.find((e) => e.id === item.equipe_id)?.nome || "",
      item.unidades,
      item.horas,
      item.custo,
      item.qualidade_indice,
      item.prazo_status === "on_time" ? "No Prazo" : "Atrasado",
      item.observacoes,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `historico_producao_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  const handleAbrirModal = () => {
    setShowModal(true);
    setErroFormulario("");
    setSucessoFormulario(false);
  };

  const handleFecharModal = () => {
    setShowModal(false);
    setNovoRegistro({
      data: "",
      site_id: "",
      equipe_id: "",
      unidades: "",
      horas: "",
      custo: "",
      qualidade_indice: "",
      prazo_status: "on_time",
      observacoes: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoRegistro((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    if (!novoRegistro.data) return "Data é obrigatória";
    if (!novoRegistro.site_id) return "Site é obrigatório";
    if (!novoRegistro.equipe_id) return "Equipe é obrigatória";
    if (!novoRegistro.unidades || novoRegistro.unidades < 0)
      return "Unidades deve ser >= 0";
    if (!novoRegistro.horas || novoRegistro.horas <= 0)
      return "Horas deve ser > 0";
    if (!novoRegistro.custo || novoRegistro.custo < 0)
      return "Custo deve ser >= 0";
    if (
      !novoRegistro.qualidade_indice ||
      novoRegistro.qualidade_indice < 0 ||
      novoRegistro.qualidade_indice > 1
    ) {
      return "Qualidade deve estar entre 0 e 1";
    }
    return null;
  };

  const handleSalvarRegistro = () => {
    const erro = validarFormulario();
    if (erro) {
      setErroFormulario(erro);
      return;
    }

    // Gerar novo ID
    const novoId = Math.max(...historico.map((h) => h.id), 0) + 1;

    // Criar novo registro
    const registro = {
      id: novoId,
      data: novoRegistro.data,
      site_id: parseInt(novoRegistro.site_id),
      equipe_id: parseInt(novoRegistro.equipe_id),
      unidades: parseInt(novoRegistro.unidades),
      horas: parseFloat(novoRegistro.horas),
      custo: parseFloat(novoRegistro.custo),
      qualidade_indice: parseFloat(novoRegistro.qualidade_indice),
      prazo_status: novoRegistro.prazo_status,
      observacoes: novoRegistro.observacoes,
    };

    // Adicionar à lista
    setHistorico((prev) => [registro, ...prev]);
    setDadosFiltrados((prev) => [registro, ...prev]);

    // Mostrar sucesso
    setSucessoFormulario(true);
    setTimeout(() => {
      handleFecharModal();
    }, 1500);
  };

  const handleDeletarRegistro = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este registro?")) {
      setHistorico((prev) => prev.filter((item) => item.id !== id));
      setDadosFiltrados((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const dadosPaginados = dadosFiltrados.slice(indexPrimeiro, indexUltimo);
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  return (
    <Container fluid className="py-4">
      {/* Header com estilo OTIS */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 p-3 rounded"
        style={{ backgroundColor: OTIS_DARK, color: "white" }}
      >
        <h3 className="mb-0">
          <FontAwesomeIcon icon={faClock} className="me-2" />
          Histórico de Produção
        </h3>
        <Button
          style={{ backgroundColor: OTIS_GOLD, borderColor: OTIS_GOLD }}
          onClick={handleAbrirModal}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Novo Registro
        </Button>
      </div>

      {/* KPI Cards com cores OTIS */}
      <Row className="mb-4 g-3">
        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 shadow-sm"
            style={{ borderLeft: `4px solid ${OTIS_GOLD}` }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Subtitle className="text-muted mb-2">
                    Produtividade
                  </Card.Subtitle>
                  <Card.Title style={{ color: OTIS_GOLD }} className="mb-1">
                    {kpis.produtividade}
                  </Card.Title>
                  <small className="text-muted">unidades/hora</small>
                </div>
                <FontAwesomeIcon
                  icon={faChartLine}
                  size="2x"
                  style={{ color: OTIS_GOLD }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 shadow-sm"
            style={{ borderLeft: `4px solid ${OTIS_DARK}` }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Subtitle className="text-muted mb-2">
                    Custo por Unidade
                  </Card.Subtitle>
                  <Card.Title style={{ color: OTIS_DARK }} className="mb-1">
                    R$ {kpis.custoPorUnidade}
                  </Card.Title>
                  <small className="text-muted">média</small>
                </div>
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="2x"
                  style={{ color: OTIS_DARK }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 shadow-sm"
            style={{ borderLeft: "4px solid #FFA500" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Subtitle className="text-muted mb-2">
                    Taxa de NC
                  </Card.Subtitle>
                  <Card.Title className="text-warning mb-1">
                    {kpis.taxaNC}%
                  </Card.Title>
                  <small className="text-muted">não conformidades</small>
                </div>
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  size="2x"
                  className="text-warning"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 shadow-sm"
            style={{ borderLeft: "4px solid #6c757d" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Subtitle className="text-muted mb-2">
                    Lead Time Médio
                  </Card.Subtitle>
                  <Card.Title className="text-secondary mb-1">
                    {kpis.leadTimeMedio}
                  </Card.Title>
                  <small className="text-muted">em desenvolvimento</small>
                </div>
                <FontAwesomeIcon
                  icon={faClock}
                  size="2x"
                  className="text-secondary"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros com cores OTIS */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3" style={{ color: OTIS_DARK }}>
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            Filtros
          </h5>
          <Row className="g-3">
            <Col xs={12} md={6} lg={2}>
              <Form.Group>
                <Form.Label>Data Início</Form.Label>
                <Form.Control
                  type="date"
                  value={filtros.from}
                  onChange={(e) =>
                    setFiltros({ ...filtros, from: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={2}>
              <Form.Group>
                <Form.Label>Data Fim</Form.Label>
                <Form.Control
                  type="date"
                  value={filtros.to}
                  onChange={(e) =>
                    setFiltros({ ...filtros, to: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={2}>
              <Form.Group>
                <Form.Label>Site</Form.Label>
                <Form.Select
                  value={filtros.site_id}
                  onChange={(e) =>
                    setFiltros({ ...filtros, site_id: e.target.value })
                  }
                >
                  <option value="">Todos</option>
                  {mockSites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={2}>
              <Form.Group>
                <Form.Label>Equipe</Form.Label>
                <Form.Select
                  value={filtros.equipe_id}
                  onChange={(e) =>
                    setFiltros({ ...filtros, equipe_id: e.target.value })
                  }
                >
                  <option value="">Todas</option>
                  {mockEquipes.map((equipe) => (
                    <option key={equipe.id} value={equipe.id}>
                      {equipe.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={2}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={filtros.prazo_status}
                  onChange={(e) =>
                    setFiltros({ ...filtros, prazo_status: e.target.value })
                  }
                >
                  <option value="">Todos</option>
                  <option value="on_time">No Prazo</option>
                  <option value="late">Atrasado</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} lg={2}>
              <Form.Group>
                <Form.Label className="d-block">&nbsp;</Form.Label>
                <div className="d-flex gap-2">
                  <Button
                    style={{
                      backgroundColor: OTIS_GOLD,
                      borderColor: OTIS_GOLD,
                    }}
                    onClick={aplicarFiltros}
                    className="flex-grow-1"
                  >
                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                    Buscar
                  </Button>
                  <Button
                    style={{
                      backgroundColor: OTIS_DARK,
                      borderColor: OTIS_DARK,
                    }}
                    onClick={exportarCSV}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabela com estilo melhorado */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {dadosPaginados.length === 0 ? (
            <Alert variant="info" className="m-4">
              <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
              Nenhum dado encontrado para o filtro atual
            </Alert>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead style={{ backgroundColor: OTIS_DARK, color: "white" }}>
                    <tr>
                      <th>Data</th>
                      <th>Site</th>
                      <th>Equipe</th>
                      <th>Unidades</th>
                      <th>Horas</th>
                      <th>Custo</th>
                      <th>Qualidade</th>
                      <th>Status</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosPaginados.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {new Date(item.data).toLocaleDateString("pt-BR")}
                        </td>
                        <td>
                          {mockSites.find((s) => s.id === item.site_id)?.nome}
                        </td>
                        <td>
                          {
                            mockEquipes.find((e) => e.id === item.equipe_id)
                              ?.nome
                          }
                        </td>
                        <td>
                          <strong style={{ color: OTIS_GOLD }}>
                            {item.unidades}
                          </strong>
                        </td>
                        <td>{item.horas}h</td>
                        <td>R$ {item.custo.toLocaleString("pt-BR")}</td>
                        <td>
                          <Badge
                            bg={
                              item.qualidade_indice >= 0.9
                                ? "success"
                                : item.qualidade_indice >= 0.8
                                ? "warning"
                                : "danger"
                            }
                          >
                            {(item.qualidade_indice * 100).toFixed(0)}%
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            style={{
                              backgroundColor:
                                item.prazo_status === "on_time"
                                  ? "#28a745"
                                  : OTIS_RED,
                            }}
                          >
                            {item.prazo_status === "on_time"
                              ? "No Prazo"
                              : "Atrasado"}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: OTIS_RED,
                              borderColor: OTIS_RED,
                            }}
                            onClick={() => handleDeletarRegistro(item.id)}
                            title="Deletar registro"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {totalPaginas > 1 && (
                <div className="d-flex justify-content-between align-items-center p-3 border-top">
                  <small className="text-muted">
                    Mostrando {indexPrimeiro + 1} a{" "}
                    {Math.min(indexUltimo, dadosFiltrados.length)} de{" "}
                    {dadosFiltrados.length} registros
                  </small>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: OTIS_DARK,
                        borderColor: OTIS_DARK,
                      }}
                      onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                      disabled={paginaAtual === 1}
                    >
                      Anterior
                    </Button>
                    <span className="px-3 py-1">
                      Página {paginaAtual} de {totalPaginas}
                    </span>
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: OTIS_DARK,
                        borderColor: OTIS_DARK,
                      }}
                      onClick={() =>
                        setPaginaAtual((p) => Math.min(totalPaginas, p + 1))
                      }
                      disabled={paginaAtual === totalPaginas}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Modal de Novo Registro com cores OTIS */}
      <Modal show={showModal} onHide={handleFecharModal} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: OTIS_DARK, color: "white" }}
        >
          <Modal.Title>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Novo Registro de Produção
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {sucessoFormulario && (
            <Alert variant="success">✅ Registro criado com sucesso!</Alert>
          )}

          {erroFormulario && (
            <Alert variant="danger">❌ {erroFormulario}</Alert>
          )}

          <Form>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Data *</Form.Label>
                  <Form.Control
                    type="date"
                    name="data"
                    value={novoRegistro.data}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Site *</Form.Label>
                  <Form.Select
                    name="site_id"
                    value={novoRegistro.site_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    {mockSites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Equipe *</Form.Label>
                  <Form.Select
                    name="equipe_id"
                    value={novoRegistro.equipe_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    {mockEquipes.map((equipe) => (
                      <option key={equipe.id} value={equipe.id}>
                        {equipe.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Unidades *</Form.Label>
                  <Form.Control
                    type="number"
                    name="unidades"
                    value={novoRegistro.unidades}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Ex: 12"
                  />
                  <Form.Text className="text-muted">
                    Quantidade de elevadores instalados
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Horas Trabalhadas *</Form.Label>
                  <Form.Control
                    type="number"
                    name="horas"
                    value={novoRegistro.horas}
                    onChange={handleInputChange}
                    min="0.1"
                    step="0.1"
                    placeholder="Ex: 96.5"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Custo (R$) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="custo"
                    value={novoRegistro.custo}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="Ex: 48000.00"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Índice de Qualidade * (0 a 1)</Form.Label>
                  <Form.Control
                    type="number"
                    name="qualidade_indice"
                    value={novoRegistro.qualidade_indice}
                    onChange={handleInputChange}
                    min="0"
                    max="1"
                    step="0.01"
                    placeholder="Ex: 0.92"
                  />
                  <Form.Text className="text-muted">
                    1.0 = 100% de qualidade
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Status de Prazo *</Form.Label>
                  <Form.Select
                    name="prazo_status"
                    value={novoRegistro.prazo_status}
                    onChange={handleInputChange}
                  >
                    <option value="on_time">No Prazo</option>
                    <option value="late">Atrasado</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Observações</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="observacoes"
                    value={novoRegistro.observacoes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Informações adicionais sobre a produção..."
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: OTIS_RED, borderColor: OTIS_RED }}
            onClick={handleSalvarRegistro}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Salvar Registro
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HistoricoPage;
