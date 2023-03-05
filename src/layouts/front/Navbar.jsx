import React,{useState,useRef,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get,post,deleteAllCookies,isAuth, isAuthEmployee, user_employee }  from '../../helper'
import { routes_employee, urls_employee } from '../../urls';
import Logo from '../front/Logo';


export default function Navbar() {
            const navigate = useNavigate();

            const logout = async () => {
              try {
                const res = await get(urls_employee.logout_url)
                if(res.statusMsg == "success"){
                  deleteAllCookies()
                  navigate(routes_employee.login_route)
                }
                
              } catch (err) {
                
              }
            };
            
  return (
      
    <div className="bg-white header-2">

    <nav style={{ borderBottom:"1px solid #eee" }} className="bg-gray py-2 md:py-4">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
          <a href="#" className="font-bold no-underline text-xl mr-4 text-indigo-600">Task Manger</a>
          
        </div>
  
        <div className="hidden md:flex flex-col md:flex-row mt-3 md:mt-0 d-flex flex-row justify-content-between md:w-4/5"  id="navbar-collapse">
          <Link to={"#"} className="p-2 no-underline lg:px-4 md:mx-2 text-white rounded bg-indigo-600">{"Home"}</Link>

          {isAuthEmployee()?<a href="#" onClick={logout} className="p-2 no-underline lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">Logout</a>:
           <>
           <a href="#" className="p-2 no-underline lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">Login</a>
           <a href="#" className="p-2 no-underline lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">Signup</a>
           </>
          }
         
        </div>
      </div>
    </nav>
  
 
  
  </div>

  )
}
