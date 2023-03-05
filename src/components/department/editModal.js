import { Button, Modal } from "react-bootstrap";
import React, { useState,useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnSendData from "../../forms/btnSendData";
import InputData from "../../forms/InputData";
import Loader from "../../layouts/admin/loader/Loader";
import { urls } from "../../urls";
import { error_state, post, put } from "../../helper";
import { getdepartments } from "../../redux/features/searchDepartmentSlice";

export default function EditModal({show,handleClose,handleSave,data}) {
  const dispatch = useDispatch()

  const mounted = useRef(false)

useEffect(() => {
  if(!mounted.current){

    mounted.current = true
  }
 
}, [])

  const [loadSearch, setloadSearch] = useState(false)
    const [Data, setData] = useState({
    "name":data.name,
    "id":data.id
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
  fetch_edit_department()
}

const fetch_edit_department = async () => {
  try {
    const res = await put(`${urls.edit_department}/${Data.id}`,Data)
    if(res.statusMsg == "success"){
      setloadSearch(false)
      dispatch(getdepartments())
      handleClose()

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
            <Modal.Title>{"Edit Department"}</Modal.Title>
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
            <BtnSendData classes="mx-2 w-100" onclick={sendDataObj} loadSearch={loadSearch} name={"Save"} />

                  <Button variant="secondary" onClick={handleClose}>
                    {"Close"}
                  </Button>
            </div>


          </Modal.Footer>
        </Modal>
      </div>
    );
  }
