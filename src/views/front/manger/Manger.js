import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../layouts/admin/loader/Loader'
import { getEmployeeMangers } from '../../../redux/features/employeesMangerSlice'
import { divClick } from '../../../redux/features/eventClickBtn'
import NotFoundData from '../NotFoundData'
import AddModal from './addModal'
import EmployeeCard from './EmployeeCard'
import SearchEmployeeMangerHeader from './searchHeader'
import TaskEmployeeModel from './TaskEmployeeModel'

export default function Manger() {
  const dispatch = useDispatch()
  const employeesMangers = useSelector(state=> state.employeesMangers.data)
  const loading = useSelector(state=> state.employeesMangers.loading)
  const [employee_id, setemployee_id] = useState("")
  const [EmployeeTasks, setEmployeeTasks] = useState([])
  const [showTasksEmployee, setshowTasksEmployee] = useState(false)
  const [showAddTask, setshowAddTask] = useState(false)
const [itemData, setitemData] = useState()
  const btnclicked = useSelector(state=> state.eventClickBtnSlice.buttonclicked)

  const mounted = useRef(false)
  useEffect(() => {
      if(!mounted.current){
        dispatch(getEmployeeMangers())
        mounted.current = true
      }
     
    }, [])

    const handleSave = ()=>{
      dispatch(getEmployeeMangers())
    }

    const open_addcard = (id)=>{
      setemployee_id(id)
      setshowAddTask(true)
    }


    const handleDivClick = (item) => {
          setEmployeeTasks(item.tasks)
          setshowTasksEmployee(true);
          dispatch(divClick())      
      };
   const showEyee = (item)=>{
    handleDivClick(item)
   }

      return (
        <div className='d-flex flex-column'>
           <SearchEmployeeMangerHeader />
            {loading?
                  <Loader />:
              <div className='ml-10 mr-10 d-flex flex-md-row flex-column justify-content-center row'>
                {employeesMangers.length > 0? employeesMangers.map((item,i)=><div key={i}  className='col-md-4 col-12 '> <EmployeeCard key={i} open_addcard={open_addcard} showEyee={showEyee}  item={item} /> </div>):<NotFoundData message={'Not Found Data'} />}
            </div>}
            {showTasksEmployee?<TaskEmployeeModel show={showTasksEmployee} items={EmployeeTasks} handleClose={()=>setshowTasksEmployee(false)} />:null}
            {showAddTask?<AddModal id={employee_id} show={showAddTask} handleClose={()=>setshowAddTask(false)} handleSave={handleSave} />:null}
        </div>
       
      )
 
}
