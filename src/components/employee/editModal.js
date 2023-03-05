import { Button, Modal } from "react-bootstrap";
import React, { useState,useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnSendData from "../../forms/btnSendData";
import DropImage from "../../forms/componentForms/DropImage";
import InputData from "../../forms/InputData";
import SelectData from "../../forms/SelectData";
import Loader from "../../layouts/admin/loader/Loader";
import { getDepartment } from "../../redux/features/departmentSlice";
import { getMangers } from "../../redux/features/mangersSlice";
import { urls } from "../../urls";
import { error_state, post, put } from "../../helper";
import { getEmployees } from "../../redux/features/searchEmployeeSlice";

export default function EditModal({show,handleClose,handleSave,data}) {
  const dispatch = useDispatch()

  const mounted = useRef(false)

useEffect(() => {
  if(!mounted.current){
    dispatch(getMangers())
    dispatch(getDepartment())
        
    mounted.current = true
  }
 
}, [])


  const departments = useSelector(state=> state.departments.data)
  const mangers = useSelector(state=> state.mangers.data)
  const [loadSearch, setloadSearch] = useState(false)
  const loading = useSelector(state=> state.departments.loading && state.mangers.loading);
    const [Data, setData] = useState({
    "first_name":data.first_name,
    "id":data.id,
    "last_name":data.last_name,
    "email":data.email,
    "salary":data.salary,
    "department_id":data.department_id,
    "manger_id":data.manger_id,
    "password":data.password,
    "user_type":data.user_type,
    "manger":data.manger,
    "avatar":data.avatar,
  })
    const [RequiredData, setRequiredData] = useState({
      "first_name":"",
      "last_name":"",
      "email":"",
      "salary":"",
      "department_id":"",
      "manger_id":"",
      "password":"",
      "user_type":"",
      "manger":"",
      "avatar":""
})

const users_type = [
  {
    value:"employee",
    label:"Employee"
  },
  {
    value:"manger",
    label:"Manger"
  }
];


const sendData = (type, e, item = null) => {
    setData((prevState) => ({
    ...prevState,
    [type]: e.target.value
    }));
  
}

const sendDataObj = ()=>{
  setloadSearch(true)
  fetch_put_employee()
}

const fetch_put_employee = async () => {
  try {
    const res = await put(`${urls.edit_employee}/${Data.id}`,Data)
    if(res.statusMsg == "success"){
      setloadSearch(false)
      handleClose()
      handleSave()
    }else{
      error_state(setRequiredData,RequiredData,res.data)
      setloadSearch(false)

    }
    
  } catch (err) {
    
  }
};


return (
      <div className="mt-40">

        <Modal backdrop={"static"} show={show}  onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>{"Edit Employee"}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="h-md-80 h-60 overflow-y-scroll">
              {loading?<Loader />:   
               <div className="row">
                  <InputData  
                  placeholder={"First Name"} 
                  required={true} 
                  col_md={6} 
                  col={12}  
                  parent_class=" mb-2"
                  error={RequiredData}  
                  input_type="text"  
                  type={`first_name`} 
                  value={Data.first_name} 
                  onChange={sendData} />

                  <InputData  
                  placeholder={"Last Name"} 
                  required={true} 
                  col_md={6} 
                  col={12}  
                  parent_class=" mb-2"
                  error={RequiredData}  
                  input_type="text"  
                  type={`last_name`} 
                  value={Data.last_name} 
                  onChange={sendData} />

                  <InputData  
                  placeholder={"Email"} 
                  required={true} 
                  col_md={6} 
                  col={12}  
                  parent_class=" mb-2"
                  error={RequiredData}  
                  input_type="email"  
                  type={`email`} 
                  value={Data.email} 
                  onChange={sendData} />

                  <InputData  
                  placeholder={"Password"} 
                  required={true} 
                  col_md={6} 
                  col={12}  
                  parent_class=" mb-2"
                  error={RequiredData}  
                  input_type="password"  
                  type={`password`} 
                  value={Data.password} 
                  onChange={sendData} />

                  <InputData  
                  placeholder={"Salary"} 
                  required={true} 
                  col_md={6} 
                  col={12}  
                  parent_class=" mb-2"
                  error={RequiredData}  
                  input_type="number"  
                  type={`salary`} 
                  value={Data.salary} 
                  onChange={sendData} />


                    <SelectData
                    col_md={6} 
                    col={12} 
                    parent_class=" mb-2"
                    options={departments??[]} 
                    placeholder="Department"
                    value={Data.department_id} 
                    error={RequiredData}  
                    required={true}
                    onChange={sendData} 
                    type="department_id" />

                    <SelectData
                    col_md={6} 
                    col={12} 
                    parent_class=" mb-2"
                    options={mangers??[]} 
                    error={RequiredData}  
                    required={true}
                    placeholder="Manger"
                    value={Data.manger_id} 
                    onChange={sendData} 
                    type="manger_id" />

                    <SelectData
                    col_md={6} 
                    col={12} 
                    parent_class=" mb-2"
                    options={users_type} 
                    error={RequiredData}  
                    required={true}
                    placeholder="User Type"
                    value={Data.user_type} 
                    onChange={sendData} 
                    type="user_type" />

                    <DropImage imageData={Data.avatar} type={"avatar"} getImage={sendData} />
                    
              </div>}   
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row">
            <BtnSendData classes="mx-2" onclick={sendDataObj} loadSearch={loadSearch} name={"Save"} />

                  <Button variant="secondary" onClick={handleClose}>
                    {"Close"}
                  </Button>
            </div>


          </Modal.Footer>
        </Modal>
      </div>
    );
  }
