import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLoginAsync = createAsyncThunk(
  'todos/getLoginAsync',
  async (payload) => {
    try {
      const response = await axios.post(
        'http://faas.todolist.hkust.com/function/login',
        payload
      );

      if (response.status === 200) {
        console.log(response.data.data);
        return { user: response.data.data };
      }
    } catch (error) {
      console.log(error.response.data.message);
      return { responseStatus: error.response.data.message };
    }
  }
);
const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: {},
  reducers: {
    reset: (state, action) => {
      return {};
    },
    clearResponse: (state, action) => {
      if (state.responseStatus === undefined) {
        return state;
      }
      return {};
    },
  },
  extraReducers: {
    [getLoginAsync.fulfilled]: (state, action) => {
      if (action.payload.user !== undefined) {
        const newLoggedIn = { user: action.payload.user };
        return newLoggedIn;
      }

      return { responseStatus: action.payload.responseStatus };
    },
  },
});
export const { reset, clearResponse } = loggedInSlice.actions;
export default loggedInSlice.reducer;
