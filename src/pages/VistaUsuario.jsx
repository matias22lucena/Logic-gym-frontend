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
