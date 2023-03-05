import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import BtnSendData from "../../../forms/btnSendData";
import InputData from "../../../forms/InputData";

import { error_state, post } from "../../../helper";
import { urls_employee } from "../../../urls"; 
import TextAreaData from "../../../forms/TextAreaData";

export default function AddModal({show,handleClose,handleSave,id}) {


  const [loadSearch, setloadSearch] = useState(false)
    const [Data, setData] = useState({
    "title":"",
    "desc":"",
    "employee_id":id,
  })
    const [RequiredData, setRequiredData] = useState({
      "title":"",
      "desc":"",
      "employee_id":"",
})



const sendData = (type, e, item = null) => {

    setData((prevState) => ({
    ...prevState,
    [type]: e.target.value
    }));
  
}

const sendDataObj = ()=>{
  setloadSearch(true)
  fetch_add_task()
}

const fetch_add_task = async () => {
  try {
    const res = await post(urls_employee.add_task,Data)
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

        <Modal  show={show}  onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>{"Add Task Employee"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
             
               <div className="row">
                  <InputData  
                  placeholder={"Title"} 
                  required={true} 
                  col_md={12} 
                  col={12}  
                  parent_class=" mb-2"
                  error={RequiredData}  
                  input_type="text"  
                  type={`title`} 
                  value={Data.title} 
                  onChange={sendData} />

                  <TextAreaData
                  value={Data.desc}
                  type={'desc'}
                  error={RequiredData}  
                  placeholder={"Description"} 
                  required={true} 
                  col_md={12} 
                  col={12} 
                  onChange={sendData} 
                  number_rows={3}
                />
                    
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
