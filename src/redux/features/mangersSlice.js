import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { get } from '../../helper'
import { urls } from '../../urls'

const getMangers = createAsyncThunk("mangers/fetchMangers", async () => {
    try {
      const response = await get(urls.get_mangerOptions);
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


  
  const mangerSlice = createSlice({
    name: "mangers",
    initialState,
    reducers: {},
    extraReducers: {
      [getMangers.pending]: (state, action) => {
     
        state.loading = true;
      },
      [getMangers.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Append new data to existing data
        // Do something with the request data...
      },
      [getMangers.rejected]: (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      },
    },
  });
  
export  {getMangers}

export default mangerSlice.reducer