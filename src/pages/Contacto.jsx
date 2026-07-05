import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import "./Contacto.css"

const Contacto = () => {

  const form = useRef();

  const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
       

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

    <Container className="contacto-wrapper py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          
          <div className="text-center mb-5">
            <h1 className="contacto-titulo">Contactanos</h1>
            <p className="contacto-subtitulo">¿Tenés alguna duda sobre nuestros planes? Escribinos.</p>
          </div>

          <div className="contacto-caja p-4 p-md-5">
            <Form ref={form} onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-4" controlId="formNombre">
                <Form.Label className="contacto-label">Nombre completo</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ej: Juan Pérez" 
                  className="contacto-input"
                  {...register("user_name", {
                    required: "El nombre es un dato obligatorio",
                    
                  })} 
                />
                <Form.Text className="text-danger">
                    {errors.user_name?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label className="contacto-label">Correo electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="contacto-input" 
                  name="user_email"
                  {...register("user_email", {
                    required: "El email es un dato obligatorio",
                    pattern: {
                        value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message: "El email debe ser un correo valido por ej: juanperez@mail.com"
                    }
                  })} 
                />
                <Form.Text className="text-danger">
                    {errors.user_email?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMensaje">
                <Form.Label className="contacto-label">Tu mensaje</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  placeholder="¿En qué te podemos ayudar?" 
                  className="contacto-input"
                  {...register("message", {
                    required: "El mensaje es un dato obligatorio",
                    minLength: {
                        value: 20,
                        message: "El mensaje debe tener al menos 20 caracteres",
                    },
                    maxLength: {
                        value: 150,
                        message: "El mensaje debe tener como maximo 150 caracteres"
                    }
                  })} 
                />
                <Form.Text className="text-danger">
                    {errors.message?.message}
                </Form.Text>
              </Form.Group>

              <Button type="submit" value="send" className="contacto-btn w-100 mt-2">
                ENVIAR MENSAJE
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>

  )
}

export default Contacto