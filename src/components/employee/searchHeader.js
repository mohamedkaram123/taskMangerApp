import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import InputData from '../../forms/InputData';
import SelectData from '../../forms/SelectData';
import { getEmployees } from '../../redux/features/searchEmployeeSlice';

export default function SearchHeader({mangers,deparments,setisLoadingBottom,check}) {
  const dispatch = useDispatch()
  let limit = 15;
  let skip = 0;
    const [data, setdata] = useState({
        name:"",
        salary:"",
        department:"",
        manger:"",
    })
    const [validateData, setvalidateData] = useState({
        name:"",
        salary:"",
        department:"",
        manger:"",
    })
    const setDatas = ( type, e, item = null) => {
        setdata((prevState) => ({
            ...prevState,
            [type]: e.target.value
        }));  
        let json = data;
        json[type] = e.target.value
        json["scroll"] = 0

        json["limit"] = 15
        json["skip"] = 0

        dispatch(getEmployees(json))
        skip=0
        limit=15


      }

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [])
      
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
    
        // Calculate how far the user has scrolled from the bottom of the page
        const scrollBottom = documentHeight - (scrollTop + windowHeight);
  
        // If the user has scrolled to the bottom of the page
        if (scrollBottom === 0 && check && documentHeight > 900) {
          // setisLoadingBottom(true)
          // skip+=15
          // limit+=15

          // dispatch(getEmployees({...data,...{
          //   limit,
          //   skip,
          //   scroll:1
          // }}))
    
        }
      };
  
  
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
                    col_md={3} 
                    col={6}  
                    parent_class=" mb-2"
                    error={validateData}  
                    input_type="text"  
                    type={`name`} 
                    value={data.name} 
                    onChange={setDatas} />
            
                  <InputData  
                    placeholder={"Salary"} 
                    required={true} 
                    col_md={3} 
                    col={6}  
                    parent_class=" mb-2"
                    error={validateData}  
                    input_type="number"  
                    type={`salary`} 
                    value={data.salary} 
                    onChange={setDatas} />

                    <SelectData
                    col_md={3} 
                    col={6} 
                    parent_class=" mb-2"
                    options={mangers} 
                    value={data.manger} 
                    placeholder="Manger"
                    onChange={setDatas} 
                    type="manger" />
            
                    <SelectData
                      col_md={3} 
                      col={6} 
                      parent_class=" mb-2"
                      options={deparments} 
                      placeholder="Department"
                      value={data.department} 
                      onChange={setDatas} 
                      type="department" />
            </div>
        </div>
    </div>

  )
}
