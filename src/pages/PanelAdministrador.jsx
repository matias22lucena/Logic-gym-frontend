import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PanelAdministrador.css";

const PanelAdministrador = () => {
  return (
    <section className="panel-admin-page">
      <Container>
        <div className="panel-admin-header">
          <p className="panel-admin-label">Panel administrador</p>

          <h1 className="panel-admin-title">Panel de administrador</h1>

          <p className="panel-admin-text">
            Bienvenido al panel principal de administración de Logic Gym. Desde
            acá podés administrar usuarios, clases y la información principal
            del gimnasio.
          </p>
        </div>

        <Row className="g-4">
          <Col md={6}>
            <Card className="panel-admin-card h-100">
              <Card.Body>
                <div className="panel-admin-card-icon">👤</div>

                <Card.Title className="panel-admin-card-title">
                  Administrar usuarios
                </Card.Title>

                <Card.Text className="panel-admin-card-text">
                  Ver, editar, bloquear o eliminar los usuarios registrados en
                  la base de datos.
                </Card.Text>

                <Link
                  to="/administrador/usuarios"
                  className="panel-admin-btn"
                >
                  Ir a usuarios
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="panel-admin-card h-100">
              <Card.Body>
                <div className="panel-admin-card-icon">📅</div>

                <Card.Title className="panel-admin-card-title">
                  Administrar clases
                </Card.Title>

                <Card.Text className="panel-admin-card-text">
                  Crear, editar, eliminar y visualizar las clases disponibles
                  del gimnasio.
                </Card.Text>

                <Link
                  to="/administrador/clases"
                  className="panel-admin-btn"
                >
                  Ir a clases
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
  
export default PanelAdministrador;