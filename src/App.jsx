import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import BarraNavegacion from "./components/navbar/BarraNavegacion";
import Registro from "./pages/RegistroPages";
import Login from "./pages/IniciarSesionPage";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./components/carrito/carrito.jsx";
import SobreNosotros from "./pages/SobreNosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import HomePage from "./pages/HomePage";
import DetalleDePlan from "./components/detalleDePlan/DetalleDePlan.jsx";
import ProtectorAdmin from "./components/routes/ProtectorAdmin.jsx";
import PanelUsuarios from "./pages/PanelUsuarios.jsx";
import PanelAdministrador from "./pages/PanelAdministrador.jsx";
import PanelClases from "./pages/PanelClases.jsx";


const App = () => {
  const sesionUsuario =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || false;

  const [usuarioLogueado, setUsuarioLogueado] = useState(sesionUsuario);

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  return (
    <BrowserRouter>
      <CartProvider>
        <BarraNavegacion
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
        />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sobrenosotros" element={<SobreNosotros />} />
            <Route path="/detalle" element={<DetalleDePlan/> } />

            <Route
              path="/login"
              element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
            />

            <Route path="/registro" element={<Registro />} />

<Route
  path="/administrador"
  element={
    <ProtectorAdmin usuarioLogueado={usuarioLogueado}>
      <PanelAdministrador/>
    </ProtectorAdmin>
  }
/>

<Route
  path="/administrador/usuarios"
  element={
    <ProtectorAdmin usuarioLogueado={usuarioLogueado}>
      <PanelUsuarios/>
    </ProtectorAdmin>
  }
/> 
<Route
  path="/administrador/clases"
  element={
    <ProtectorAdmin usuarioLogueado={usuarioLogueado}>
      <PanelClases />
    </ProtectorAdmin>
  }
/>
          </Routes>
        </main>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;