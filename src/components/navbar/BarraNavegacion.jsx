import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import "../navbar/BarraNavegacion.css";
import Login from "../../pages/IniciarSesionPage";
import Registro from "../../pages/RegistroPages";


const BarraNavegacion = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const logout = () => {
    setUsuarioLogueado(false);
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid className="px-4 px-lg-5">

        <Navbar.Brand as={Link} to={"/"} className="logo-text">
        Logic Gym
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav"/>

        <Navbar.Collapse className="navbar-nav">

        <Nav className="mx-auto gap-5">

          {usuarioLogueado && usuarioLogueado.role === "admin" && (
                <NavLink as={NavLink} to={"/administrador"} className="custom-link">
                  Administrador
                </NavLink>
            )}

          <Nav.Link as={NavLink} to={"/"} className="custom-link">
          Inicio
          </Nav.Link>

          <Nav.Link as={NavLink} to={"/planes"} className="custom-link">
          Planes
          </Nav.Link>

          <Nav.Link as={NavLink} to={"/contacto"} className="custom-link">
          Contacto
          </Nav.Link>

          <Nav.Link as={NavLink} to={"/nosotros"} className="custom-link">
          Nosotros
          </Nav.Link>

          {!usuarioLogueado && (
            <>
          <Nav.Link as={NavLink} to={"/login"} className="custom-link">
          Login
          </Nav.Link>

          <Nav.Link as={NavLink} to={"/Registro"} className="custom-link">
          Registrate
          </Nav.Link>
          </>
          )}

          {usuarioLogueado && (
              <Button variant="dark" onClick={logout}>
                  Logout
                </Button>
            )}

        </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

export default BarraNavegacion;