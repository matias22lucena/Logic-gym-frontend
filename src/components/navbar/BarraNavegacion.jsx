import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../navbar/BarraNavegacion.css";

const BarraNavegacion = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();

  const logout = () => {
    setUsuarioLogueado(false);
    sessionStorage.removeItem("usuarioKey");
    navegacion("/");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand as={Link} to="/" className="logo-text">
          Logic Gym
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto gap-4 align-items-center">
            <Nav.Link as={NavLink} to="/" className="custom-link">
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contacto" className="custom-link">
              Contacto
            </Nav.Link>

            <Nav.Link as={NavLink} to="/sobrenosotros" className="custom-link">
              Nosotros
            </Nav.Link>

            {usuarioLogueado?.rolUsuario === "admin" && (
<NavDropdown
  title="Admin"
  id="admin-dropdown"
  className="admin-dropdown"
>
    <NavDropdown.Item as={NavLink} to="/administrador">
      Panel
    </NavDropdown.Item>

    <NavDropdown.Item as={NavLink} to="/administrador/usuarios">
      Usuarios
    </NavDropdown.Item>

    <NavDropdown.Item as={NavLink} to="/administrador/clases">
      Clases
    </NavDropdown.Item>
  </NavDropdown>
)}

            {usuarioLogueado?.rolUsuario === "usuario" && (
              <Nav.Link as={NavLink} to="/mis-reservas" className="custom-link">
                Mis reservas
              </Nav.Link>
            )}

            {!usuarioLogueado && (
              <>
                <Nav.Link as={NavLink} to="/login" className="custom-link">
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/registro" className="custom-link">
                  Registrate
                </Nav.Link>
              </>
            )}

            {usuarioLogueado && (
              <>
                <span className="custom-link">
                  {usuarioLogueado.nombreUsuario}
                </span>

                <Button variant="dark" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;