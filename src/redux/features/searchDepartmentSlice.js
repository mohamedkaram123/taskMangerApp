import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { post } from '../../helper'
import { urls } from '../../urls'

const getdepartments = createAsyncThunk("departments/fetchdepartments", async (data) => {
    try {
      const response = await post(urls.search_department, data);
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


  
  const searchdepartmentSlice = createSlice({
    name: "departmentData",
    initialState,
    reducers: {},
    extraReducers: {
      [getdepartments.pending]: (state, action) => {
       state.loading = true;
      },
      [getdepartments.fulfilled]: (state, action) => {
        console.log({action});
        state.loading = false;
       // [...state.data, ...action.payload.data]
        state.data = action.payload.data; // Append new data to existing data
      },
      [getdepartments.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });
  

export  {searchdepartmentSlice,getdepartments}