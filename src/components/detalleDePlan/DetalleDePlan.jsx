import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const DetalleDePlan = () => {
    const form = useRef();

  const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
        console.log("Datos que van a EmailJS:", data)

    emailjs.send(
      'service_jrhz7v4', 
      'template_mmydrwv', 
      data,
      {
        publicKey: 'mlY5x0EOdTdAIw-JR',
      }
    )
    .then(
      () => {
        Swal.fire({
          title: "Mensaje enviado",
          icon: "success",
          confirmButtonColor: "#0466c8",
          background: "#1a1a1a",
          color: "#ffffff"
        });
        reset();
      },
      (error) => {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar el mensaje",
          icon: "error"
        });
        console.log('FAILED...', error.text);
      }
    );
    };

  return (
    <div>
      
    </div>
  )
}

export default DetalleDePlan
