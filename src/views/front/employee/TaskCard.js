import { useState } from "react";
import BtnSendData from "../../../forms/btnSendData";
import SelectData from "../../../forms/SelectData";
import TextAreaData from "../../../forms/TextAreaData";
import { put } from "../../../helper";
import { urls_employee } from "../../../urls";

export default function TaskCard({item,refreshComponent}){

  const [switchStausCard, setswitchStausCard] = useState(false)
  const [switchDescCard, setswitchDescCard] = useState(false)
  const [loadSearch, setloadSearch] = useState(false)
  let { title, desc, status } = item

  const [Data, setData] = useState({
    title,
    desc,
    status 
  })
    const getStatus = () => {
      switch (status) {
        case 'in_progress':
          return {
            color:'bg-yellow-200 text-yellow-800',
            name:'in progress'
          } ;
        case 'done':
          return {
            color:'bg-indigo-600 text-white',
            name:'done'
          } ;
        case 'pending':
        default:
          return {
            color:'bg-gray-200 text-gray-800',
            name:'pending'
          } ;
      }
    };

    const status_types = [
   
      {
        value:"pending",
        label:"Pending"
      },
      {
        value:"in_progress",
        label:"In Progress"
      },
      {
        value:"done",
        label:"Done"
      }
    ]

    const sendData = (type, e, items = null) => {

      setData((prevState) => ({
      ...prevState,
      [type]: e.target.value
      }));
      let json = Data;
      json[type] = e.target.value;
      if(type != "desc"){
        fetch_update_task(item.id,json)

      }
  }

  const fetch_update_task = async (id,data) => {
    try {
      const res = await put(`${urls_employee.update_task_url}/${id}`,data)
      if(res.statusMsg == "success"){
        setloadSearch(false)
        refreshComponent()
      }else{
      }
      
    } catch (err) {
      
    }
  };
  
    return (
      <div  className="border rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-lg font-medium mb-2">{title}</h2>
            {!switchDescCard?<p  onDoubleClick={()=>setswitchDescCard(true)} 
             className="text-gray-700 mb-4 cursor-pointer">{desc}</p>:
             <div className="d-flex flex-column">
                    <TextAreaData
                    value={Data.desc}
                    type={'desc'}
                    onChange={sendData} 
                    placeholder={""}
                    number_rows={2}
                  />
                  <div className="w-50 my-2 d-flex flex-row-reverse">
                  
                  <BtnSendData  classes="my-2 width-fit" 
                  onclick={()=>{
                    setloadSearch(true)
                    fetch_update_task(item.id,Data)

                  }}
                  loadSearch={loadSearch} 
                  name={"Save"} />
                  </div>
                 

             </div>
            }

           {!switchStausCard?
            <div className={`inline-block rounded-full px-3 py-1 ${getStatus().color}`}>
                <span title="please enter double click for update" onDoubleClick={()=>setswitchStausCard(true)} 
                className="text-sm font-medium  cursor-pointer">
                  {getStatus().name}
                </span>
            </div>:
                <SelectData
                col_md={2} 
                clear={false}
                col={12} 
                options={status_types??[]} 
                value={Data.status} 
                onChange={sendData} 
                type="status" />}
        
        </div>
    );
  }