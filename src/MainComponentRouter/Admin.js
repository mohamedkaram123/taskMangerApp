import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorConnection from "../HelperComponents/ErrorConnection.jsx";
import AuthAdmin from "../ProtectedRoutes/AuthAdmin.js";
import { routes } from "../urls.js";

const FullLayout = lazy(() => import("../layouts/admin/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/admin/Starter.js"));
const Employee = lazy(() => import("../views/admin/Employee.js"));
const Department = lazy(() => import("../views/admin/Department.js"));
const Task = lazy(() => import("../views/admin/Task.js"));
const Login = lazy(() => import("../views/admin/Login.js"));

const Admin = () => {

  return   (
        <Routes>
            <Route  element={<AuthAdmin />}>
              <Route exact path="/admin" element={<FullLayout />}>
                  <Route  path={routes.home_route}  element={<Starter />} />
                  <Route  path={routes.empolyee_route}  element={<Employee />} />
                  <Route  path={routes.task_route}  element={<Task />} />
                  <Route  path={routes.department_route}  element={<Department />} />
                  <Route  path={routes.error_route}  element={<ErrorConnection />} />

              </Route>

            </Route>
            <Route  path="/admin/login"  element={<Login />} />

      </Routes>
  )
};

export default Admin;
