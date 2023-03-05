import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { btnClick } from '../../../redux/features/eventClickBtn';

export default function EmployeeCard({ item,open_addcard ,showEyee}) {
  const dispatch = useDispatch()
  const { avatar,id, full_name, email, salary, tasks_count,tasks } = item;

  const handleButtonClick = (event) => {
    open_addcard(id)
    dispatch(btnClick())
  };
  return (
    <div
      title='show tasks'
      className='flex flex-wrap lg:flex-nowrap cursor-pointer border rounded-lg shadow-md p-4 mb-4 transition-transform hover:scale-105 justify-between'
    >
      <div className='flex-none mr-4'>
        {avatar ? (
          <img src={avatar} alt={full_name} className='rounded-full w-16 h-16' />
        ) : (
          <span>no image</span>
        )}
      </div>
      <div className='flex-grow'>
        <h2 className='text-lg font-medium mb-2'>{full_name}</h2>
        <p className='text-gray-700 mb-2'>{email}</p>
        <p className='text-gray-600 mb-2 text-sm'>Salary: {salary}</p>
        <p className='text-gray-600 text-sm'>Tasks Count: {tasks_count}</p>
      </div>
      <div className='d-flex flex-row align-items-start'>
      <button onClick={()=>{
        showEyee(item)
      }} className='flex-none mx-2  self-center lg:self-auto'>
            <i title='show tasks' style={{ fontSize:28 }} className='las hover:text-indigo-600 la-eye'></i>
        </button>
          <button  onClick={handleButtonClick} className='flex-none   self-center lg:self-auto'>
            <i title='create task' style={{ fontSize:28 }} className='las hover:text-indigo-600 la-edit'></i>
        </button>
      </div>
     
    </div>
  );
}
