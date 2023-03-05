import { Button, Modal } from "react-bootstrap";
import React, { useState,useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnSendData from "../../forms/btnSendData";
import InputData from "../../forms/InputData";
import Loader from "../../layouts/admin/loader/Loader";

import { urls } from "../../urls";
import { error_state, post } from "../../helper";
import { getdepartments } from "../../redux/features/searchDepartmentSlice";

export default function AddModal({show,handleClose,handleSave}) {
  const dispatch = useDispatch()

  const mounted = useRef(false)

useEffect(() => {
  if(!mounted.current){

    mounted.current = true
  }
 
}, [])

  const [loadSearch, setloadSearch] = useState(false)
  const loading = useSelector(state=> state.departments.loading && state.mangers.loading);
    const [Data, setData] = useState({
    "name":"",
  })
    const [RequiredData, setRequiredData] = useState({
      "name":"",
})



const sendData = (type, e, item = null) => {

    setData((prevState) => ({
    ...prevState,
    [type]: e.target.value
    }));
  
}

const sendDataObj = ()=>{
  setloadSearch(true)
  fetch_create_department()
}

const fetch_create_department = async () => {
  try {
    const res = await post(urls.create_department,Data)
    if(res.statusMsg == "success"){
      setloadSearch(false)
      dispatch(getdepartments())
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
            <Modal.Title>{"Add Department"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
         
               <div className="row">
                  <InputData  
                  placeholder={"Name"} 
                  required={true} 
                  col_md={12} 
                  col={12}  
                  parent_class=" mb-2"
                  error={RequiredData}  
                  input_type="text"  
                  type={`name`} 
                  value={Data.name} 
                  onChange={sendData} />
                    
              </div>
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
