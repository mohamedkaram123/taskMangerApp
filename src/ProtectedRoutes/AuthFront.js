
import { Navigate, Outlet } from "react-router-dom";
import {isAuth, isAuthEmployee } from "../helper";
import { routes } from "../urls";

const AuthFront = () => {

     if (isAuthEmployee()) {
         return <Outlet />
     }else if(isAuth()){
        return <Navigate to={routes.perfix} />;
      } else {
         return <Navigate to="/taskManger/login" />
     }
};

export default AuthFront;