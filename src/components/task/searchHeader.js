import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import InputData from '../../forms/InputData';
import SelectData from '../../forms/SelectData';
import { getTask } from '../../redux/features/searchTaskSlice';

export default function SearchHeader({mangers,employees,setisLoadingBottom}) {
  const dispatch = useDispatch()

    const [data, setdata] = useState({
        title:"",
        status:"",
        employee_id:"",
        manger_id:"",
    })
    const [validateData, setvalidateData] = useState({
      title:"",
      status:"",
      employee_id:"",
      manger_id:"",
    })
 

    const setDatas = ( type, e, item = null) => {
        setdata((prevState) => ({
            ...prevState,
            [type]: e.target.value
        }));  
        let json = data;
        json[type] = e.target.value
        dispatch(getTask(json))
      }
      
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
 
  
  return (
    <div className='card'>
        <div className='card-header'> 
            <div className='card-title'>
               <label className='text-indigo-600 font-bold'> Search Tasks </label>
            </div>
        </div>
        <div className='card-body'>
            <div className='d-flex flex-row row'>
                  <InputData  
                    placeholder={"Title"} 
                    required={true} 
                    col_md={3} 
                    col={6}  
                    parent_class=" mb-2"
                    error={validateData}  
                    input_type="text"  
                    type={`title`} 
                    value={data.title} 
                    onChange={setDatas} />
            
                    <SelectData
                    col_md={3} 
                    col={6} 
                    parent_class=" mb-2"
                    options={employees} 
                    value={data.employee_id} 
                    placeholder="Employee"
                    onChange={setDatas} 
                    type="employee_id" />

                    <SelectData
                    col_md={3} 
                    col={6} 
                    parent_class=" mb-2"
                    options={mangers} 
                    value={data.manger_id} 
                    placeholder="Manger"
                    onChange={setDatas} 
                    type="manger_id" />
            
                    <SelectData
                      col_md={3} 
                      col={6} 
                      parent_class=" mb-2"
                      options={status_types} 
                      placeholder="Status"
                      value={data.status} 
                      onChange={setDatas} 
                      type="status" />
            </div>
        </div>
    </div>

  )
}
