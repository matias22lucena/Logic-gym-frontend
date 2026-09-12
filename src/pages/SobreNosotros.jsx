import React from "react";
import bannerLogicGym from "../assets/bannerLogicGym.png";
import bicicletasLogicGym from "../assets/bicicletasLogicGym.png";
import milagrosCoach from "../assets/milagrosCoach.png";
import matiasCoach from "../assets/matias.png";
import marianoCoach from "../assets/marianoCoach.png";
import diegoCoach from "../assets/diegoCoach.jpeg";
import "./SobreNosotros.css";

const SobreNosotros = () => {
  const equipo = [
    {
      id: 1,
      nombre: "Milagros Acuña",
      rol: "Fundadora / Coach Fit",
      descripcion:
        "Apasionada por el entrenamiento funcional y transformar vidas",
      imagen: milagrosCoach,
    },
    {
      id: 2,
      nombre: "Matias Lucena",
      rol: "Co-fundador / Nutricionista",
      descripcion: "Especialista en nutrición deportiva para alto rendimiento",
      imagen: matiasCoach,
    },
    {
      id: 3,
      nombre: "Mariano Juarez",
      rol: "Personal Trainer",
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
  return (
    <div className="sobreNosotrosCuerpo">
      <div
        className="bannerLogicGym text-center py-5 d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${bannerLogicGym})`,
        }}
      >
        <div className="container py-4">
          <p className="fs-4 text-light-50 pt-5">
            Conocé al equipo detrás de tu lugar de entrenamiento favorito
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Nuestra historia y misión</h2>
            <p className="text-justify">
              Nacimos con la idea de romper el molde de los gimnasios
              tradicionales. Queremos ofrecer un espacio donde cada persona, sin
              importar su nivel de condición física, encuentre la motivación y
              el apoyo necesario para alcanzar su mejor versión
            </p>
            <p>
              Nos enfocamos en un entrenamiento integral, combinando salud,
              disciplina y un ambiente donde dar el 100% sea divertido
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={bicicletasLogicGym}
              alt="Bicicletas del gimnasio"
              className="img-fluid rounded shadow p-3"
            />
          </div>
        </div>

        <hr className="container my-5" />

        <div className="container pb-5">
          <div className="text-center mb-5">
            <h2 className="titulo">El staff detras de la fuerza</h2>
            <p className="titulo">
              Conocé a los profesionales que te van a acompañar en cada paso
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {equipo.map((integrantes) => (
              <div
                key={integrantes.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="card">
                  <img
                    src={integrantes.imagen}
                    className="cardImg"
                    alt={integrantes.nombre}
                    style={{ height: "500px" }}
                  />
                  <div className="cardBody">
                    <h5 className="cardTitle">{integrantes.nombre}</h5>
                    <small className="fw-bold text-uppercase cardRol">
                      {integrantes.rol}
                    </small>
                    <p className="cardDescripcion">{integrantes.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
