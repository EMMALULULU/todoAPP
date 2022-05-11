import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createAccountAsync = createAsyncThunk(
  'todos/createAccountAsync',
  async (payload) => {
    try {
      const response = await axios.post(
        'http://faas.todolist.hkust.com/function/register',
        payload
      );
      const { data } = response;
      console.log(data);
      if (data.statusCode === 200) {
        console.log('success');
        return { responseStatus: 'success', username: data.data.username };
      }
    } catch (error) {
      console.log(error);
      return { responseStatus: error.response.data.message, username: null };
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: { responseStatus: '', username: '' },
  reducers: {
    reset: (state, action) => {
      return { responseStatus: '', username: '' };
    },
  },
  extraReducers: {
    [createAccountAsync.fulfilled]: (state, action) => {
      return {
        responseStatus: action.payload.responseStatus,
        username: action.payload.username,
      };
    },
  },
});

export const { reset } = registerSlice.actions;
export default registerSlice.reducer;
