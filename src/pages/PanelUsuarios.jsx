import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Badge } from "react-bootstrap";
import { obtenerUsuarios } from "../helpers/queriesUsuarios";

const Administrador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarUsuarios = async () => {
    setCargando(true);
    setError("");

    const { ok, data } = await obtenerUsuarios();

    if (!ok) {
      setError("No se pudieron cargar los usuarios.");
      setUsuarios([]);
      setCargando(false);
      return;
    }

    setUsuarios(data);
    setCargando(false);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="mb-3">Panel de administrador</h1>
      <p className="mb-4">
        Desde este panel vas a poder administrar los usuarios registrados.
      </p>

      <h2 className="mb-3">Usuarios registrados</h2>

      {cargando && (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p className="mt-3">Cargando usuarios...</p>
        </div>
      )}

      {!cargando && error && <Alert variant="danger">{error}</Alert>}

      {!cargando && !error && usuarios.length === 0 && (
        <Alert variant="warning">No hay usuarios registrados.</Alert>
      )}

      {!cargando && !error && usuarios.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={usuario._id || usuario.id}>
                <td>{index + 1}</td>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.correoUsuario}</td>
                <td>
                  {usuario.rolUsuario === "admin" ? (
                    <Badge bg="danger">Admin</Badge>
                  ) : (
                    <Badge bg="primary">Usuario</Badge>
                  )}
                </td>
                <td>
                  {usuario.bloqueo ? (
                    <Badge bg="secondary">Bloqueado</Badge>
                  ) : (
                    <Badge bg="success">Activo</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Administrador;