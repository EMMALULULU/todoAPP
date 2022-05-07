import { createSlice } from '@reduxjs/toolkit';

const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: {},
  reducers: {
    login: (state, action) => {
      return { username: action.payload.username, id: action.payload.id };
    },
    logout: (state, action) => {
      return {};
    },
  },
});
export const { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;
