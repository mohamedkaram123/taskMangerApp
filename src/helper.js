import { decryptLocalStorage,decryptCookieStorage } from './hash';

//import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import swal from "sweetalert";

export const Urls = {
    "api": process.env.REACT_APP_API_URL,
    "public": process.env.REACT_APP_ASSEST_URL,
    "file": process.env.REACT_APP_API_URL,
}


export const name = () => {
    return "Accounting";
}

export const phone = () => {
    return "+20010604554";
}

export const user = () => {
    return decryptCookieStorage("user")
}

export const user_employee = () => {
    return decryptCookieStorage("user_employee")
}

export const company_type = () => {
    return user().company.company_type;
}

export const isAuth = () => {
    return !!user() ? true : false
}

export const isAuthEmployee = () => {
    return !!user_employee() ? true : false
}

export const checkAdmin = () => {
    if (!!user()) {
        if (user().type === "admin" || user().type === "employee") {
            return true
        }
        return false
    }
    return false
}




export const setData = (type, e, setStateData) => {

    setStateData((prevState) => ({
        ...prevState,
        [type]: e.target.value
    }));

}


export function error_state(setrequireState,requireState,error_data) {

for (const [key, value] of Object.entries(requireState)) {

    setrequireState((prevState) => ({
        ...prevState,
        [key]: (key in error_data) ? error_data[key][0] : ""
    }));
   // setbtnSave(false);
}
}


export const delete_data = (confirmed=()=>{})=>{
    Swal.fire({
      title: '? make sure you want delete',
      icon: 'warning',
      iconHtml: '!',
      confirmButtonText: 'delete',
      cancelButtonText: 'cancel',
      showCancelButton: true,
      customClass: {
     
        confirmButton: 'btn btn-danger',
      
      },
      showCloseButton: true
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        confirmed()
      }
      });
    
      
  }
// export function make_toast_success(title){
//     toast(title, {
//         style: {backgroundColor:"rgb(168 85 247 / var(--tw-bg-opacity))",color:"#fff"},
//         progressStyle:{backgroundColor:"#fff"},
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         });
// }

// export function make_toast_error(title){
//     toast.error(title, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         });
// }



export function swalSuccess(title) {
    // const destroy_url = Urls.url + `products/destroy/${id}`;
 swal({
 title,

 icon: "success",
 dangerMode: false,
 buttons: false,
 timer: 2000,

 });
 }


 export function swalError(title) {
    // const destroy_url = Urls.url + `products/destroy/${id}`;
 swal({
 title,

 icon: "error",
 dangerMode: true,
 buttons: false,
 timer: 2000,

 });
 }

 export function setCookie(cname, cvalue, exdays=365) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  

 export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

export  function deleteAllCookies() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

}

export const updateObjInArrayStateByKey = (setDatas,datas,value,key,prop)=>{
   let data_model =  datas.map((item,i) =>
            i === key
            ? {...item, [prop] : value}
            : item
        )
    setDatas(data_model)
    return data_model;
}

export const updateObjInArrayState = (setDatas,datas,value,prop)=>{
    setDatas(
        datas.map(item =>
            item.prop === value
            ? {...item, [prop] : value}
            : item
    ))
}

export const updateObjInArrayState2 = (setDatas,datas,value,prop,id)=>{
    setDatas(
        datas.map(item =>
            item.id === id
            ? {...item, [prop] : value}
            : item
    ))
}
export const updateObjInArrayStateObj = (setDatas,datas,obj)=>{
    setDatas(
        datas.map(item =>
            item.id === obj.id
            ? obj
            : item
    ))
}
export const insertObjInArrayState = (setDatas,datas,obj)=>{
    let data_model = [...datas, obj];
    setDatas(data_model);
    return data_model;

}
export const removeObjInArrayState = (setDatas,datas,obj_removed,prop="id")=>{
    var data = datas.filter(item => item[prop]  !== obj_removed[prop]);
    setDatas(data);
    return data
  }

  export const removeObjInArrayStateByKey = (setDatas,datas,key)=>{
    var data = datas.filter((item,i) => i !== key);
    setDatas(data);
    return data
  }


  export const removeObjInArrayByKey = (datas,key)=>{
    var data = datas.filter((item,i) => i !== key);
    datas = data
    return data
  }

export const inArrayObj = (array,value,prop="id")=>{
   return array.find( item => item[prop] == value );
}

export function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }

  export const insertObjInArray = (datas,obj)=>{
    datas = [...datas, obj]
    return datas;
}

export const removeObjInArray = (datas,obj_removed,prop="id")=>{
    const objWithIdIndex = datas.findIndex((obj) => obj[prop] == obj_removed[prop]);
    datas.splice(objWithIdIndex, 1);
    return datas
  }



export const updateObjInArray = (datas,obj,prop,value)=>{
  
    datas =   datas.map(item =>
            item.id === obj.id
            ? {...item, [prop] : value}
            : item
    )
    return datas;
}

const headers = ()=>{
    let header = {
        'Content-Type':'application/json',
        'Accept':'application/json',
            };
    if(isAuth()){
        let token = user().token;
        header = {...header,...{'Authorization':`Bearer ${token}`}}
    }else if(isAuthEmployee()){
        let token = user_employee().token;
        header = {...header,...{'Authorization':`Bearer ${token}`}}
    }
    return header;
}

export const post = async(path,data)=>{
    const response = await fetch(path,{
        body:JSON.stringify(data),
        headers: headers(),
        method:"POST",
      });

      return response.json();
}
export const put = async(path,data)=>{
    const response = await fetch(path,{
        body:JSON.stringify(data),
        headers: headers(),
        method:"PUT",
      });

      return response.json();
}

export const delete_fetch= async(path)=>{
    const response = await fetch(path,{
        headers: headers(),
        method:"DELETE",
      });

      return response.json();
}

export const get = async(path)=>{
    console.log({headers: headers()});
    const response = await fetch(path,{
        headers: headers(),
        method:"GET",
      });
      return response.json();

}