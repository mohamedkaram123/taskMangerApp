import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../layouts/admin/loader/Loader'
import LoaderBottom from '../../layouts/admin/loader/LoaderBottom'
import { getEmployeesOption } from '../../redux/features/employeesOptionSlice'
import { getMangers } from '../../redux/features/mangersSlice'
import { getTask } from '../../redux/features/searchTaskSlice'

import SearchHeader from './searchHeader'

export default function Table() {

    const [Data, setData] = useState([])


    const [isLoadingBottom, setisLoadingBottom] = useState(false)
    const mounted = useRef(false)
    const dispatch = useDispatch()
    const tasks = useSelector(state=> state.task.data)
    const mangers = useSelector(state=> state.mangers.data)
    const employees = useSelector(state=> state.employeesOption.data)
    const loading = useSelector(state=> state.task.loading)

    useEffect(() => {
      if(!mounted.current){
        dispatch(getMangers())
        dispatch(getEmployeesOption())

        dispatch(getTask())
        mounted.current = true
      }
     
    }, [])

    

  return (
    <div  id="style-10">
          <div className='d-flex flex-column'>
          <SearchHeader 
          mangers={mangers}
          employees={employees}
          setisLoadingBottom={setisLoadingBottom} 
           />

          </div>
            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">title</th>
                            <th scope="col">description</th>
                            <th scope="col">status</th>
                            <th scope="col">employee</th>
                            <th scope="col">manger</th>

                        </tr>
                    </thead>
                    <tbody>
                    {loading?
                      <tr >
                        <td>
                            <Loader/>
                        </td>
                      </tr>:<>
                    {  tasks.map((item,i)=>(
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.title}</td>
                            <td>{item.desc}</td>
                            <td>{item.status}</td>
                            <td>{item.employee}</td>
                            <td>{item.manger}</td>

                        </tr>
                    ))}
                    </>}
                    <tr >
                    {isLoadingBottom?<td colSpan={5}>
                      <LoaderBottom/>
                  </td>:null}
                    </tr>
                    
                    </tbody>
                </table>
            </div>

    </div>
  )
}
