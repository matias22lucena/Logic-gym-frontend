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

import {
  registrarUsuario,
  loginUsuario,
} from "../../helpers/queriesUsuarios";

import "../formulario/Formulario.css"

const Formulario = ({ idPage, setUsuarioLogueado }) => {
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

  const validarUsuario = (usuario) => {
    const regexUsuario = /^[a-zA-Z0-9_]+$/;
    return regexUsuario.test(usuario);
  };

  const validarPassword = (password) => {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);

    return tieneMayuscula && tieneMinuscula && tieneNumero;
  };

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

  const handleClickBottomRegister = async (ev) => {
    ev.preventDefault();

    let errores = {};

    const usuario = formulario.nombreUsuario.trim();
    const email = formulario.correoUsuario.trim();
    const password = formulario.contrasenia;
    const repPassword = formulario.repContrasenia;

    if (!usuario) {
      errores.nombreUsuario =
        "El usuario es obligatorio. Debe tener entre 3 y 20 caracteres. Puede usar letras, números y guion bajo.";
    } else if (usuario.length < 3 || usuario.length > 20) {
      errores.nombreUsuario =
        "El usuario debe tener entre 3 y 20 caracteres.";
    } else if (!validarUsuario(usuario)) {
      errores.nombreUsuario =
        "El usuario solo puede contener letras, números y guion bajo. No puede tener espacios ni símbolos.";
    }

    if (!email) {
      errores.correoUsuario =
        "El email es obligatorio. Ejemplo válido: usuario@gmail.com";
    } else if (!validarEmail(email)) {
      errores.correoUsuario =
        "Email inválido. Debe tener un formato como usuario@gmail.com";
    }

    if (!password) {
      errores.contrasenia =
        "La contraseña es obligatoria. Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.";
    } else if (password.length < 8) {
      errores.contrasenia =
        "La contraseña debe tener mínimo 8 caracteres.";
    } else if (!validarPassword(password)) {
      errores.contrasenia =
        "La contraseña debe incluir al menos una mayúscula, una minúscula y un número.";
    }

    if (!repPassword) {
      errores.repContrasenia =
        "Debes repetir la contraseña para confirmar que está bien escrita.";
    } else if (password !== repPassword) {
      errores.repContrasenia =
        "Las contraseñas no coinciden. Escribí exactamente la misma contraseña.";
    }

    if (!formulario.checkUsuario) {
      errores.checkUsuario =
        "Debes aceptar los términos y condiciones para poder registrarte.";
    }

    setErroresRegister(errores);

    if (Object.keys(errores).length > 0) return;

    try {
      const usuarioNuevo = {
        nombreUsuario: usuario,
        correoUsuario: email.toLowerCase(),
        contrasenia: password,
        rolUsuario: formulario.rolUsuario,
        bloqueo: formulario.bloqueo,
      };

      const { ok, data } = await registrarUsuario(usuarioNuevo);

      if (!ok) {
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

  const handleClickBottomLog = async (ev) => {
    ev.preventDefault();

    let errores = {};

    if (!formLog.nombreUsuario.trim()) {
      errores.nombreUsuario =
        "El usuario es obligatorio. Debes ingresar el nombre de usuario con el que te registraste.";
    }

    if (!formLog.contrasenia) {
      errores.contrasenia =
        "La contraseña es obligatoria. Debes ingresar la contraseña de tu cuenta.";
    }

    setErroresLogin(errores);

    if (Object.keys(errores).length > 0) return;

    try {
      const { ok, data } = await loginUsuario({
        nombreUsuario: formLog.nombreUsuario.trim(),
        contrasenia: formLog.contrasenia,
      });

      if (!ok) {
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
                      erroresLogin.nombreUsuario
                    )}`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {erroresLogin.nombreUsuario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Contraseña:</Form.Label>

                  <div className="password-input-wrapper">
                    <Form.Control
                      type={mostrarPasswordLogin ? "text" : "password"}
                      name="contrasenia"
                      placeholder="Ingresa tu contraseña"
                      value={formLog.contrasenia}
                      onChange={handleChangeLogin}
                      className={`bg-dark text-light border-light input-auth ${getClass(
                        erroresLogin.contrasenia
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
                  </div>

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
                    placeholder="Ej: logic_user123"
                    value={formulario.nombreUsuario}
                    onChange={handleChangeRegister}
                    className={`bg-dark text-light border-light input-auth ${getClass(
                      erroresRegister.nombreUsuario
                    )}`}
                  />

                  <Form.Text className="text-light opacity-75">
                    Entre 3 y 20 caracteres. Solo letras, números y guion bajo.
                  </Form.Text>

                  <Form.Control.Feedback type="invalid">
                    {erroresRegister.nombreUsuario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="correoUsuario"
                    placeholder="usuario@gmail.com"
                    value={formulario.correoUsuario}
                    onChange={handleChangeRegister}
                    className={`bg-dark text-light border-light input-auth ${getClass(
                      erroresRegister.correoUsuario
                    )}`}
                  />

                  <Form.Text className="text-light opacity-75">
                    Debe tener un formato válido. Ejemplo: usuario@gmail.com
                  </Form.Text>

                  <Form.Control.Feedback type="invalid">
                    {erroresRegister.correoUsuario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Contraseña:</Form.Label>

                  <div className="password-input-wrapper">
                    <Form.Control
                      type={mostrarPasswordRegister ? "text" : "password"}
                      name="contrasenia"
                      placeholder="Ingresa tu contraseña"
                      value={formulario.contrasenia}
                      onChange={handleChangeRegister}
                      className={`bg-dark text-light border-light input-auth ${getClass(
                        erroresRegister.contrasenia
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
                  </div>

                  <Form.Text className="text-light opacity-75">
                    Mínimo 8 caracteres, una mayúscula, una minúscula y un
                    número.
                  </Form.Text>

                  <Form.Control.Feedback type="invalid">
                    {erroresRegister.contrasenia}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Repetir contraseña:
                  </Form.Label>

                  <div className="password-input-wrapper">
                    <Form.Control
                      type={mostrarRepPasswordRegister ? "text" : "password"}
                      name="repContrasenia"
                      placeholder="Repite tu contraseña"
                      value={formulario.repContrasenia}
                      onChange={handleChangeRegister}
                      className={`bg-dark text-light border-light input-auth ${getClass(
                        erroresRegister.repContrasenia
                      )}`}
                    />

                    <span
                      className="icono-password"
                      onClick={() =>
                        setMostrarRepPasswordRegister(
                          !mostrarRepPasswordRegister
                        )
                      }
                    >
                      {mostrarRepPasswordRegister ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <Form.Text className="text-light opacity-75">
                    Debe coincidir exactamente con la contraseña anterior.
                  </Form.Text>

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