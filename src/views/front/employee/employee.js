import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert2';
import { get } from '../../../helper';
import Loader from '../../../layouts/admin/loader/Loader';
import { urls_employee } from '../../../urls';
import NotFoundData from '../NotFoundData';
import TaskCard from './TaskCard';

export default function Employee() {

    const [tasks, settasks] = useState([]);
    const [loading, setloading] = useState(true)

 
    const mounted = useRef(false)
    useEffect(() => {
        if(!mounted.current){
          fetch_tasks()
          mounted.current = true
        }
       
      }, [])

    const refreshComponent = ()=>{
        setloading(true)
        fetch_tasks()

    }
    const fetch_tasks = async () => {
        try {
          const res = await get(urls_employee.tasks_url)
          if(res.statusMsg == "success"){
            settasks(res.data)
            setloading(false)
          }else{
           // swal.fire("the user is not employee")
          }
          
        } catch (err) {
          
        }
      };
      if(loading){
        return <Loader />
      }else{
        return(
            <div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                <p className="font-bold">Note:</p>
                <p>Status and Description can be changed when double click the status and description.</p>
            </div>
                {tasks.length > 0? tasks.map((item,i)=><TaskCard key={i} refreshComponent={refreshComponent} item={item} />):<NotFoundData message={'Not Found Data'} />}
            </div>
        )
      }
     

}
