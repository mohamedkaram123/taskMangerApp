
export const urls = {
    login_url:process.env.REACT_APP_API_URL + "admin/login",
    logout_url:process.env.REACT_APP_API_URL + "admin/logout",
    search_employee:process.env.REACT_APP_API_URL + "admin/employee/search",
    get_mangerOptions:process.env.REACT_APP_API_URL + "admin/employee/mangersOption",
    employeesOptions:process.env.REACT_APP_API_URL + "admin/employee/employeesOption",

    get_departmentOptions:process.env.REACT_APP_API_URL + "admin/department/departmentsOption",
    create_employee:process.env.REACT_APP_API_URL + "admin/employee/create",
    edit_employee:process.env.REACT_APP_API_URL + "admin/employee/update",
    delete_employee:process.env.REACT_APP_API_URL + "admin/employee/delete",

    create_department:process.env.REACT_APP_API_URL + "admin/department/create",
    edit_department:process.env.REACT_APP_API_URL + "admin/department/update",
    delete_department:process.env.REACT_APP_API_URL + "admin/department/delete",
    search_department:process.env.REACT_APP_API_URL + "admin/department/search",
    search_task:process.env.REACT_APP_API_URL + "admin/task/search",


}

export const routes = {
   home_route:"/admin/",
   login_route:"/admin/login",

   empolyee_route:"/admin/employee",
   department_route:"/admin/department",
   task_route:"/admin/task",
   error_route:"/admin/*",
   perfix:"/admin"

}



export const urls_employee = {
    login_url:process.env.REACT_APP_API_URL + "employee/login",
    logout_url:process.env.REACT_APP_API_URL + "employee/logout",
    tasks_url:process.env.REACT_APP_API_URL + "employee/tasks",
    update_task_url:process.env.REACT_APP_API_URL + "employee/task/update",
    search_employeeManger:process.env.REACT_APP_API_URL + "employee/manger_employees",
    add_task:process.env.REACT_APP_API_URL + "employee/task/create",
}

export const routes_employee = {
    home_route:"/taskManger/home",
    login_route:"/taskManger/login",
    error_route:"/taskManger/*",
    perfix:"/taskManger"

 
 }