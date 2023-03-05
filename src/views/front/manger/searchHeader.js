import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getEmployeeMangers } from '../../../redux/features/employeesMangerSlice';
import InputData from '../../../forms/InputData';

export default function SearchEmployeeMangerHeader() {
  const dispatch = useDispatch()

    const [data, setdata] = useState({
        name:"",
        salary:"",
        email:""

    })
    const [validateData, setvalidateData] = useState({
        name:"",
        salary:"",
        email:""

    })
    const setDatas = ( type, e, item = null) => {
        setdata((prevState) => ({
            ...prevState,
            [type]: e.target.value
        }));  
        let json = data;
        json[type] = e.target.value


        dispatch(getEmployeeMangers(json))
      }

 
  
  return (
    <div className='card'>
        <div className='card-header'> 
            <div className='card-title'>
               <label className='text-indigo-600 font-bold'> Search Employee </label>
            </div>
        </div>
        <div className='card-body'>
            <div className='d-flex flex-row row'>
                  <InputData  
                    placeholder={"Name"} 
                    required={true} 
                    col_md={4} 
                    col={4}  
                    parent_class=" mb-2"
                    error={validateData}  
                    input_type="text"  
                    type={`name`} 
                    value={data.name} 
                    onChange={setDatas} />

                    <InputData  
                    placeholder={"Email"} 
                    required={true} 
                    col_md={4} 
                    col={4}  
                    parent_class=" mb-2"
                    error={validateData}  
                    input_type="email"  
                    type={`email`} 
                    value={data.email} 
                    onChange={setDatas} />
            
                  <InputData  
                    placeholder={"Salary"} 
                    required={true} 
                    col_md={4} 
                    col={4}  
                    parent_class=" mb-2"
                    error={validateData}  
                    input_type="number"  
                    type={`salary`} 
                    value={data.salary} 
                    onChange={setDatas} />

            </div>
        </div>
    </div>

  )
}
