import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorConnection from "../HelperComponents/ErrorConnection";
import AuthFront from "../ProtectedRoutes/AuthFront";
import { routes_employee } from "../urls";
import Home from "../views/front/Home";
import Login from "../views/front/Login";


const FullLayout = lazy(() => import("../layouts/front/FullLayout.jsx"));

const App = () => {
  return   (

    
    <Routes>
    <Route path="/" element={<Navigate to="/taskManger" replace />} />
        <Route  element={<AuthFront />}>
            <Route   path="/taskManger/" element={<FullLayout />}>
            <Route  path="/taskManger/"  element={<Home />} />
            <Route  path="/taskManger/home"  element={<Home />} />

            <Route  path={routes_employee.error_route}  element={<ErrorConnection />} />             
          </Route>

        </Route>
        <Route  path="/taskManger/login"  element={<Login />} />

  </Routes>
)
  }

export default App;
