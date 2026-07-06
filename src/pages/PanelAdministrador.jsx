import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PanelAdministrador = () => {
  return (
    <Container className="my-5">
      <h1 className="mb-3">Panel de administrador</h1>

      <p className="mb-4">
        Bienvenido al panel principal de administración de Logic Gym.
        Desde acá podés administrar usuarios y clases.
      </p>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>Administrar usuarios</Card.Title>
              <Card.Text>
                Ver los usuarios registrados en la base de datos.
              </Card.Text>

              <Link to="/administrador/usuarios" className="btn btn-dark">
                Ir a usuarios
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>Administrar clases</Card.Title>
              <Card.Text>
                Crear y visualizar las clases disponibles del gimnasio.
              </Card.Text>

              <Link to="/administrador/clases" className="btn btn-dark">
                Ir a clases
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PanelAdministrador;