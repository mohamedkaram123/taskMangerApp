import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    count:0
}

const counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increaseCounter:(state,action)=>{
            state.count += action.payload
        },
        decreaseCounter:(state,action)=>{
            state.count -= action.payload
        }
    }
})

export const {increaseCounter , decreaseCounter} = counterSlice.actions

export default counterSlice.reducer