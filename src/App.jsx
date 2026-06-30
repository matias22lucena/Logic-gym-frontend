import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import Footer from "./components/footer/Footer";
import Registro from "./pages/RegistroPages";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const sesionUsuario =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || false;
  const [usuarioLogueado, setUsuarioLogueado] = useState(sesionUsuario);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            {/*       <Route path="/" element={<Home/>}/>
      <Route path="/detalle" element={<DetalleDeProducto/>}/>
      <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado}/>}/>
     
      <Route path="/contacto" element={<Contacto/>}/>
      <Route path="/administrador" element={
        <ProtectorAdmin usuarioLogueado={usuarioLogueado}></ProtectorAdmin>}>
      <Route index element={<Administrador productos={productos} setProductos={setProductos}></Administrador>}/>
      <Route path="crear" element={<FormularioProducto titulo="Crear Producto"></FormularioProducto>}/>
      <Route path="editar/:id" element={<FormularioProducto titulo="Editar Producto"></FormularioProducto>}/>
      </Route>
      <Route path="*" element={<Error404></Error404>}/> */}
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
        <Footer path="footer"></Footer>
      </BrowserRouter>
    </>
  );
};

export default App;
