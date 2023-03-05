import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'

const getUsers = createAsyncThunk("users/fetchUsers",async ()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data
})

const initialState = {
    loading:false,
    data:[],
    error:null
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{ },
    extraReducers:{
        [getUsers.pending]:(state,action)=>{
            state.loading = true
        },
        [getUsers.fulfilled]:(state,action)=>{
            state.loading = false
            state.data = action.payload

        },
        [getUsers.rejected]:(state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = 'error'
        }
    }
})

export  {getUsers}

export default userSlice.reducer