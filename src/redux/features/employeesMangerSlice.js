import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { post } from '../../helper'
import { urls, urls_employee } from '../../urls'

const getEmployeeMangers = createAsyncThunk("employeeMangers/fetchEmployeeMangers", async (data) => {
    try {
      const response = await post(urls_employee.search_employeeManger, data);
      return { data: response.data};
    } catch (err) {
      // Handle errors here
    }
  });

const initialState = {
    loading:false,
    data:[],
    error:null
}


  
  const employeeMangerSlice = createSlice({
    name: "employeeMangers",
    initialState,
    reducers: {},
    extraReducers: {
      [getEmployeeMangers.pending]: (state, action) => {
       state.loading = true;
      },
      [getEmployeeMangers.fulfilled]: (state, action) => {
        state.loading = false;
       // [...state.data, ...action.payload.data]
        state.data = action.payload.data; // Append new data to existing data
      },
      [getEmployeeMangers.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });


export  {employeeMangerSlice,getEmployeeMangers}