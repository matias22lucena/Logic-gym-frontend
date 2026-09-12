import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import "./DetalleDePlan.css"
import BannerInfinito from "../bannerInfinito/BannerInfinito";

const DetalleDePlan = () => {
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
    <>
    <Container className="DetalleDePlan-wrapper py-5">
        <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
            <div className="text-center mb-5">
                <h1>Contanos un poco sobre vos!</h1>
                <p>Rellena este formulario para mas informacion y ponerte en contacto con nosotros.</p>
            </div>
            <Form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4" controlId="formNombre">
                    <Form.Label className="DetallePlan-label">Nombre completo:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ej Juan Perez"
                        className="DetallePlan-input"
                        {...register ("user_name", {
                            required: "El nombre es un dato obligatorio",
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.user_name?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label className="DetallePlan-label">Email:</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="juaperez@mail.com"
                    className="DetallePlan-input"
                    {...register ("user_email", {
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

                <Form.Group className="mb-4 " controlId="formTelefono">
                    <Form.Label className="DetallePlan-label">Teléfono:</Form.Label>
                    <Form.Control
                    type="tel"
                    placeholder="Ej: 3811234567"
                    className="DetallePlan-input"
                    {...register("user_phone", {
                        required: "El teléfono es un dato obligatorio",
                        pattern: {
                        value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                        message: "El teléfono debe contener entre 10 y 14 números (sin espacios ni guiones)"
                       }
                    })}
                    />
                   <Form.Text className="text-danger fw-bold">
                      {errors.user_phone?.message}
                   </Form.Text>
                   
                </Form.Group>

                <Form.Group className="mb-4" controlId="formLesion">
                  <Form.Label className="detallePlan-lesion">¿Tenes alguna lesion?</Form.Label>
                  <Form.Select
                    {...register ("user_lesion", { 
                      required: "Este es un campo obligatorio",
                      })}>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </Form.Select>
                  <Form.Text className="text-danger">
                    {errors.user_lesion?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formClase">
                  <Form.Label className="detallePlan-clase">¿Estas interesado en alguna clase?</Form.Label>
                  <Form.Select
                    {...register ("user_clase", { 
                      required: "Este es un campo obligatorio",
                      })}>
                    <option value="Ninguna">Ninguna</option>
                    <option value="Crossfit">Crossfit</option>
                    <option value="Boxeo">Boxeo</option>
                    <option value="Spinning">Funcional</option>
                    <option value="Yoga">Yoga</option>
                  </Form.Select>
                  <Form.Text className="text-danger">
                    {errors.user_clase?.message}
                  </Form.Text>
                </Form.Group>


                <Button type="submit" className="DetallePlan-btn w-100 mt-2">
                   ENVIAR FORMULARIO
                </Button>
                
            </Form>
            </Col>
        </Row>
        
    </Container>
        <BannerInfinito className="my-4"></BannerInfinito> 
    </>
  )
}

export default DetalleDePlan
