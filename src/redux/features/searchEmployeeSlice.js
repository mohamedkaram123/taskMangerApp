import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { post } from '../../helper'
import { urls } from '../../urls'

const getEmployees = createAsyncThunk("employees/fetchEmployees", async (data, { getState }) => {
    try {
      const response = await post(urls.search_employee, data);
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


  
  const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: {
      [getEmployees.pending]: (state, action) => {
       state.loading = true;
      },
      [getEmployees.fulfilled]: (state, action) => {
        state.loading = false;
       // [...state.data, ...action.payload.data]
        state.data = action.payload.data; // Append new data to existing data
      },
      [getEmployees.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });

  const employeeScrollSlice = createSlice({
    name: "employeesScroll",
    initialState,
    reducers: {},
    extraReducers: {
      [getEmployees.pending]: (state, action) => {
      // state.loading = true;
      },
      [getEmployees.fulfilled]: (state, action) => {
        state.loading = false;
       // [...state.data, ...action.payload.data]
        state.data = [...state.data, ...action.payload.data]; // Append new data to existing data
      },
      [getEmployees.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });
  

export  {employeeSlice,employeeScrollSlice,getEmployees}