import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Spinner } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaUser, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  obtenerClasesDisponibles,
  crearReservaMongo,
  cancelarReservaMongo
} from "../helpers/queriesReservas";
import "./VistaUsuario.css";

const VistaUsuario = ({ usuarioLogueado }) => {
  const navigate = useNavigate();

  const [esMovilOTablet, setEsMovilOTablet] = useState(window.innerWidth < 992);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 3;

  useEffect(() => {
    const handleResize = () => {
      setEsMovilOTablet(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [vistaActiva]);

  useEffect(() => {
    const inicializarVistaUsuario = async () => {
      try {
        
        const usuarioGuardado = usuarioLogueado || JSON.parse(sessionStorage.getItem("usuarioKey"));
        if (!usuarioGuardado) {
          
          setUser(null);
        } else {
          
          const usuarioAdaptado = {
            _id: usuarioGuardado._id || usuarioGuardado.id || "temp-user-id",
            nombre: usuarioGuardado.nombreUsuario || "Usuario",
            plan: usuarioGuardado.planContratado || "sin plan",
          };
          setUser(usuarioAdaptado);

          
          Swal.fire({
            title: `¡Hola, ${usuarioAdaptado.nombre}!`,
            text: "Bienvenido/a a tu panel de reservas.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            background: "#1e1e24",
            color: "#fff"
          });
        }

        await traerClases();
      } catch (error) {
        console.error("Error al inicializar:", error);
      } finally {
        setCargando(false);
      }
    };

    inicializarVistaUsuario();
  }, [usuarioLogueado]);

  const traerClases = async () => {
    try {
      const res = await obtenerClasesDisponibles();
      if (res.ok) {
        setClases(res.data);
      }
    } catch (error) {
      console.error("Error al traer clases:", error);
    }
  };

  const handleReservar = async (claseId, detalleClase) => {
    if (!user) {
      Swal.fire({
        title: "Iniciar sesión requerido",
        text: "Debes iniciar sesión para reservar una clase.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#0766ff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    // Se comenta esta restricción para que cualquier usuario registrado (incluso con "sin plan" por defecto) pueda reservar clases directamente sin la intervención del administrador.
    /*
    if (user.plan === "Ninguno" || user.plan === "sin plan") {
      Swal.fire("Acceso Denegado", "Necesitás un plan activo para reservar.", "warning");
      return;
    }
    */

    Swal.fire({
      title: "¿Reservar lugar?",
      text: `¿Te anotás en la clase de ${detalleClase}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reservar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#0766ff",
      cancelButtonColor: "#d33"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await crearReservaMongo(claseId, user._id);
          if (res.ok) {
            Swal.fire("¡Listo!", res.mensaje || "Tu turno fue reservado con éxito.", "success");
            traerClases(); // Recarga
          } else {
            Swal.fire("Error", res.mensaje || "No se pudo realizar la reserva.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "No se pudo procesar la reserva.", "error");
        }
      }
    });
  };


    const handleCancelar = async (claseId, detalleClase) => {
    if (!user) return;

    Swal.fire({
      title: "¿Cancelar Turno?",
      text: `¿Vas a darte de baja de ${detalleClase}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Volver",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await cancelarReservaMongo(claseId, user._id);
          if (res.ok) {
            Swal.fire("Cancelado", res.mensaje || "Liberaste tu cupo correctamente.", "success");
            traerClases();
          } else {
            Swal.fire("Error", res.mensaje || "No se pudo cancelar el turno.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "No se pudo cancelar el turno.", "error");
        }
      }
    });
  };

  if (cargando) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="info" />
      </Container>
    );
  }

  const misTurnos = clases.filter(clase => clase.alumnos?.includes(user?._id));

  const clasesAMostrar = esMovilOTablet
    ? clases.slice((paginaActual - 1) * itemsPorPagina, paginaActual * itemsPorPagina)
    : clases;

  const turnosAMostrar = esMovilOTablet
    ? misTurnos.slice((paginaActual - 1) * itemsPorPagina, paginaActual * itemsPorPagina)
    : misTurnos;

  const totalPaginas = Math.ceil(
    (vistaActiva === "clases" ? clases.length : misTurnos.length) / itemsPorPagina
  );

    return (
    <div className="cuerpo-reservas w-100 py-5">
      <Container className="text-light">
        
        <div className="mb-4">
          <h1 className="fw-bold">
            Hola, <span className="text-info">{user?.nombre || "Invitado"}</span> 
          </h1>
          <p className="text-muted">Gestioná tus entrenamientos y turnos disponibles.</p>
        </div>

        <Row>
          <Col xs={12}>
           
            <div className="d-flex gap-2 mb-4">
              <Button 
                variant={vistaActiva === "clases" ? "info" : "outline-light"} 
                onClick={() => setVistaActiva("clases")}
                className="fw-bold btn-sm px-3"
              >
                Clases Disponibles ({clases.length})
              </Button>
              <Button 
                variant={vistaActiva === "mis-turnos" ? "info" : "outline-light"} 
                onClick={() => setVistaActiva("mis-turnos")}
                className="fw-bold btn-sm px-3"
                disabled={!user}
                title={!user ? "Inicia sesión para ver tus turnos" : ""}
              >
                Mis Turnos ({misTurnos.length})
              </Button>
            </div>

            
            {vistaActiva === "clases" ? (
              <div className="d-flex flex-column gap-2">
                {clasesAMostrar.length === 0 ? (
                  <p className="text-muted py-3">No hay clases programadas por el administrador.</p>
                ) : (
                  clasesAMostrar.map((clase) => {
                    const yaReservado = clase.alumnos?.includes(user?._id);
                    const cuposDisponibles = clase.capacidad - (clase.alumnos?.length || 0);

                    return (
                      <div key={clase._id} className="clase-fila-compacta d-flex flex-wrap align-items-center justify-content-between p-3 rounded mb-2">
                        <div className="d-flex flex-column col-12 col-md-4 mb-2 mb-md-0">
                          <span className="fw-bold text-uppercase fs-5 text-info">{clase.detalle}</span>
                          <small className="text-muted"><FaUser className="me-1"/> Prof. {clase.profesor}</small>
                        </div>
                        
                        <div className="d-flex align-items-center gap-3 my-2 my-sm-0 col-12 col-md-5 justify-content-md-center">
                          <span className="small"><FaCalendarAlt className="text-muted me-1"/> {clase.fecha}</span>
                          <span className="small"><FaClock className="text-muted me-1"/> {clase.hora} hs</span>
                          <Badge bg={cuposDisponibles > 0 ? "dark" : "danger"} className="border border-secondary">
                            {cuposDisponibles} / {clase.capacidad} Libres
                          </Badge>
                        </div>

                        <div className="col-12 col-md-3 text-md-end mt-2 mt-md-0">
                          {yaReservado ? (
                            <Button variant="outline-danger" size="sm" className="fw-bold w-100 w-md-auto" onClick={() => handleCancelar(clase._id, clase.detalle)}>
                              CANCELAR
                            </Button>
                          ) : (
                            <Button 
                              variant="info" 
                              size="sm" 
                              className="fw-bold text-dark w-100 w-md-auto" 
                              disabled={cuposDisponibles <= 0}
                              onClick={() => handleReservar(clase._id, clase.detalle)}
                            >
                              {cuposDisponibles <= 0 ? "SIN CUPOS" : "RESERVAR"}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              
              <div className="d-flex flex-column gap-2">
                {turnosAMostrar.length === 0 ? (
                  <p className="text-muted py-3">No tenés reservas confirmadas todavía.</p>
                ) : (
                  turnosAMostrar.map(turno => (
                    <div key={turno._id} className="clase-fila-compacta d-flex align-items-center justify-content-between p-3 rounded border-start border-success border-3 mb-2">
                      <div>
                        <span className="fw-bold text-uppercase d-block">{turno.detalle}</span>
                        <span className="small text-muted">{turno.fecha} a las {turno.hora} hs</span>
                      </div>
                      <Button variant="link" className="text-danger p-0" onClick={() => handleCancelar(turno._id, turno.detalle)}>
                        <FaTrashAlt />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            )}

            {esMovilOTablet && totalPaginas > 1 && (
              <div className="d-flex justify-content-center gap-2 mt-4 paginacion-contenedor">
                <Button
                  variant="outline-light"
                  disabled={paginaActual === 1}
                  onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                  className="fw-bold btn-sm px-3"
                >
                  Anterior
                </Button>
                <span className="align-self-center mx-2 small fw-bold">
                  Página {paginaActual} de {totalPaginas}
                </span>
                <Button
                  variant="outline-light"
                  disabled={paginaActual === totalPaginas}
                  onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                  className="fw-bold btn-sm px-3"
                >
                  Siguiente
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VistaUsuario;
