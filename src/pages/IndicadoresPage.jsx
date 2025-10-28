import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faExclamationTriangle,
  faDollarSign,
  faArrowDown,
  faArrowUp,
  faBullseye,
  faCheckCircle,
  faInfoCircle,
  faChartBar,
  faClock,
  faAward,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./IndicadoresPage.css";

const IndicadoresPage = () => {
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

  const [parametros, setParametros] = useState({
    periodo: "mensal",
    site_id: "",
    equipe_id: "",
  });

  const [resultado, setResultado] = useState(null);

  const gerarIndicacao = () => {
    const metaSugerida = 42;
    const desvio = 8;

    setResultado({
      meta_sugerida_unidades: metaSugerida,
      faixa_segura_min: metaSugerida - desvio,
      faixa_segura_max: metaSugerida + desvio,
      kpis: {
        custo_por_unidade: {
          atual: 1250,
          media: 1156,
          variacao: 8.1,
          tendencia: "up",
        },
        taxa_retrabalho: {
          atual: 15,
          meta: 12,
          media: 13.5,
          variacao: 11.1,
          tendencia: "up",
        },
        produtividade: {
          atual: 3.2,
          media: 3.5,
          variacao: -8.6,
          tendencia: "down",
        },
        qualidade_indice: {
          atual: 87,
          meta: 85,
          media: 88.5,
          variacao: -1.7,
          tendencia: "down",
        },
      },
      alertas: [
        "Custo por unidade acima da média nos últimos 2 meses",
        "Produtividade em queda: -12% vs média trimestral",
        "Taxa de retrabalho acima da meta estabelecida",
      ],
      parametros: {
        janelas_historico: 3,
        peso_sazonal: 0.2,
        limiar_qualidade: 0.85,
        metodo_faixa: "desvio_padrao",
      },
    });
  };

  return (
    <div className="indicadores-page">
      <Container fluid className="py-4">
        {/* Header */}
        <div className="page-header mb-4">
          <h2 className="page-title">
            <FontAwesomeIcon icon={faChartLine} className="me-3" />
            Indicação de Produção
          </h2>
          <p className="page-subtitle">
            Análise preditiva e sugestões de metas baseadas em dados históricos
          </p>
        </div>

        {/* Formulário de Parâmetros */}
        <Card className="params-card mb-4">
          <Card.Body>
            <h5 className="section-title mb-4">
              <FontAwesomeIcon icon={faBullseye} className="me-2" />
              Configurar Análise
            </h5>
            <Row className="g-3">
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="input-label">Período</Form.Label>
                  <Form.Select
                    className="custom-select"
                    value={parametros.periodo}
                    onChange={(e) =>
                      setParametros({ ...parametros, periodo: e.target.value })
                    }
                  >
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                    <option value="trimestral">Trimestral</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="input-label">
                    Site (opcional)
                  </Form.Label>
                  <Form.Select
                    className="custom-select"
                    value={parametros.site_id}
                    onChange={(e) =>
                      setParametros({ ...parametros, site_id: e.target.value })
                    }
                  >
                    <option value="">Todos os sites</option>
                    {mockSites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="input-label">
                    Equipe (opcional)
                  </Form.Label>
                  <Form.Select
                    className="custom-select"
                    value={parametros.equipe_id}
                    onChange={(e) =>
                      setParametros({
                        ...parametros,
                        equipe_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Todas as equipes</option>
                    {mockEquipes.map((equipe) => (
                      <option key={equipe.id} value={equipe.id}>
                        {equipe.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-4">
              <Button className="btn-generate" onClick={gerarIndicacao}>
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                Gerar Indicação
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Resultados */}
        {resultado && (
          <>
            {/* KPIs de Performance */}
            <div className="mb-4">
              <h5 className="section-title mb-3">
                <FontAwesomeIcon icon={faChartBar} className="me-2" />
                Indicadores de Performance
              </h5>
              <Row className="g-3">
                {/* Custo por Unidade */}
                <Col xs={12} sm={6} lg={3}>
                  <Card className="kpi-card">
                    <Card.Body>
                      <div className="kpi-header">
                        <div className="kpi-icon custo">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </div>
                        <Badge
                          bg={
                            resultado.kpis.custo_por_unidade.tendencia === "up"
                              ? "danger"
                              : "success"
                          }
                          className="kpi-badge"
                        >
                          <FontAwesomeIcon
                            icon={
                              resultado.kpis.custo_por_unidade.tendencia ===
                              "up"
                                ? faArrowUp
                                : faArrowDown
                            }
                            className="me-1"
                          />
                          {Math.abs(
                            resultado.kpis.custo_por_unidade.variacao
                          ).toFixed(1)}
                          %
                        </Badge>
                      </div>
                      <div className="kpi-label">Custo por Unidade</div>
                      <div className="kpi-value">
                        R${" "}
                        {resultado.kpis.custo_por_unidade.atual.toLocaleString()}
                      </div>
                      <div className="kpi-meta">
                        Média: R${" "}
                        {resultado.kpis.custo_por_unidade.media.toLocaleString()}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Taxa de Retrabalho */}
                <Col xs={12} sm={6} lg={3}>
                  <Card className="kpi-card">
                    <Card.Body>
                      <div className="kpi-header">
                        <div className="kpi-icon retrabalho">
                          <FontAwesomeIcon icon={faExclamationTriangle} />
                        </div>
                        <Badge
                          bg={
                            resultado.kpis.taxa_retrabalho.atual >
                            resultado.kpis.taxa_retrabalho.meta
                              ? "warning"
                              : "success"
                          }
                          className="kpi-badge"
                        >
                          <FontAwesomeIcon
                            icon={
                              resultado.kpis.taxa_retrabalho.tendencia === "up"
                                ? faArrowUp
                                : faArrowDown
                            }
                            className="me-1"
                          />
                          {Math.abs(
                            resultado.kpis.taxa_retrabalho.variacao
                          ).toFixed(1)}
                          %
                        </Badge>
                      </div>
                      <div className="kpi-label">Taxa de Retrabalho</div>
                      <div className="kpi-value">
                        {resultado.kpis.taxa_retrabalho.atual}%
                      </div>
                      <div className="kpi-meta">
                        Meta: {resultado.kpis.taxa_retrabalho.meta}% | Média:{" "}
                        {resultado.kpis.taxa_retrabalho.media}%
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Produtividade */}
                <Col xs={12} sm={6} lg={3}>
                  <Card className="kpi-card">
                    <Card.Body>
                      <div className="kpi-header">
                        <div className="kpi-icon produtividade">
                          <FontAwesomeIcon icon={faTachometerAlt} />
                        </div>
                        <Badge
                          bg={
                            resultado.kpis.produtividade.tendencia === "up"
                              ? "success"
                              : "danger"
                          }
                          className="kpi-badge"
                        >
                          <FontAwesomeIcon
                            icon={
                              resultado.kpis.produtividade.tendencia === "up"
                                ? faArrowUp
                                : faArrowDown
                            }
                            className="me-1"
                          />
                          {Math.abs(
                            resultado.kpis.produtividade.variacao
                          ).toFixed(1)}
                          %
                        </Badge>
                      </div>
                      <div className="kpi-label">Produtividade</div>
                      <div className="kpi-value">
                        {resultado.kpis.produtividade.atual.toFixed(1)} unid/h
                      </div>
                      <div className="kpi-meta">
                        Média: {resultado.kpis.produtividade.media.toFixed(1)}{" "}
                        unid/h
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Índice de Qualidade */}
                <Col xs={12} sm={6} lg={3}>
                  <Card className="kpi-card">
                    <Card.Body>
                      <div className="kpi-header">
                        <div className="kpi-icon qualidade">
                          <FontAwesomeIcon icon={faAward} />
                        </div>
                        <Badge
                          bg={
                            resultado.kpis.qualidade_indice.atual >=
                            resultado.kpis.qualidade_indice.meta
                              ? "success"
                              : "warning"
                          }
                          className="kpi-badge"
                        >
                          <FontAwesomeIcon
                            icon={
                              resultado.kpis.qualidade_indice.tendencia === "up"
                                ? faArrowUp
                                : faArrowDown
                            }
                            className="me-1"
                          />
                          {Math.abs(
                            resultado.kpis.qualidade_indice.variacao
                          ).toFixed(1)}
                          %
                        </Badge>
                      </div>
                      <div className="kpi-label">Índice de Qualidade</div>
                      <div className="kpi-value">
                        {resultado.kpis.qualidade_indice.atual}%
                      </div>
                      <div className="kpi-meta">
                        Meta: {resultado.kpis.qualidade_indice.meta}% | Média:{" "}
                        {resultado.kpis.qualidade_indice.media}%
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Cards de Meta Principal */}
            <div className="mb-4">
              <h5 className="section-title mb-3">
                <FontAwesomeIcon icon={faBullseye} className="me-2" />
                Metas Sugeridas
              </h5>
              <Row className="g-3">
                <Col xs={12} md={4}>
                  <Card className="meta-card meta-principal">
                    <Card.Body className="text-center">
                      <div className="meta-icon mb-3">
                        <FontAwesomeIcon icon={faBullseye} size="2x" />
                      </div>
                      <div className="meta-label">Meta Sugerida</div>
                      <div className="meta-value">
                        {resultado.meta_sugerida_unidades}
                      </div>
                      <div className="meta-unit">unidades/mês</div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} md={4}>
                  <Card className="meta-card meta-minima">
                    <Card.Body className="text-center">
                      <div className="meta-icon mb-3">
                        <FontAwesomeIcon icon={faArrowDown} size="2x" />
                      </div>
                      <div className="meta-label">Faixa Segura Mínima</div>
                      <div className="meta-value">
                        {resultado.faixa_segura_min}
                      </div>
                      <div className="meta-unit">limite inferior</div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} md={4}>
                  <Card className="meta-card meta-maxima">
                    <Card.Body className="text-center">
                      <div className="meta-icon mb-3">
                        <FontAwesomeIcon icon={faArrowUp} size="2x" />
                      </div>
                      <div className="meta-label">Faixa Segura Máxima</div>
                      <div className="meta-value">
                        {resultado.faixa_segura_max}
                      </div>
                      <div className="meta-unit">limite superior</div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Alertas */}
            {resultado.alertas.length > 0 && (
              <Card className="alertas-card mb-4">
                <Card.Body>
                  <h5 className="section-title mb-4">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="me-2"
                    />
                    Alertas e Recomendações
                  </h5>
                  <ListGroup variant="flush">
                    {resultado.alertas.map((alerta, index) => (
                      <ListGroup.Item key={index} className="alert-item">
                        <div className="d-flex align-items-start">
                          <div className="alert-icon me-3">
                            <FontAwesomeIcon
                              icon={
                                alerta.includes("Custo")
                                  ? faDollarSign
                                  : alerta.includes("Produtividade")
                                  ? faArrowDown
                                  : faExclamationTriangle
                              }
                            />
                          </div>
                          <div className="alert-text flex-grow-1">
                            <p className="mb-0">{alerta}</p>
                          </div>
                          <Badge bg="warning" className="alert-badge">
                            Atenção
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {/* Parâmetros do Algoritmo */}
            <Card className="params-algoritmo-card">
              <Card.Body>
                <h5 className="section-title mb-4">
                  <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                  Parâmetros do Algoritmo
                </h5>
                <Row className="g-3">
                  <Col xs={6} md={3}>
                    <div className="param-box">
                      <div className="param-icon">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <div className="param-label">Janelas de Histórico</div>
                      <div className="param-value">
                        {resultado.parametros.janelas_historico} meses
                      </div>
                    </div>
                  </Col>

                  <Col xs={6} md={3}>
                    <div className="param-box">
                      <div className="param-icon">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <div className="param-label">Peso Sazonal</div>
                      <div className="param-value">
                        {resultado.parametros.peso_sazonal * 100}%
                      </div>
                    </div>
                  </Col>

                  <Col xs={6} md={3}>
                    <div className="param-box">
                      <div className="param-icon">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <div className="param-label">Limiar de Qualidade</div>
                      <div className="param-value">
                        {resultado.parametros.limiar_qualidade * 100}%
                      </div>
                    </div>
                  </Col>

                  <Col xs={6} md={3}>
                    <div className="param-box">
                      <div className="param-icon">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <div className="param-label">Método de Faixa</div>
                      <div className="param-value text-capitalize">
                        {resultado.parametros.metodo_faixa.replace("_", " ")}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Alert variant="info" className="algoritmo-info mt-4 mb-0">
                  <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                  <strong>Metodologia:</strong> Média móvel das últimas{" "}
                  {resultado.parametros.janelas_historico} janelas, com ajuste
                  sazonal de {resultado.parametros.peso_sazonal * 100}%. Faixa
                  calculada por{" "}
                  {resultado.parametros.metodo_faixa.replace("_", " ")}.
                </Alert>
              </Card.Body>
            </Card>
          </>
        )}

        {/* Estado vazio */}
        {!resultado && (
          <Card className="empty-state-card">
            <Card.Body className="text-center py-5">
              <div className="empty-icon mb-4">
                <FontAwesomeIcon icon={faChartLine} size="4x" />
              </div>
              <h5 className="empty-title">Nenhuma indicação gerada ainda</h5>
              <p className="empty-text">
                Configure os parâmetros acima e clique em "Gerar Indicação" para
                visualizar as análises e recomendações
              </p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default IndicadoresPage;
