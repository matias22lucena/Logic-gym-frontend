import React from "react";
import milagrosCoach from "../assets/milagrosCoach.png";
import matiasCoach from "../assets/matias.png";
import marianoCoach from "../assets/marianoCoach.png";
import diegoCoach from "../assets/diegoCoach.jpeg";

const SobreNosotros = () => {
  const equipo = [
    {
      id: 1,
      nombre: "Fundadora Acuña",
      rol: "Fundadora / Coach Fit",
      descripcion:
        "Apasionada por el entrenamiento funcional y transformar vidas",
      imagen: milagrosCoach,
    },
    {
      id: 2,
      nombre: "Matias Lucena",
      nombre: "Co-fundador / Nutricionista",
      descripcion: "Especialista en nutrición deportiva para alto rendimiento",
      imagen: matiasCoach,
    },
    {
      id: 3,
      nombre: "Entrenador Personal",
      descripcion: "Especialista en nutrición deportiva para el rendimiento",
      imagen: marianoCoach,
    },
    {
      id: 4,
      nombre: "Diego Giménez",
      rol: "Personal Trainer",
      descripcion: "Encargado de la motivación y la gestion diaria del gym",
      imagen: diegoCoach,
    },
  ];
  return <div>SobreNosotros</div>;
};

export default SobreNosotros;
