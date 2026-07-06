import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Alert,
  Badge,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import {
  obtenerUsuarios,
  editarUsuario,
  eliminarUsuario,
} from "../helpers/queriesUsuarios";

const Administrador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  const [usuarioEditar, setUsuarioEditar] = useState({
    id: "",
    nombreUsuario: "",
    correoUsuario: "",
    rolUsuario: "",
    bloqueo: false,
  });

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

  const abrirModal = (usuario) => {
    setUsuarioEditar({
      id: usuario._id,
      nombreUsuario: usuario.nombreUsuario,
      correoUsuario: usuario.correoUsuario,
      rolUsuario: usuario.rolUsuario,
      bloqueo: usuario.bloqueo,
    });

    setShow(true);
  };

  const guardarCambios = async () => {
    const { ok } = await editarUsuario(usuarioEditar.id, usuarioEditar);

    if (ok) {
      setShow(false);
      cargarUsuarios();
    } else {
      alert("No se pudo actualizar el usuario");
    }
  };

  const eliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que desea eliminar este usuario?",
    );

    if (!confirmar) return;

    const { ok } = await eliminarUsuario(id);

    if (ok) {
      cargarUsuarios();
    } else {
      alert("No se pudo eliminar.");
    }
  };

  const bloquearUsuario = async (usuario) => {
    const { ok } = await editarUsuario(usuario._id, {
      bloqueo: !usuario.bloqueo,
    });

    if (ok) {
      cargarUsuarios();
    }
  };

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
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario._id}>
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

              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModal(usuario)}
                >
                  Editar
                </Button>

                <Button
                  variant={usuario.bloqueo ? "success" : "secondary"}
                  size="sm"
                  className="me-2"
                  onClick={() => bloquearUsuario(usuario)}
                >
                  {usuario.bloqueo ? "Desbloquear" : "Bloquear"}
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminar(usuario._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <Container className="my-5">
        <h1 className="mb-3">Panel de usuarios</h1>

        <p className="mb-4">
          Desde este panel podrás administrar todos los usuarios.
        </p>

        {mostrarUsuarios()}
      </Container>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar usuario</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de usuario</Form.Label>

            <Form.Control
              type="text"
              value={usuarioEditar.nombreUsuario}
              onChange={(e) =>
                setUsuarioEditar({
                  ...usuarioEditar,
                  nombreUsuario: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              value={usuarioEditar.correoUsuario}
              onChange={(e) =>
                setUsuarioEditar({
                  ...usuarioEditar,
                  correoUsuario: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Rol</Form.Label>

            <Form.Select
              value={usuarioEditar.rolUsuario}
              onChange={(e) =>
                setUsuarioEditar({
                  ...usuarioEditar,
                  rolUsuario: e.target.value,
                })
              }
            >
              <option value="usuario">Usuario</option>

              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>

          <Button variant="primary" onClick={guardarCambios}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Administrador;