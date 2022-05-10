import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLoginAsync = createAsyncThunk(
  'todos/getLoginAsync',
  async (payload) => {
    try {
      const response = await axios.post('/function/login', payload);
      console.log(response);
      if (response.status === 200) {
        return { username: response.data.username };
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
  },
  extraReducers: {
    [getLoginAsync.fulfilled]: (state, action) => {
      if (action.payload.username !== undefined) {
        const newLoggedIn = { username: action.payload.username };
        return newLoggedIn;
      }

      return { responseStatus: action.payload.responseStatus };
    },
  },
});
export const { reset } = loggedInSlice.actions;
export default loggedInSlice.reducer;
