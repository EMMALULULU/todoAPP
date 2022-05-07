import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [
    { id: 1, username: 'kalong', password: 'kalong' },
    { id: 2, username: 'zijun', password: 'zijun' },
  ],
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: Math.random(),
        username: action.payload.username,
        password: action.payload.password,
      };
      state.push(newUser);
      console.log(state);
    },
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
