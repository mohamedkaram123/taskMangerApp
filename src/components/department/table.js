import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert2'
import {post,get, delete_data, delete_fetch} from '../../helper'
import Loader from '../../layouts/admin/loader/Loader'
import LoaderBottom from '../../layouts/admin/loader/LoaderBottom'
import { getdepartments } from '../../redux/features/searchDepartmentSlice'
import {urls} from '../../urls'
import AddModal from './addModal'
import EditModal from './editModal'
import SearchHeader from './searchHeader'

export default function Table() {

     let check = true
    const [Data, setData] = useState([])
    const [mangers, setmangers] = useState([])
    const [skip, setskip] = useState(0)
    const [dataEdit, setdataEdit] = useState(false)
    const [isLoadingBottom, setisLoadingBottom] = useState(false)
    const [showAdd, setshowAdd] = useState(false)
    const [showEdit, setshowEdit] = useState(false)

    const mounted = useRef(false)
    const dispatch = useDispatch()
    const loading = useSelector(state=> state.departmentData.loading)
    const departments = useSelector(state=> state.departmentData.data)
    useEffect(() => {
      if(!mounted.current){
       
        dispatch(getdepartments({scroll:0}))


        mounted.current = true
      }
     
    }, [])

    
    const handleSave = ()=>{
      dispatch(getdepartments())
      setdataEdit(false)


    }

    const deleteRow = (id)=>{
      delete_data(()=>{
        fetch_delete_department(id)
      })
    }
    const fetch_delete_department = async (id) => {
  try {
    const res = await delete_fetch(`${urls.delete_department}/${id}`)
    if(res.statusMsg == "success" && res.data.check_empolyees == false){
      handleSave()
    }else if(res.statusMsg == "success" && res.data.check_empolyees == true){
      swal.fire('the department content employees')

    }
    
  } catch (err) {
    
  }
};

  return (
    <div  id="style-10">
          <div className='d-flex flex-column'>
          <button onClick={()=>setshowAdd(true)} className='btn btn-primary mb-4 text-left width-fit'>Add New Department</button>
          <SearchHeader 
          check={check} 
          setisLoadingBottom={setisLoadingBottom} 
           />

          </div>
            <div className='table-responsive'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Department Name</th>
                            <th scope="col">Department Count</th>
                            <th scope="col">Department Sum Salary</th>

                        </tr>
                    </thead>
                    <tbody>
                    {loading?
                      <tr >
                        <td>
                            <Loader/>
                        </td>
                      </tr>:<>
                    {  departments.map((item,i)=>(
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.empolyees_count}</td>
                            <td>{item.empolyees_sum}</td>
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
