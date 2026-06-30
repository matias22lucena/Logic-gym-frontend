import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";


const Formulario = ({ idPage, setUsuarioLogueado }) => {
  const URL_USUARIOS = "http://localhost:3000/api/usuarios";

  const navegacion = useNavigate();

  const [mostrarPasswordLogin, setMostrarPasswordLogin] = useState(false);
  const [mostrarPasswordRegister, setMostrarPasswordRegister] = useState(false);
  const [mostrarRepPasswordRegister, setMostrarRepPasswordRegister] =
    useState(false);

  const [formulario, setFormulario] = useState({
    nombreUsuario: "",
    correoUsuario: "",
    contrasenia: "",
    repContrasenia: "",
    checkUsuario: false,
    rolUsuario: "usuario",
    bloqueo: false,
  });

  const [formLog, setFormLog] = useState({
    nombreUsuario: "",
    contrasenia: "",
  });

  const [erroresRegister, setErroresRegister] = useState({});
  const [erroresLogin, setErroresLogin] = useState({});

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/*   const getClass = (error, value) => {
    if (error) return "is-invalid";
    if (value) return "is-valid";
    return "";
  }; */

  const getClass = (error) => {
  if (error) return "is-invalid";
  return "";
};

  const handleChangeRegister = (ev) => {
    const { name, value, type, checked } = ev.target;

    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });

    setErroresRegister({
      ...erroresRegister,
      [name]: "",
    });
  };

  const handleChangeLogin = (ev) => {
    const { name, value } = ev.target;

    setFormLog({
      ...formLog,
      [name]: value,
    });

    setErroresLogin({
      ...erroresLogin,
      [name]: "",
    });
  };

  // ---------------- REGISTER ----------------
  const handleClickBottomRegister = async (ev) => {
    ev.preventDefault();

    let errores = {};

    if (!formulario.nombreUsuario.trim()) {
      errores.nombreUsuario = "Campo obligatorio";
    }

    if (!formulario.correoUsuario.trim()) {
      errores.correoUsuario = "Campo obligatorio";
    } else if (!validarEmail(formulario.correoUsuario)) {
      errores.correoUsuario = "Email inválido";
    }

    if (!formulario.contrasenia) {
      errores.contrasenia = "Campo obligatorio";
    } else if (formulario.contrasenia.length < 8) {
      errores.contrasenia = "Mínimo 8 caracteres";
    }

    if (!formulario.repContrasenia) {
      errores.repContrasenia = "Campo obligatorio";
    } else if (formulario.contrasenia !== formulario.repContrasenia) {
      errores.repContrasenia = "Las contraseñas no coinciden";
    }

    if (!formulario.checkUsuario) {
      errores.checkUsuario = "Debes aceptar los términos";
    }

    setErroresRegister(errores);

    if (Object.keys(errores).length > 0) return;

    try {
      const usuarioNuevo = {
        nombreUsuario: formulario.nombreUsuario.trim(),
        correoUsuario: formulario.correoUsuario.trim().toLowerCase(),
        contrasenia: formulario.contrasenia,
        rolUsuario: formulario.rolUsuario,
        bloqueo: formulario.bloqueo,
      };

      const respuesta = await fetch(`${URL_USUARIOS}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioNuevo),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.mensaje || "No se pudo registrar el usuario",
        });
        return;
      }

      Swal.fire({
        title: "Registro exitoso",
        text: "Tu cuenta fue creada correctamente",
        icon: "success",
      });

      setFormulario({
        nombreUsuario: "",
        correoUsuario: "",
        contrasenia: "",
        repContrasenia: "",
        checkUsuario: false,
        rolUsuario: "usuario",
        bloqueo: false,
      });

      setErroresRegister({});

      navegacion("/login");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
      });
    }
  };

  // ---------------- LOGIN ----------------
  const handleClickBottomLog = async (ev) => {
    ev.preventDefault();

    let errores = {};

    if (!formLog.nombreUsuario.trim()) {
      errores.nombreUsuario = "Campo obligatorio";
    }

    if (!formLog.contrasenia) {
      errores.contrasenia = "Campo obligatorio";
    }

    setErroresLogin(errores);

    if (Object.keys(errores).length > 0) return;

    try {
      const respuesta = await fetch(`${URL_USUARIOS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario: formLog.nombreUsuario.trim(),
          contrasenia: formLog.contrasenia,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.mensaje || "Usuario o contraseña incorrectos",
        });
        return;
      }

      if (data.usuario.bloqueo) {
        Swal.fire({
          icon: "error",
          title: "Usuario bloqueado",
          text: "No puedes ingresar con este usuario",
        });
        return;
      }

 sessionStorage.setItem("usuarioKey", JSON.stringify(data.usuario));

if (setUsuarioLogueado) {
  setUsuarioLogueado(data.usuario);
}
      setFormLog({
        nombreUsuario: "",
        contrasenia: "",
      });

      setErroresLogin({});

      Swal.fire({
        title: `Bienvenido ${data.usuario.nombreUsuario}`,
        text: "Iniciaste sesión correctamente",
        icon: "success",
      });

  if (data.usuario.rolUsuario === "admin") {
  navegacion("/administrador");
} else {
  navegacion("/");
}
    } catch (error) { 
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
      });
    }
  };

  // ---------------- FORM LOGIN ----------------
  const loginForm = (
    <Container fluid className="contenedor-auth">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="card-auth bg-dark text-light border border-light p-4 shadow">
            <Card.Body>
              <h1 className="text-center fw-bold mb-2">Iniciar sesión</h1>
              <p className="text-center fw-bold mb-4">Accede a tu cuenta</p>

              <Form onSubmit={handleClickBottomLog}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Usuario:</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreUsuario"
                    placeholder="Ingresa tu usuario"
                    value={formLog.nombreUsuario}
                    onChange={handleChangeLogin}
                    className={`bg-dark text-light border-light input-auth ${getClass(
                      erroresLogin.nombreUsuario,
                      formLog.nombreUsuario
                    )}`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {erroresLogin.nombreUsuario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="fw-bold">Contraseña:</Form.Label>
                  <Form.Control
                    type={mostrarPasswordLogin ? "text" : "password"}
                    name="contrasenia"
                    placeholder="Ingresa tu contraseña"
                    value={formLog.contrasenia}
                    onChange={handleChangeLogin}
                    className={`bg-dark text-light border-light pe-5 input-auth ${getClass(
                      erroresLogin.contrasenia,
                      formLog.contrasenia
                    )}`}
                  />

                  <span
                    className="icono-password"
                    onClick={() =>
                      setMostrarPasswordLogin(!mostrarPasswordLogin)
                    }
                  >
                    {mostrarPasswordLogin ? <FaEyeSlash /> : <FaEye />}
                  </span>

                  <Form.Control.Feedback type="invalid">
                    {erroresLogin.contrasenia}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 fw-bold bg-dark border-light boton-auth"
                >
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  // ---------------- FORM REGISTER ----------------
  const registerForm = (
    <Container fluid className="contenedor-auth">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="card-auth bg-dark text-light border border-light p-4 shadow">
            <Card.Body>
              <h1 className="text-center fw-bold mb-2">Registrarse</h1>
              <p className="text-center fw-bold mb-4">Crea tu cuenta</p>

              <Form onSubmit={handleClickBottomRegister}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Usuario:</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreUsuario"
                    placeholder="Ingresa tu usuario"
                    value={formulario.nombreUsuario}
                    onChange={handleChangeRegister}
                    className={`bg-dark text-light border-light input-auth ${getClass(
                      erroresRegister.nombreUsuario,
                      formulario.nombreUsuario
                    )}`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {erroresRegister.nombreUsuario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="correoUsuario"
                    placeholder="LogicGym@gmail.com"
                    value={formulario.correoUsuario}
                    onChange={handleChangeRegister}
                    className={`bg-dark text-light border-light input-auth ${getClass(
                      erroresRegister.correoUsuario,
                      formulario.correoUsuario
                    )}`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {erroresRegister.correoUsuario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="fw-bold">Contraseña:</Form.Label>
                  <Form.Control
                    type={mostrarPasswordRegister ? "text" : "password"}
                    name="contrasenia"
                    placeholder="Ingresa tu contraseña"
                    value={formulario.contrasenia}
                    onChange={handleChangeRegister}
                    className={`bg-dark text-light border-light pe-5 input-auth ${getClass(
                      erroresRegister.contrasenia,
                      formulario.contrasenia
                    )}`}
                  />

                  <span
                    className="icono-password"
                    onClick={() =>
                      setMostrarPasswordRegister(!mostrarPasswordRegister)
                    }
                  >
                    {mostrarPasswordRegister ? <FaEyeSlash /> : <FaEye />}
                  </span>

                  <Form.Control.Feedback type="invalid">
                    {erroresRegister.contrasenia}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label className="fw-bold">
                    Repetir contraseña:
                  </Form.Label>
                  <Form.Control
                    type={mostrarRepPasswordRegister ? "text" : "password"}
                    name="repContrasenia"
                    placeholder="Repite tu contraseña"
                    value={formulario.repContrasenia}
                    onChange={handleChangeRegister}
                    className={`bg-dark text-light border-light pe-5 input-auth ${getClass(
                      erroresRegister.repContrasenia,
                      formulario.repContrasenia
                    )}`}
                  />

                  <span
                    className="icono-password"
                    onClick={() =>
                      setMostrarRepPasswordRegister(!mostrarRepPasswordRegister)
                    }
                  >
                    {mostrarRepPasswordRegister ? <FaEyeSlash /> : <FaEye />}
                  </span>

                  <Form.Control.Feedback type="invalid">
                    {erroresRegister.repContrasenia}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Aceptar términos y condiciones"
                    name="checkUsuario"
                    checked={formulario.checkUsuario}
                    onChange={handleChangeRegister}
                    isInvalid={!!erroresRegister.checkUsuario}
                    className="fw-bold"
                  />

                  {erroresRegister.checkUsuario && (
                    <div className="invalid-feedback d-block">
                      {erroresRegister.checkUsuario}
                    </div>
                  )}
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 fw-bold bg-dark border-light boton-auth"
                >
                  Registrarse
                </Button>

                <p className="text-center fw-bold mt-3 mb-0">
                  ¿Ya tienes cuenta?
                </p>

                <Button
                  type="button"
                  className="w-100 mt-2 fw-bold bg-dark border-light boton-auth"
                  onClick={() => navegacion("/login")}
                >
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return <>{idPage === "login" ? loginForm : registerForm}</>;
};

export default Formulario;