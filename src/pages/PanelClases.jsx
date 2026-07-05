import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { crearClase, obtenerClases } from "../helpers/queriesClases";

const PanelClases = () => {
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [formClase, setFormClase] = useState({
    detalleClase: "",
    profesor: "",
    fecha: "",
    hora: "",
  });

  const [errores, setErrores] = useState({});

  const cargarClases = async () => {
    setCargando(true);
    setError("");

    const { ok, data } = await obtenerClases();

    if (!ok) {
      setError("No se pudieron cargar las clases.");
      setClases([]);
      setCargando(false);
      return;
    }

    setClases(data);
    setCargando(false);
  };

  useEffect(() => {
    cargarClases();
  }, []);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormClase({
      ...formClase,
      [name]: value,
    });

    setErrores({
      ...errores,
      [name]: "",
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formClase.detalleClase.trim()) {
      nuevosErrores.detalleClase = "El detalle de la clase es obligatorio";
    }

    if (!formClase.profesor.trim()) {
      nuevosErrores.profesor = "El profesor es obligatorio";
    }

    if (!formClase.fecha) {
      nuevosErrores.fecha = "La fecha es obligatoria";
    }

    if (!formClase.hora) {
      nuevosErrores.hora = "La hora es obligatoria";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!validarFormulario()) return;

    const claseNueva = {
      detalleClase: formClase.detalleClase.trim(),
      profesor: formClase.profesor.trim(),
      fecha: formClase.fecha,
      hora: formClase.hora,
    };

    const { ok, data } = await crearClase(claseNueva);

    if (!ok) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.mensaje || "No se pudo crear la clase",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Clase creada",
      text: "La clase fue creada correctamente",
    });

    setFormClase({
      detalleClase: "",
      profesor: "",
      fecha: "",
      hora: "",
    });

    setErrores({});

    cargarClases();
  };

  return (
    <Container className="my-5">
      <h1 className="mb-3">Administrar clases</h1>

      <p className="mb-4">
        Desde esta sección podés crear y visualizar las clases disponibles del
        gimnasio.
      </p>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Crear nueva clase</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Detalle de la clase</Form.Label>
                  <Form.Control
                    type="text"
                    name="detalleClase"
                    placeholder="Ej: Funcional, Spinning, Yoga"
                    value={formClase.detalleClase}
                    onChange={handleChange}
                    isInvalid={!!errores.detalleClase}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.detalleClase}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Profesor/a</Form.Label>
                  <Form.Control
                    type="text"
                    name="profesor"
                    placeholder="Nombre del profesor"
                    value={formClase.profesor}
                    onChange={handleChange}
                    isInvalid={!!errores.profesor}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.profesor}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formClase.fecha}
                    onChange={handleChange}
                    isInvalid={!!errores.fecha}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.fecha}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="hora"
                    value={formClase.hora}
                    onChange={handleChange}
                    isInvalid={!!errores.hora}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.hora}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="dark" className="w-100">
                  Crear clase
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Clases registradas</Card.Title>

              {cargando && (
                <div className="text-center my-5">
                  <Spinner animation="border" />
                  <p className="mt-3">Cargando clases...</p>
                </div>
              )}

              {!cargando && error && <Alert variant="danger">{error}</Alert>}

              {!cargando && !error && clases.length === 0 && (
                <Alert variant="warning">No hay clases registradas.</Alert>
              )}

              {!cargando && !error && clases.length > 0 && (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Clase</th>
                      <th>Profesor/a</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clases.map((clase, index) => (
                      <tr key={clase._id}>
                        <td>{index + 1}</td>
                        <td>{clase.detalleClase}</td>
                        <td>{clase.profesor}</td>
                        <td>{clase.fecha}</td>
                        <td>{clase.hora}</td>
                        <td>
                          {clase.activa ? (
                            <Badge bg="success">Activa</Badge>
                          ) : (
                            <Badge bg="secondary">Inactiva</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PanelClases;