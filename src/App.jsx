import { BrowserRouter, Route, Routes } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from "react"
import BarraNavegacion from "./components/navbar/BarraNavegacion";
import ProtectorAdmin from "./components/routes/ProtectorAdmin"
import Registro from "./pages/RegistroPages";
import Login from "./pages/IniciarSesionPage";
import Footer from "./components/footer/Footer"
import HomePage from "./pages/HomePage";
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
    <BarraNavegacion></BarraNavegacion>

   <main>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      
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

      <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado}/>}/>
       <Route path="/registro" element={<Registro/>}/>
    </Routes>
   </main>
<Footer></Footer> 
   </BrowserRouter>
    </>
  );
};

export default App;
