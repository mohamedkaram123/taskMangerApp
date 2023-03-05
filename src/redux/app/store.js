import {configureStore} from '@reduxjs/toolkit'
import {employeeSlice,employeeScrollSlice} from '../features/searchEmployeeSlice'
import mangerSlice from '../features/mangersSlice'
import departmentSlice from '../features/departmentSlice'
import {searchdepartmentSlice} from '../features/searchDepartmentSlice'
import {taskSlice} from '../features/searchTaskSlice'
import getEmployeesOption from '../features/employeesOptionSlice'
import {employeeMangerSlice} from '../features/employeesMangerSlice'
import eventClickBtnSlice from '../features/eventClickBtn'
export const store = configureStore({
    reducer:{
       // auth:authSliceReducer,
       emplyee:employeeSlice.reducer,
       emplyeeScroll:employeeScrollSlice.reducer,
       departmentData:searchdepartmentSlice.reducer,
       task:taskSlice.reducer,
       mangers:mangerSlice,
       departments:departmentSlice,
       employeesOption:getEmployeesOption,
       employeesMangers:employeeMangerSlice.reducer,
       eventClickBtnSlice:eventClickBtnSlice

    }
})