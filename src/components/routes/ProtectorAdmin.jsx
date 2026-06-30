import { Navigate, Outlet } from "react-router"


const ProtectorAdmin = ({usuarioLogueado}) => {
 
    if(!usuarioLogueado){
        return <Navigate to={"/login"}/>
    }
    return <Outlet></Outlet>
}
export default ProtectorAdmin
