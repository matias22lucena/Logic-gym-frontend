import { Container, Row } from "react-bootstrap";
import Formulario from "../components/formulario/Formulario.jsx";

const Registro = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Formulario idPage="registro" />
      </Row>
    </Container>
  );
};

export default Registro;