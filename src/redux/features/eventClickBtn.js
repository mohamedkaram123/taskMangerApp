import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    buttonclicked:false
}

const eventClickBtnSlice = createSlice({
    name:"click",
    initialState,
    reducers:{
         btnClick:(state)=>{
            state.buttonclicked = true
        },
        divClick:(state)=>{
            state.buttonclicked = false
        }
    }
})

export const {btnClick , divClick} = eventClickBtnSlice.actions

export default eventClickBtnSlice.reducer