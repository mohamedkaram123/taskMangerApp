import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { get } from '../../helper'
import { urls } from '../../urls'

const getEmployeesOption = createAsyncThunk("employeesOption/fetchEmployeesOption", async () => {
    try {
      const response = await get(urls.employeesOptions);
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


  
  const employeeOptionSlice = createSlice({
    name: "employeesOption",
    initialState,
    reducers: {},
    extraReducers: {
      [getEmployeesOption.pending]: (state, action) => {
     
        state.loading = true;
      },
      [getEmployeesOption.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Append new data to existing data
        // Do something with the request data...
      },
      [getEmployeesOption.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });
  
export  {getEmployeesOption}

export default employeeOptionSlice.reducer