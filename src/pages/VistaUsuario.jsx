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

  