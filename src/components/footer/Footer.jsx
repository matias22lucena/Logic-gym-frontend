import React from "react";
import logoLogicGym from "../assets/logoLogicGym.png";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-3 col-md-6">
            <div className="d-flex justify-content-center">
              <img
                src={logoLogicGym}
                alt="Logo Logic Gym"
                className="footerLogo"
              />
            </div>
            <p className="descripcionFooter mt-3 text-center">
              Donde el entrenamiento fisico y la programacion se unen para
              desarrollar la mejor version de vos mismo
            </p>

            <div className="redesSociales d-flex justify-content-center">
              <a
                href="https://web.whatsapp.com/"
                className="wsp"
                target="_blank"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/?hl=es"
                className="instagram"
                target="_blank"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/?locale=es_LA"
                className="facebook"
                target="_blank"
              >
                <FaFacebook />
              </a>
              <a href="https://x.com/?lang=es" className="x" target="_blank">
                <FaXTwitter />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 text-start">
            <h4 className="titulo">Contactos</h4>
            <a
              href="https://wa.me/543815743795"
              target="_blank"
              className="contacto"
            >
              Milagros: 1234567891
            </a>
            <a
              href="https://wa.me/543813156301"
              target="_blank"
              className="contacto"
            >
              Matias: 1234567891
            </a>
            <a
              href="https://wa.me/543875269167"
              target="_blank"
              className="contacto"
            >
              Mariano: 1234567891
            </a>
            <a
              href="https://wa.me/543816042407"
              target="_blank"
              className="contacto"
            >
              Diego: 1234567891
            </a>
          </div>

          <div className="col-lg-2 col-md-6">
            <h4 className="titulo">Nuestra Historia</h4>
            <p className="descripcionFooter text-center">
              Logic Gym nace con la idea de combinar disciplina física y mental.
              Creemos que el cuerpo y la lógica se entrenan todos los días,
              dentro y fuera del gimnasio
            </p>
          </div>

          <div className="col-lg-2 col-md-6 text-center">
            <h4 className="titulo">Explorar</h4>
            <div className="linksNavegacion">
              <a href="">Planes</a>
              <a href="">Sedes</a>
              <a href="">Información</a>
              <a href="">Inicio</a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4 className="titulo">Ubicación</h4>
            <iframe
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1060679495154!2d-65.20974192576678!3d-26.836578490024703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1782311797592!5m2!1ses-419!2sar"
              }
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Ubicación de Logic Gym "
            ></iframe>
          </div>
        </div>

        <div className="botonCopy">
          <p>
            &copy; {new Date().getFullYear()} Logic Gym - Todos los derechos
            reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
