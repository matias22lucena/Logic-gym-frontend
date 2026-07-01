import React from "react";
import bannerLogicGym from "../assets/bannerLogicGym.png";
import bicicletasLogicGym from "../assets/bicicletasLogicGym.png";
import milagrosCoach from "../assets/milagrosCoach.png";
import matiasCoach from "../assets/matias.png";
import marianoCoach from "../assets/marianoCoach.png";
import diegoCoach from "../assets/diegoCoach.jpeg";

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
      rol: "Entrenador Personal",
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
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${bannerLogicGym})`,
        }}
      >
        <div>
          <p>Conocé al equipo detrás de tu lugar de entrenamiento favorito</p>
        </div>
      </div>

      <div>
        <div>
          <div>
            <h2>Nuestra historia y misión</h2>
            <p>
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
          <div>
            <img src={bicicletasLogicGym} alt="Bicicletas del gimnasio" />
          </div>
        </div>

        <hr className="container my-5" />

        <div>
          <div>
            <h2>El staff detras de la fuerza</h2>
            <p>
              Conocé a los profesionales que te van a acompañar en cada paso
            </p>
          </div>
          <div>
            {equipo.map((integrantes) => (
              <div key={integrantes.id}>
                <div>
                  <img
                    src={integrantes.imagen}
                    className="card-img-top object-fit-cover"
                    alt={integrantes.nombre}
                  />
                  <div>
                    <h5>{integrantes.nombre}</h5>
                    <small>{integrantes.rol}</small>
                    <p>{integrantes.descripcion}</p>
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
