import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {post,get, delete_data, delete_fetch} from '../../helper'
import Loader from '../../layouts/admin/loader/Loader'
import LoaderBottom from '../../layouts/admin/loader/LoaderBottom'
import { getEmployees } from '../../redux/features/searchEmployeeSlice'
import {urls} from '../../urls'
import AddModal from './addModal'
import EditModal from './editModal'
import SearchHeader from './searchHeader'

export default function Table() {

     let check = true
    const [Data, setData] = useState([])
    const [mangers, setmangers] = useState([])
    const [departments, setdepartments] = useState([])
    const [skip, setskip] = useState(0)
    const [dataEdit, setdataEdit] = useState(false)
    const [isLoadingBottom, setisLoadingBottom] = useState(false)
    const [showAdd, setshowAdd] = useState(false)
    const [showEdit, setshowEdit] = useState(false)

    const mounted = useRef(false)
    const dispatch = useDispatch()
    const loading = useSelector(state=> state.emplyee.loading)
    const emplyees = useSelector(state=> state.emplyee.data)
    useEffect(() => {
      if(!mounted.current){
        fetchMangers()
        fetchDepartment()

        dispatch(getEmployees({scroll:0}))


        mounted.current = true
      }
     
    }, [])

    
        useEffect(() => {
          
          setisLoadingBottom(false)
          check=true
        }, [emplyees])

  
    const fetchMangers = async () => {
      try {
        const response = await get(urls.get_mangerOptions)
        setmangers(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    
    const fetchDepartment = async () => {
      try {
        const response = await get(urls.get_departmentOptions)
        setdepartments(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    const handleSave = ()=>{
      dispatch(getEmployees())
      setdataEdit(false)


    }

    const deleteRow = (id)=>{
      delete_data(()=>{
        fetch_delete_employee(id)
      })
    }
    const fetch_delete_employee = async (id) => {
  try {
    const res = await delete_fetch(`${urls.delete_employee}/${id}`)
    if(res.statusMsg == "success"){
      handleSave()

    }else{
      Swal.fire(res.msg)
    }
    
  } catch (err) {
    
  }
};

  return (
    <div  id="style-10">
          <div className='d-flex flex-column'>
          <button onClick={()=>setshowAdd(true)} className='btn btn-primary mb-4 text-left width-fit'>Add New Employee</button>
          <SearchHeader 
          mangers={mangers} 
          check={check} 
          setisLoadingBottom={setisLoadingBottom} 
          deparments={departments} />

          </div>
            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">employee name</th>
                            <th scope="col">department</th>
                            <th scope="col">manger name</th>
                            <th scope="col">salary</th>
                            <th scope="col">Options</th>

                        </tr>
                    </thead>
                    <tbody>
                    {loading?
                      <tr >
                        <td>
                            <Loader/>
                        </td>
                      </tr>:<>
                    {  emplyees.map((item,i)=>(
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.full_name}</td>
                            <td>{item.department}</td>
                            <td>{item.is_manger == 1?"Is Manger":item.manger}</td>
                            <td>{item.salary}</td>
                            <td>
                             <div className='d-flex flex-row'>
                             <button onClick={()=>deleteRow(item.id)}  className="btn btn-soft-danger btn-icon btn-circle btn-sm confirm-delete"  title={'Delete'}>
                              <i className="las la-trash"></i>
                          </button><button onClick={()=>{
                            setdataEdit(item)
                            setshowEdit(true)
                          }} className="btn btn-soft-success btn-icon btn-circle btn-sm"  title={'Edit'}>
                            <i className="las la-edit"></i>
                        </button>
                             </div>
                            </td>

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
          {showAdd?<AddModal show={showAdd} handleClose={()=>setshowAdd(false)} handleSave={handleSave} />:null}
          {showEdit?<EditModal data={dataEdit} show={showEdit} handleClose={()=>setshowEdit(false)} handleSave={handleSave} />:null}
    </div>
  )
}
