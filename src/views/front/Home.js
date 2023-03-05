import React from 'react'
import { user, user_employee } from '../../helper'
import Employee from './employee/employee'
import Manger from './manger/Manger'

export default function Home() {
  console.log({user:user()});
  if(user_employee().user_type == "employee"){
    return <Employee />
  }else{
    return <Manger />

  }

}
