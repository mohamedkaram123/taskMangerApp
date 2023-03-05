import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BtnSendData from '../../forms/btnSendData';
import InputData from '../../forms/InputData';
import { encryptCookieStorage } from '../../hash';
import { error_state, isAuth, isAuthEmployee, post } from '../../helper';
import Urls, { routes, routes_employee, urls, urls_employee } from '../../urls';

export default function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    if(isAuthEmployee()){
      navigate(routes_employee.home_route)
    }
  }, []);

  const [loadSearch, setloadSearch] = useState(false)
  const [loading, setLoadung] = useState(false);

  const [loginInput, setloginInput] = useState({
    "email": "",
    "password": "",
  });

       const [loginInputValid, setloginInputValid] = useState({
    "email": "",
    "password": "",
      });

      const setDatas = ( type, e, item = null) => {

        setloginInput((prevState) => ({
            ...prevState,
            [type]: e.target.value
        }));
      
      }
    
      const sendData = ()=>{
        setloadSearch(true)
        fetch_login()
      }

      const fetch_login = async () => {
        try {
          const res = await post(urls_employee.login_url,loginInput)
          if(res.statusMsg == "success"){
            encryptCookieStorage(res.data,"user_employee")
            navigate(routes_employee.home_route);
            setloadSearch(false)
          }else{
            error_state(setloginInputValid,loginInputValid,res.data)
            setloadSearch(false)
          }
          
        } catch (err) {
          
        }
      };
      
    

  return (
    <section className="h-screen">
    
    <div className="px-6 h-full text-gray-800">
      <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src={ process.env.REACT_APP_ASSEST_URL + "img/Task-cuate.png"}
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                  <div className="mb-10 text-center">
                    <h1  className="font-bold text-3xl text-indigo-600" style={{ fontWeight:800 }}>Task Manger</h1>
                  </div>
          
                    <div className="mb-6">
                      
                        <InputData  placeholder={"Email"}
                          required={true}
                          col_md={12}
                          col={12}
                          error={loginInputValid}
                          input_type="text"  
                          type={`email`} 
                          value={loginInput.email} 
                          onChange={setDatas} />

                    </div>
          
                    <div className="mb-6">
                      <InputData  
                          placeholder={"Password"} 
                          required={true} 
                          col_md={12} 
                          col={12}  
                          error={loginInputValid}  
                          input_type="password"  
                          type={`password`} 
                          value={loginInput.password} 
                          onChange={setDatas} />

                    </div>
          
                    <div  className="d-flex flex-column slign-items-center mb-4 lg:text-left">
                          <BtnSendData classes="my-4  
                          d-flex flex-row
                          justify-content-center
                          inline-block mr-5 px-6 py-2 border-1 border-indigo-600 
                          text-indigo-600 font-medium text-xs leading-tight 
                          uppercase  hover:bg-black hover:bg-opacity-5 focus:outline-none 
                          focus:ring-0 transition duration-150 ease-in-out "
                            onclick={sendData} loadSearch={loadSearch} name={"Login"} />
            
                    </div>
              </form> 
        </div>
      </div>
    </div>
  </section>
   
  )
}
