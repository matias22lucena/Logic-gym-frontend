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
          </Routes>
        </main>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;