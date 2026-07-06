import { Navigate } from "react-router-dom";

const ProtectorAdmin = ({ usuarioLogueado, children }) => {
  if (!usuarioLogueado) {
    return <Navigate to="/login" />;
  }

  if (usuarioLogueado.rolUsuario !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectorAdmin;