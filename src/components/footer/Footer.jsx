import React from "react";
import logoLogicGym from "../assets/logoLogicGym.png";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <div>
            <div>
              <img
                src={logoLogicGym}
                alt="Logo Logic Gym"
                className="footerLogo"
              />
            </div>
            <p>
              Donde el entrenamiento fisico y la programacion se unen para
              desarrollar la mejor version de vos mismo
            </p>

            <div>
              <a href="">
                {" "}
                <FaWhatsapp />
              </a>
              <a href="">
                <FaInstagram />
              </a>
              <a href="">
                <FaFacebook />
              </a>
              <a href="">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
