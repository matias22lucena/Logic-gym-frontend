import { useEffect, useState } from "react";
import { Container, Table, Alert, Badge } from "react-bootstrap";
import { obtenerUsuarios } from "../helpers/queriesUsuarios";

const Administrador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  const cargarUsuarios = async () => {
    const { ok, data } = await obtenerUsuarios();

    if (!ok) {
      setError("No se pudieron cargar los usuarios.");
      return;
    }

    setUsuarios(data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const mostrarUsuarios = () => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    if (usuarios.length === 0) {
      return <Alert variant="warning">No hay usuarios registrados.</Alert>;
    }

    return (
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
    );
  };

  return (
    <Container className="my-5">
      <h1 className="mb-3">Panel de usuarios</h1>

      <p className="mb-4">
        Desde este panel vas a poder ver los usuarios registrados.
      </p>

      <h2 className="mb-3">Usuarios registrados</h2>

      {mostrarUsuarios()}
    </Container>
  );
};

export default Administrador;