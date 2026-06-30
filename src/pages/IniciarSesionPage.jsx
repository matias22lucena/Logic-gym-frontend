  import { Container, Row } from "react-bootstrap";
import Formulario from "../components/formulario/Formulario";


  const Login = ({ setUsuarioLogueado }) => {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Formulario idPage="login" setUsuarioLogueado={setUsuarioLogueado} />
        </Row>
      </Container>
    );
  };

  export default Login;