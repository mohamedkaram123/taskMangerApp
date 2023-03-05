import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { get } from '../../helper'
import { urls } from '../../urls'

const getDepartment = createAsyncThunk("department/fetchDepartment", async (data) => {
    try {
      const response = await get(urls.get_departmentOptions);
      return { data: response.data };
    } catch (err) {
      // Handle errors here
    }
  });

const initialState = {
    loading:false,
    data:[],
    error:null
}


  
  const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {},
    extraReducers: {
      [getDepartment.pending]: (state, action) => {
     
       state.loading = true;
      },
      [getDepartment.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Append new data to existing data
        // Do something with the request data...
      },
      [getDepartment.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });
  
export  {getDepartment}

export default departmentSlice.reducer