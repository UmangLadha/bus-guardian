import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes(){
        const isAuth = false;
        return isAuth ? <Outlet/ > : < Navigate to="/auth" />
}

export default PrivateRoutes;