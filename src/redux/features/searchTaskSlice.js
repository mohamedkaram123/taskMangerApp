import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { post } from '../../helper'
import { urls } from '../../urls'

const getTask = createAsyncThunk("task/fetchTask", async (data, { getState }) => {
    try {
      const response = await post(urls.search_task, data);
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


  
  const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: {
      [getTask.pending]: (state, action) => {
       state.loading = true;
      },
      [getTask.fulfilled]: (state, action) => {
        state.loading = false;
       // [...state.data, ...action.payload.data]
        state.data = action.payload.data; // Append new data to existing data
      },
      [getTask.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });


export  {taskSlice,getTask}